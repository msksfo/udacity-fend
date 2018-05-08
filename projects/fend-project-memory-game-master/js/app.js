
// cards is an array of the li's
const cards = document.querySelectorAll('.card');

/* 
each array in photos holds the img src attribute and the alt text
    - BT-13 photo by Owen Leipelt. All others by TouchNGo Aviation Photography
*/
const photos = [['bt13.jpg', 'Alex and Tia flying in the BT-13.'], ['as.jpg', 'Alaska Airlines, more to love livery'],['ek.jpg', 'Emirates A380 taking off at SFO'], ['a2a.jpg', 'Belgian Airforce F-16'],['as-disney.jpg', 'Alaska Airlines, disney plane'], ['ei.jpg', 'Aer Lingus landing at SFO'], ['p51.jpg', 'P51 Mustang flying in an airshow'],['as-vx.jpg', 'Alaska and Virgin parallel takeoff at SFO'], ['bt13.jpg', 'Alex and Tia flying in the BT-13.'], ['as.jpg', 'Alaska Airlines, more to love livery'],['ek.jpg', 'Emirates A380 taking off at SFO'], ['a2a.jpg', 'Belgian Airforce F-16'],['as-disney.jpg', 'Alaska Airlines, disney plane'], ['ei.jpg', 'Aer Lingus landing at SFO'], ['p51.jpg', 'P51 Mustang flying in an airshow'],['as-vx.jpg', 'Alaska and Virgin parallel takeoff at SFO']];


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
    let shuffled = shuffleFunction(arr);
    let gameBoard = document.querySelector('.deck');
    let lis = gameBoard.children;
   
    for (let i = 0; i < lis.length; i++){
        let img = document.createElement('img');
        img.src = `images/${shuffled[i][0]}`;
        img.classList.add('photo'); 
        img.alt = `${shuffled[i][1]}`;
        lis[i].appendChild(img);
    }

    disableRightClick();
}

populateGameBoard(shuffle, photos);



/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

 const openCards = [];
 let matches = 0;
 let moves = 0;

 cards.forEach(value => value.addEventListener('click', function(e){
     // get which card specifically was clicked
     let target = e.target;

     // count how many moves the user needed to win the game
     moves += 1;
   
     showCard(target);
     checkForMatch(openCards);
     if (openCards.length === 16){
         checkForWin(matches, moves);
     }
 }));
 

 function showCard(card){
     /* add the open-card class, which transitions the width of the cover to 0, allowing the photo to be seen. add the card to the array of open cards */
    let openCard = card.nextElementSibling;
    openCards.push(openCard);
    card.classList.add('open-card');
 }

 function hideCard(e){
    e.target.classList.remove('open-card');
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
            let cardOne = slicedArr[0];
            let cardTwo = slicedArr[1];
            
            setTimeout(function(){
                cardOne.previousElementSibling.classList.remove('open-card');
                cardTwo.previousElementSibling.classList.remove('open-card');
            }, 800);

            arr.length = arr.length - 2;
        }
     }
   
 }

 function checkForWin(numMatches, numMoves){
     /* if there are eight matching pairs, the user has won the game */
    if (numMatches === 8){
        console.log(`Congratulations! You won the game in ${numMoves / 2} moves`);
    } 
 }

 

document.querySelector('.fa-repeat').addEventListener('click', function(){
    startOver(populateGameBoard, shuffle, photos);
});
   

function startOver(repopulate, reshuffle, arr){
   // hide the images 
   hideImages();

   // reset the game global values
   matches = 0;
   moves = 0;
   openCards.length = 0;

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