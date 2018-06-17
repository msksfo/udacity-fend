# Space Evaders, Arcade Game Clone

## About The Project
This project is a an HTML canvas game in the style of the arcade game frogger. It is part of the Udacity Frontend Nanodegree coursework, and some starter code was provided by Udacity. There are no extra dependencies. Clone or download the repository and you are all set to play, or improve upon it and make it your own. 

## Directions
Use the arrow keys to maneuver the rocket ship to space. Each time you reach space you will receive 50 points. However, if you collide with an alien your points will be reset to 0, and you will return your starting position on the gameboard. When you have accummulated 150 points, you advance to the next level, where your points will be reset to zero. If you reach 150 points on level three, you win the game, at which point you can choose to play again or quit.  

## Credits
* Graphics by https://sweetclipart.com and https://pngtree.com

## Code Navigation
* resources.js is an image loading utility. It eases the process of loading image files so that     they can be used within the game. It also includes a simple "caching" layer to reuse cached       images if you attempt to load the same image multiple times.

* engine.js provides the game loop functionality (update entities and render), draws the initial    game board on the screen, and then calls the update and render methods on the player and enemy    objects (defined in app.js). This engine makes the canvas' context (ctx) object globally          available to make writing app.js a little simpler to work with.

* app.js contains the logic that allows the game to be played, including logic for collision        detection, scoring, increased levels of difficulty, resetting all values so the game can be      replayed, etc. It also contains the enemy/player classes and instantiation.
 

## Game Link
https://msksfo.github.io/udacity-fend/projects/arcadeGame/index.html
