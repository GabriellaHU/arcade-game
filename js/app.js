// ------------------------------------------------------------
// -------------------- GAMESTART MODAL -----------------------
// ------------------------------------------------------------



//IIFE that displays a modal when starting the game
const displayModal = function() {

  //creates a simple modal with some text and a start button to begin the game
  const avatarModal = document.createElement('dialog');
  const startBtn = document.createElement('button');
  const modalText = document.createElement('p');

  document.body.appendChild(avatarModal);
  avatarModal.appendChild(modalText);
  avatarModal.appendChild(startBtn);

  modalText.textContent = 'Arcade Game';
  startBtn.textContent = 'Start Game';

  avatarModal.showModal();

  startBtn.addEventListener('click', function() {
    avatarModal.close();
    // enemies only now start moving
    allEnemies.forEach(function(enemy) {
      enemy.setSpeed();
    });
  });

}();


// ------------------------------------------------------------
// ----------------------- WINNING THE GAME--------------------
// ------------------------------------------------------------

//TODO remove variables from global scope
let scoreNum = 0;


function winGame() {

  //reset player to startpoint
  player.reset();

  // increase score counter
  scoreNum++;
  const scoreCounter = document.querySelector('.counter');
  scoreCounter.textContent = `Your score is: ${scoreNum}`;

}

// ------------------------------------------------------------
// ----------------------- SCORE COUNTER ----------------------
// ------------------------------------------------------------

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
    this.speed = speed;
    // The image/sprite for our enemies, this uses a helper to easily load images
    this.sprite = 'images/enemy-bug.png';
  }

  //randomize the value of enemyspeed
  setSpeed() {

    this.speed = getRandomIntInclusive(150, 400);

    //funtion that generates a random value
    function getRandomIntInclusive(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
    }
  }

  update(dt) {
    // multiply movement by the dt parameter which will ensure the game runs at the same speed for all computers

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

  stop() {
    this.speed = 0
  }

  // Draw the enemy on the screen, required method for game
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }

}

// ------------------------------------------------------------
// ----------------------- PLAYER CLASS -----------------------
// ------------------------------------------------------------

//Random player avatar selection
//TODO simplify and remove from global scope

//load all avatars
const avatarImg = Resources.load([
  'images/char-boy.png',
  'images/char-cat-girl.png',
  'images/char-horn-girl.png',
  'images/char-pink-girl.png',
  'images/char-princess-girl.png'
]);

//array that holds all the possible avatar names
const avatars = ['char-boy', 'char-cat-girl','char-horn-girl', 'char-pink-girl', 'char-princess-girl'];

//generate a random number to use it with the avatars array
let randomNum = getRandomIntInclusive(0, 4);
//funtion that generates a random value
function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};


class Player {

  constructor(x = 101*2, y = 400) {
    this.x = x;
    this.y = y;
    //get a random element from the avatars array
    this.sprite = `images/${avatars[randomNum]}.png`;
    // this.sprite = `images/char-cat-girl.png`;

  }

  //Methods
  update() {

    //check collision (player x and y matches enemy coordinates)
    // enemies have a physical width, therefore the collision has to happen in an optimal range on the x axis
    // the y coordinates are set to match exactly when the enemy and the player are on the same tile
    allEnemies.forEach((enemy) => {
      if (this.y === enemy.y && this.x > enemy.x-20 && this.x < enemy.x+70) {
        this.reset();
      }
    });
  }

  handleInput(keyCode) {
    //update player coordinates based on keyboard input
    //the player can't leave the canvas
    if (keyCode === 'up' && this.y > 400 - 83*5){
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
    if (this.y === 400 - 83*5) {
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

// This listens for key presses and sends the keys to the Player.handleInput() method.
document.addEventListener('keyup', function(e) {
  const allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
  };

  // handle keyboard input only when the game has begun / the game start modal is closed
  if (document.querySelector('dialog').hasAttribute('open') === false) {
    player.handleInput(allowedKeys[e.keyCode]);
  };

  //TODO attempt to use the keyboard input for avatar selection in the game start modal :)

});

// ------------------------------------------------------------
// ----------------------- INIT OBJECTS -----------------------
// ------------------------------------------------------------

//array that initializes enemies on the canvas
let allEnemies = []

initEnemies = function() {

  for(let i=4; i>1; i--){
    var enemy=new Enemy(-101, 400-83*i);
    allEnemies.push(enemy)
  }
  
}();

// enemies don't move until the game has begun
allEnemies.forEach(function(enemy) {
  enemy.stop();
});

// new player object
let player = new Player();
