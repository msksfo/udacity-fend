(function(){
    'use strict';

    const descriptions = document.querySelectorAll('.description');
    const descriptionModals = document.querySelectorAll('.description-modal');
    const closeModals = document.querySelectorAll('.close-modal');
    const descriptionText = document.querySelectorAll('.description-text');


    // show the modals
    for (let i = 0; i < descriptions.length; i++){
        descriptions[i].addEventListener('click', function(){
            descriptionModals[i].classList.add('show-modal');

            // wait for the show modal transition to complete before showing text
            closeModals[i].style.opacity = 1;
            descriptionText[i].style.opacity = 1;
        });
    }

    // hide the modals
    for (let i = 0; i < closeModals.length; i++){
        closeModals[i].addEventListener('click', function(e){
            closeModals[i].style.opacity = 0;
            descriptionText[i].style.opacity = 0;
            descriptionModals[i].classList.remove('show-modal');
        });
    }

})();