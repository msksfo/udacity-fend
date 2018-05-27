// Enemies our player must avoid
var Enemy = function(x, y) {
    // give each enemy starting coordinates and a random speed
    this.randomSpeed = Math.random() + .5;
    this.x = x;
    this.y = y;
   
    this.sprite = 'images/char-boy.png';
    this.height = 50;
    this.width = 50;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    /* if the enemy's x position is off the board, reset the position to the starting position */
    if (this.x >= 500){
       this.x = -100;
    } else {
        (this.x += this.randomSpeed) * dt;
    }

    // if any part of the two sprites is overlapping, they have crashed.
    if ( (this.x + this.width >= player.x) && (this.y + this.height >= player.y) && (player.x + player.width >= this.x) && (player.y + player.height >= this.y) ) {

        // reset player values when sprites crash
        setTimeout(function(){
            player.y = 402;;
            player.x = 200;
        }, 150);
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


// Now write your own player class
var Player = function(x, y){
    this.x = x;
    this.y = y;
    
    this.sprite = 'images/char-pink-girl.png';
    this.height = 50;
    this.width = 50;
}

Player.prototype.getRandomX = function(){
     /*  get a random number between 0 and (board width - sprite width)
    this random number will be the x coordinate anytime the sprite is reset  */
    return Math.floor(Math.random() * 404 + 1);
}

Player.prototype.update = function(dt){}



let points = document.querySelector('.points-value');
let gameLevel = 1;

function updatePoints(){
    // add 50 points each time the player makes it to the water
    points.innerHTML  = (points.innerHTML * 1) + 50;
   
    if (points.innerHTML == 50){
        setTimeout(function(){
            allEnemies.push(enemy2);
        }, 800);
    } else if (points.innerHTML == 100){
        setTimeout(function(){
            allEnemies.push(enemy3);
        }, 800);
    } 
}

function increaseLevel(){
    let level = document.querySelector('.level-value');
    /* set the level to the global gameLevel variable. NOTE: updateModal function increments this variable */
    level.innerHTML = gameLevel;
}

function updateModal(){
    // increment the global gameLevel variable, and set the level in the modal to that value
    gameLevel += 1;
    let modalLevel = document.querySelector('.modal-level-value');
    modalLevel.innerHTML = gameLevel;
}

function winLevel(){
    /* 1. update the level in the modal before showing the modal
       2. show the modal
       3. while the modal is hiding the score panel, update values in the score panel
       4. hide the modal
       5. move the player to starting position
    */
    updateModal();
    const congratulations = document.querySelector('.congratulations');
    player.x = player.x;
    allEnemies.length = 0;

    setTimeout(() => congratulations.classList.toggle('show-congratulations'), 1000);

    setTimeout(function(){
        points.innerHTML = 0;
        increaseLevel();
    }, 1500);
  
    setTimeout(function(){
        congratulations.classList.toggle('show-congratulations');
        player.x = 200;
        player.y = 402;

    }, 3000);

}

/* ============ control player movement ============== */

/* these four methods control player up/down/left/right movement. -created for easier readability inside the handleInput method */

Player.prototype.keyUp = function (){
    const upperLimit = -13;
    if (this.y -83 < upperLimit){
        this.y = upperLimit;
    } else if (this.y - 83 === upperLimit){
        this.y -= 83;
        updatePoints();
        if (points.innerHTML < 150){
            setTimeout(function(){
                this.y = 402; 
                this.x = this.getRandomX();
               }.bind(player), 800);
        } else {
            winLevel();
        } 
    } else {
        this.y -= 83;
    }
}

Player.prototype.keyDown = function(){
    const lowerLimit = 430;
    if ((this.y + 83) > lowerLimit){
        this.y = lowerLimit;
    } else {
        this.y += 83;
    }
}

Player.prototype.keyLeft = function(){
    const leftLimit = -6;
    if ((this.x - 101) < leftLimit){
        this.x = leftLimit;
    } else {
        this.x -= 101;
    }
}

Player.prototype.keyRight = function(){
    const rightLimit = 410;
    if ((this.x + 101) > rightLimit){
        this.x = rightLimit;
    } else {
        this.x += 101;
    }
}


Player.prototype.handleInput = function(key){
    // if direction is up/down, adjust the y value by row height.
    // if direction is left/right, adjust the x value by column width.
   if (key === 'up'){
       player.keyUp();
   }else if (key === 'right'){
       player.keyRight();
   } else if (key === 'down'){
        player.keyDown();
   } else if(key === 'left'){
        player.keyLeft();
   }
}   

Player.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// instantiate player and enemy objects
const enemy1 = new Enemy(-90, 70);
const enemy2 = new Enemy(-90, 153);
const enemy3 = new Enemy(-90, 236);
const allEnemies = [enemy1];
const player = new Player(200, 402);


// This listens for key presses and sends the keys to the
// Player.handleInput() method. 
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
