// Enemies our player must avoid
const Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,

    this.x = x;
    this.y = y;
    //randomize enemy speed
    this.speed = getRandomIntInclusive(150, 300);

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

//funtion that generates a random value for enemy speed
function getRandomIntInclusive(min, max) {
min = Math.ceil(min);
max = Math.floor(max);
return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    // check enemy position
       //if enemy didn't pass border
         // move forward (increment x by speed * dt)
         //else reset position to start
         if (this.x < 606) {
           this.x = this.x + this.speed * dt;
         } else {
           this.x = -101;
           //overwrite enemy speed with a new random value
           this.speed = getRandomIntInclusive(150, 300);
         }

};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Player class

class Player {

    constructor(x = 101*2, y = 400) {
      this.x = x;
      this.y = y;
      this.sprite = 'images/char-boy.png';
    }

    //Methods
    update() {
      //update position
        //check collision (player x and y matches enemy coordinates)
        allEnemies.forEach(function(enemy){
          if (player.y === enemy.y && player.x > enemy.x-50 && player.x < enemy.x+50) {
            console.log('You lost');
            player.reset();
          }
        });

        //check win condition (player y matches the right y coordinates )
        if (this.y === 400 - 83*4) {
          console.log('You won');
          // window.setTimeout(player.reset, 1000);
        }
    }

    handleInput(keyCode) {
      //update player coordinates based on keyboard input
      if (keyCode === 'up' && this.y > 400 - 83*4){
        this.y = this.y - 83;
      }
      if (keyCode === 'right' && this.x < 101*4){
        this.x = this.x + 101;
      }
      if (keyCode === 'down' && this.y < 400){
        this.y = this.y + 83;
      }
      if (keyCode === 'left' && this.x > 0){
        this.x = this.x - 101;
      }
    }

    render() {
      //draw player on current x and y coordinates
      ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    //Reset player
      // set x and y to the start coordinates
    reset() {
      this.x =101*2;
      this.y = 400;
    }

}

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

let allEnemies = [new Enemy(-101, 400 - 83 * 4), new Enemy(-101*3, 400 - 83 * 3), new Enemy(-101*2, 400 - 83 * 2)]
let player = new Player()
