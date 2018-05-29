/* ========================= Enemy Class and Methods ========================== */

// Enemies our player must avoid
var Enemy = function(x, y, sprite, height, width, direction) {
    // give each enemy starting coordinates, a random speed, height/width, and assign sprite
    this.x = x;
    this.y = y;
    this.height = height;
    this.width = width;
    this.sprite = sprite;
    this.direction = direction;

    // if the sprite is a tiefighter, it should go faster
    if (this.sprite == 'images/tiefighter.png'){
        this.randomSpeed = Math.random() + 2;
    } else {
        this.randomSpeed = Math.random() + .7;
    }
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    /* if the enemy's x position is off the board, reset the position to the starting position */

    if (this.direction === 'rl'){
        if (this.x <= -100){
            this.x = 500;
        } else {
            (this.x -= this.randomSpeed) * dt;
        }
    } else {
        if (this.x >= 500){
            this.x = -100;
         } else {
             (this.x += this.randomSpeed) * dt;
         }
    }
    
    // if any part of the two sprites is overlapping, they have crashed.
    if ( (this.x + this.width >= player.x) && (this.y + this.height >= player.y) && (player.x + player.width >= this.x) && (player.y + player.height >= this.y) ) {
        // reset player coordinates when sprites crash. reset points to 0
        setTimeout(function(){
            player.y = 402;;
            player.x = 200;
            points.innerHTML = 0;
        }, 150);
    } 
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

/* ============================= Player Class and Methods ========================== */

// player class
var Player = function(x, y){
    this.x = x;
    this.y = y;  
    this.sprite = 'images/rocket.png'
    this.height = 35;
    this.width = 50;
}

Player.prototype.getRandomX = function(){
     /*  get a random number between 0 and (board width - sprite width)
    this random number will be the x coordinate anytime the sprite is reset  */
    return Math.floor(Math.random() * 404 + 1);
}

Player.prototype.update = function(dt){}

/* ====== control player movement ===== */

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

/* ============ Global Variables & Player/Enemy Instances ================== */

let points = document.querySelector('.points-value');
let gameLevel = 1;

// instantiate player and enemy objects
const enemy1 = new Enemy(-90, 153, 'images/alien1.png', 65, 70, 'lr');
const enemy2= new Enemy(-95, 70, 'images/alien4.png', 60, 50, 'lr');
const enemy3 = new Enemy(-100, 236, 'images/alien2.png', 65,  70, 'lr');
const enemy4 = new Enemy(510, 319, 'images/alien3.png', 60, 50, 'rl');
const enemy5 = new Enemy(500, 100, 'images/tiefighter.png', 65, 70, 'rl');
const enemy6 = new Enemy(-90, 259, 'images/tiefighter.png', 65, 70, 'lr');
const enemy7 = new Enemy(510, 319, 'images/alien4.png', 60, 50, 'rl');

let allEnemies = [enemy1];
const player = new Player(200, 402);


/* ================ Functions ================ */

function updatePoints(){
    // add 50 points each time the player makes it to space
    points.innerHTML  = (points.innerHTML * 1) + 50;
    if (gameLevel === 1){
        levelOne()
    }   
}

function levelOne(){
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

function increaseLevelUi(){
    let level = document.querySelector('.level-value');
    /* set the level to the global gameLevel variable. NOTE: updateModal function increments this variable */
    setTimeout(function(){
        level.innerHTML = gameLevel;
        points.innerHTML = 0;
    }, 1500);
    
}

function increaseDifficulty(){
    setTimeout(function(){
        if (gameLevel === 2){
            allEnemies = [enemy1, enemy2, enemy3, enemy4];
            allEnemies.forEach(function(enemy) {
                enemy.render();        
            });
        }
        else if (gameLevel === 3){
            allEnemies = [enemy1, enemy2, enemy3, enemy7, enemy5, enemy6];
            allEnemies.forEach(function(enemy) {
                enemy.render();        
            });
        } 
    }, 700);  
}

function winGame(){
    // congratulate user for winning. ask if they want to play again
    setTimeout(function(){
        if (gameLevel === 4){
            let winningModal = document.querySelector('.winning-modal');
            winningModal.classList.add('show-winning-modal');

            let replay = document.querySelector('.replay');
            let quit = document.querySelector('.quit');

            replay.addEventListener('click', replayGame);
            quit.addEventListener('click', quitGame);
        }
    }, 1500);
}

function quitGame(){
    document.querySelector('.congratulations-text').style.display = 'none';
}

function replayGame(){
    // hide the modal. restart the game at level 1
    setTimeout(function(){
        winningModal.classList.toggle('show-winning-modal');
    }, 1000);

    setTimeout(() => window.location.reload(), 1000);
}

function updateModal(){
    // increment the global gameLevel variable, and set the level in the modal to that value
    gameLevel += 1;
    let modalLevel = document.querySelector('.modal-level-value');
    // only increment up to level 3 because player wins the game if they pass level 3
    if (gameLevel <= 3){
        modalLevel.innerHTML = gameLevel;
    }
}

function winLevel(){ 
    // update the level in the modal before showing the modal  
    updateModal();

    // if the game level is 4, the player has won the game
    if (gameLevel === 4){
        winGame();
    } else {
        const congratulations = document.querySelector('.congratulations');
        player.x = player.x;
    
       // show the modal. hide the enemies
        setTimeout(function(){
            allEnemies.length = 0;
            congratulations.classList.toggle('show-congratulations');
        }, 1000);

        // while the modal is hiding the score panel, update those score pane UI values
        increaseLevelUi();

        // move player to starting position. inrease game difficulty
        setTimeout(function(){
            congratulations.classList.toggle('show-congratulations');
            player.x = 200;
            player.y = 402;  
            increaseDifficulty();
        }, 3000);
    }
    
}


/* ======================= Event Listeners ===================== */

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
