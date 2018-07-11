// Enemies our player must avoid
const Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    //pos-x
    //pos-y

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    // check enemy position
       //if enemy didn't pass border
         // move forward
         // increment x by speed * dt

       //else reset position to start

};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player {

    //Constructor

    //Properties
      // x position
      // y position
      // sprite

    //Methods
    update() {
      //update position
        //check collision (player x and y matches enemy coordinates)
        //check win condition (player y matches the right y coordinates )
    }

    handleInput(keyCode) {
      //update player coordinates based on keyboard input
    }

    render() {
      //draw player on current x and y coordinates
    }

    //Reset player
      // set x and y to the start coordinates

}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

// new Player object

// init allEnemies Array
// create new Enemy objects and push them to the array



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
let allEnemies = [new Enemy(0, 400 - 83 * 4), new Enemy(0, 400 - 83 * 3), new Enemy(0, 400 - 83 * 2)]
let player = new Player()
