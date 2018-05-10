/* ====================== GLOBAL VARIABLES ======================= */

// covers is an array of the divs hide the photos
const covers = document.querySelectorAll('.cover');

/* 
each array in photos holds the img src attribute and the alt text
    - BT-13 photo by Owen Leipelt. All others by TouchNGo Aviation Photography
*/
const photos = [
    ['bt13.jpg', 'Alex and Tia flying in the BT-13.'],
    ['as.jpg', 'Alaska Airlines, more to love livery'],
    ['ek.jpg', 'Emirates A380 taking off at SFO'],
    ['a2a.jpg', 'Belgian Airforce F-16'],
    ['as-disney.jpg', 'Alaska Airlines, disney plane'],
    ['ei.jpg', 'Aer Lingus landing at SFO'],
    ['p51.jpg', 'P51 Mustang flying in an airshow'],
    ['as-vx.jpg', 'Alaska and Virgin parallel takeoff at SFO'],
    ['bt13.jpg', 'Alex and Tia flying in the BT-13.'],
    ['as.jpg', 'Alaska Airlines, more to love livery'],
    ['ek.jpg', 'Emirates A380 taking off at SFO'],
    ['a2a.jpg', 'Belgian Airforce F-16'],
    ['as-disney.jpg', 'Alaska Airlines, disney plane'],
    ['ei.jpg', 'Aer Lingus landing at SFO'],
    ['p51.jpg', 'P51 Mustang flying in an airshow'],
    ['as-vx.jpg', 'Alaska and Virgin parallel takeoff at SFO']
];

 const openCards = [];
 let matches = 0;
 let moves = 0;

 const starIcons = document.querySelectorAll('.fa-star');
 let index = starIcons.length - 1;

 const seconds = document.querySelector('.seconds');
 const minutes = document.querySelector('.minutes');
 let startTimer;
 let secondsCount = 0;
 let minutesCount = 0;
 let totalSeconds = 0;

/* ========================= FUNCTIONS ============================== */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

// disable right click for Alex's photos
function disableRightClick(){
    const images = document.querySelectorAll('.photo');
    for (let i = 0; i < images.length; i++){
        images[i].oncontextmenu = function(){
            return false;
        }
    }
}


/* shuffle the cards, and populate the board with the images & alt text */
function populateGameBoard(shuffleFunction, arr) {
    const shuffled = shuffleFunction(arr);
    const gameBoard = document.querySelector('.deck');
    const lis = gameBoard.children;
   
    for (let i = 0; i < lis.length; i++){
        let img = document.createElement('img');
        img.src = `images/${shuffled[i][0]}`;
        img.classList.add('photo'); 
        img.alt = `${shuffled[i][1]}`;
        lis[i].appendChild(img);
    }

    disableRightClick();
}

 function showCard(card){
     /* add the open-card class, which transitions the width of the cover to 0, allowing the photo to be seen. add the card to the array of open cards */
    const openCard = card.nextElementSibling;
    openCards.push(openCard);
    card.classList.add('open-card');
 }

 function checkForMatch(arr){
     /* check the last two cards in the array of open cards. if they do not match, remove them from the array, and reapply the styling to hide the photo */
     let slicedArr;

     if (arr.length >= 2 && arr.length % 2 === 0){
        slicedArr = arr.slice(arr.length - 2);
        if (slicedArr[0].src === slicedArr[1].src){
            matches += 1;
            
            slicedArr[0].classList.add('img-match');
            slicedArr[1].classList.add('img-match');
        } else {
            const cardOne = slicedArr[0];
            const cardTwo = slicedArr[1];      
            setTimeout(function(){
                cardOne.previousElementSibling.classList.remove('open-card');
                cardTwo.previousElementSibling.classList.remove('open-card');
            }, 800);

            arr.length = arr.length - 2;
        }
     } 
 }


 function checkForWin(numMatches){
     /* if there are eight matching pairs, the user has won the game */
    if (numMatches === 8){
        // stop the timer
        clearInterval(startTimer);

        // tell user their stats
        displayStats(starIcons, moves);
    } 
 }


 function displayStats(arr, numMoves){
     
     const rating = document.querySelector('.rating-span');
     const moves = document.querySelector('.moves-span');
     const seconds = document.querySelector('.seconds-span');

     // find out which star rating the user achieved, according to star color
     const length = arr.length - 1;

     setTimeout(function(){
        document.querySelector('.modal-background').style.display = 'block';

        if (arr[length].style.color === 'goldenrod'){
            rating.innerHTML = 3;
            moves.innerHTML = numMoves;
            seconds.innerHTML = totalSeconds;
         } else if (arr[length - 1].style.color === 'goldenrod' ){
            rating.innerHTML = 2;
            moves.innerHTML = numMoves;
            seconds.innerHTML = totalSeconds;
         } else {
            rating.innerHTML = 1;
            moves.innerHTML = numMoves;
            seconds.innerHTML = totalSeconds;
         }
     }, 1300);
    
 }


 function resetGlobals(){
     // reset all the global values, and the timer to zero/initial value
     matches = 0;
     openCards.length = 0;
     moves = 0;
     document.querySelector('.moves').innerHTML = moves;
     index = starIcons.length - 1;
     starIcons.forEach(star => star.style.color = 'goldenrod');
     resetTimer();
 }
   

function startOver(repopulate, reshuffle, arr){
    // stop the timer
    clearInterval(startTimer)

   // hide the images 
   hideImages();

   // reset the global game values
   resetGlobals();

   // use a timeout to allow the transition in the hideImages function to complete
   setTimeout(function(){
    // remove the <img> from each .card
    const lis = document.querySelectorAll('.card');
   
    for (let i = 0; i < lis.length; i++){
        lis[i].removeChild(lis[i].children[1]);
    }

    // shuffle the images and repopulate the board
    repopulate(reshuffle, arr);

   }, 1000);
}


function hideImages(){
    // make sure the images are hidden
    const cards = document.querySelectorAll('.card');
    cards.forEach(value => value.firstElementChild.classList.remove('open-card'));
}


function incrementMoves(){
    // count the moves, and display number of moves to UI
    moves += 1;
    document.querySelector('.moves').innerHTML = moves;
}


function decrementStars(){
    // deduct a star when user takes more than a certain number of moves 
    starIcons[index].style.color = 'rgba(218, 165, 32, 0.2)';
    index --;
}


function trackStars(mvs){
    // track how many moves have been made, and decrement stars when appropriate
    if (mvs === 35){
        decrementStars();
    } else if (mvs === 25){
        decrementStars();
    }
}


function resetTimer(){
    // reset timer values in UI
    seconds.innerHTML = '00';
    minutes.innerHTML = '00';

   // reset global timer variables
    secondsCount = 0;
    minutesCount = 0;
    totalSeconds = 0;
}

function timer(){
    // this function gets called once per second in setInterval
   secondsCount ++;
   totalSeconds ++;

   if (secondsCount < 10){ // for seconds 1-9, pad the number with a 0
    seconds.innerHTML = `0${secondsCount}`;
   } else if (secondsCount === 60){
        secondsCount = 0;
        seconds.innerHTML = `0${secondsCount}`;

        minutesCount += 1;
        if (minutesCount < 10){ // for minutes 1-9, pad the number with a 0
            minutes.innerHTML = `0${minutesCount}`;
        } else {
            minutes.innerHTML = minutesCount;
        }
   } else {
    seconds.innerHTML = secondsCount;
   } 
}

function playAgain(){
    // to play the game again- hide the modal, shuffle cards, populate the board
    document.querySelector('.modal-background').style.display = 'none';
    startOver(populateGameBoard, shuffle, photos);
}

function quitGame() {
    // quit the game. leave user with aerial view of SFO
    document.querySelector('.modal-inner').classList.add('fade-out');
}


function main(){
    // this is the function that begins the game 
    starIcons.forEach(star => star.style.color = 'goldenrod');
    populateGameBoard(shuffle, photos);
}


/* ============================ EVENT LISTENERS ============================== */

covers.forEach(value => value.addEventListener('click', function(e){
    // get which card specifically was clicked
    const target = e.target;

    incrementMoves();
    trackStars(moves);

   // start the timer with the first click
    if (moves === 1){
       startTimer = setInterval(timer, 1000);
   }
   
    showCard(target);
    checkForMatch(openCards);
    if (openCards.length === 16){
        checkForWin(matches, moves);
    }
}));

// restart icon
document.querySelector('#restart').addEventListener('click', function(){
    startOver(populateGameBoard, shuffle, photos);
});


// modal buttons to play again or quit
document.querySelector('.replay-button').addEventListener('click', playAgain);

document.querySelector('.quit-button').addEventListener('click', quitGame);


/* ================= GAME INITIALIZATION ================ */

main();
