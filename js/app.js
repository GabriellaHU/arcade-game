// ------------------------------------------------------------
// ----------------------- WINNING THE GAME--------------------
// ------------------------------------------------------------

function winGame() {
  // allEnemies.forEach(function(enemy) {
  //   enemy.stop();
  // });

  //reset player to startpoint
  // TODO set delay => block player movement and collisions
  const reset = window.setTimeout(resetPlayer, 0);

  function resetPlayer() {
    player.reset();
  };

  // increase score counter
  scoreNum++;
  const scoreCounter = document.querySelector('.counter');
  scoreCounter.textContent = `Your score is: ${scoreNum}`;

}

// ------------------------------------------------------------
// ----------------------- SCORE COUNTER ----------------------
// ------------------------------------------------------------

//TODO remove variable from global scope
let scoreNum = 0;

//IIFE that sets up the score counter
const initCounter = function() {
  const scoreCounter = document.createElement('p');
  document.body.appendChild(scoreCounter);
  scoreCounter.textContent = "Your score is: 0";
  scoreCounter.classList.add('counter');
}();


// ------------------------------------------------------------
// ----------------------- ENEMY CLASS ------------------------
// ------------------------------------------------------------

class Enemy {

  constructor(x, y, speed) {
    this.x = x;
    this.y = y;
    //randomize enemy speed
    this.speed = speed;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
  }

  setSpeed() {
    //randomize speed's value
    this.speed = getRandomIntInclusive(150, 400);

    //funtion that generates a random value
    function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
    }
  }

  update(dt) {
    // multiply movement by the dt parameter
    // which will ensure the game runs at the same speed for all computers

    // check enemy position
       //if enemy didn't pass border move forward (increment x by speed * dt)
       //else reset position to start
         if (this.x < 606) {
           this.x = this.x + this.speed * dt;
         } else {
           this.x = -101;
           //overwrite enemy speed with a new random value
           this.setSpeed();
         }
   }

   // stop() {
   //   this.speed = 0
   // }

   // Draw the enemy on the screen, required method for game
   render() {
     ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
   }

}

// ------------------------------------------------------------
// ----------------------- PLAYER CLASS -----------------------
// ------------------------------------------------------------

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
          if (player.y === enemy.y && player.x > enemy.x-20 && player.x < enemy.x+70) {
            player.reset();
          }
        });

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

      //check for victory condition
      if (this.y === 400 - 83*4) {
        winGame();
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

// ------------------------------------------------------------
// ---------------------- KEYBOARD INPUT ----------------------
// ------------------------------------------------------------

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    const allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

// ------------------------------------------------------------
// ----------------------- INIT OBJECTS -----------------------
// ------------------------------------------------------------

//array that initializes enemies on the canvas
let allEnemies = [new Enemy(-101, 400 - 83 * 4), new Enemy(-101*3, 400 - 83 * 3), new Enemy(-101*2, 400 - 83 * 2)]
// new player object
let player = new Player()
