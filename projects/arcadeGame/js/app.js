// Enemies our player must avoid
var Enemy = function(x, y) {
    // give each enemy starting coordinates and a random speed
    this.randomSpeed = Math.random() + .5;
    this.x = x;
    this.y = y;
    this.height = 171;
    this.width = 101;
    this.sprite = 'images/char-boy.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    /* if the enemy's x position is off the board, reset the position to the starting position */

    if (this.x >= 500){
       this.x = -100;
    } else {
        (this.x += this.randomSpeed) * dt;
        this.checkCollisions();
    }

};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
var Player = function(){
    /*  get a random number between 0 and (board width - sprite width)
    this random number will be the x coordinate anytime the sprite is reset  */
    const randomX = Math.floor(Math.random() * 404 + 1);
   
    this.x = randomX;
    this.y = 400;
    this.sprite = 'images/char-pink-girl.png';
    this.height = 171;
    this.width = 101;
   
}

Player.prototype.update = function(dt){
  
}

Player.prototype.checkForWin = function(yPos){
    if (yPos === -10){

       setTimeout(function(){
        this.y = 400; 
        this.x = Math.floor(Math.random() * 404 + 1);
       }.bind(player), 1000);
    }
}

Enemy.prototype.checkCollisions = function(){
   
    if ( (this.x + this.width >= player.x) && (this.y + this.height >= player.y) && (player.x + player.width >= this.x) && (player.y + player.height >= this.y) ) {

    console.log('you crashed');
    }
}

Player.prototype.handleInput = function(key){
    // the four boundaries of the gameboard
    const upperLimit = -10;
    const leftLimit = -6;
    const lowerLimit = 430;
    const rightLimit = 410;

    // if direction is up/down, adjust the y value by row height.
    // if direction is left/right, adjust the x value by column width.

   if (key === 'up'){
        if ((this.y - 83) < upperLimit){
            this.y = upperLimit;
            player.checkForWin(upperLimit);
        } else {
            this.y -= 83;
        }
   }else if (key === 'right'){
        if ((this.x + 101) > rightLimit){
            this.x = rightLimit;
        } else {
            this.x += 101;
        }
   } else if (key === 'down'){
        if ((this.y + 83) > lowerLimit){
            this.y = lowerLimit;
        } else {
            this.y += 83;
        }
   } else if(key === 'left'){
        if ((this.x - 101) < leftLimit){
            this.x = leftLimit;
        } else {
            this.x -= 101;
        }
   }
}   

Player.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

const enemy1 = new Enemy(100, 70);
//const enemy2 = new Enemy(-100, 153);
//const enemy3 = new Enemy(-100, 236);

const allEnemies = [enemy1];
const player = new Player();


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
