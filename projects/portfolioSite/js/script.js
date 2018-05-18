(function(){
    'use strict';

    /* ========== Global Variables =========== */

    const descriptions = document.querySelectorAll('.description');
    const descriptionModals = document.querySelectorAll('.description-modal');
    const closeModals = document.querySelectorAll('.close-modal');
    const descriptionText = document.querySelectorAll('.description-text');


    /* =========== Functions ============ */ 

    function hideModal(xModal, descriptionTxt, modal){
        // hide the modal, the text, and the 'x' that closes the modal
       xModal.style.opacity = 0;
       descriptionTxt.style.opacity = 0;
       modal.classList.remove('show-modal');
    }

    function showModal(xModal, descriptionTxt, modal){
        // show the modal, the text, and the 'x' that closes the modal
        modal.classList.add('show-modal');
        xModal.style.opacity = 1;
        descriptionTxt.style.opacity = 1;
    }


    /* ============== Event Listeners ============ */

    // show the modals on click
    for (let i = 0; i < descriptions.length; i++){
        /* use the bind method so the showModal function will not be immediately invoked */
        descriptions[i].addEventListener('click', showModal.bind(this, closeModals[i], descriptionText[i], descriptionModals[i]));
    }

    // show the modals if 'enter' is pressed
    for (let i = 0; i < descriptions.length; i++){
        /* use the bind method so the showModal function will not be immediately invoked */
        descriptions[i].addEventListener('keypress', showModal.bind(this, closeModals[i], descriptionText[i], descriptionModals[i]));
    }
/*
    // show the modals on keypress
    for (let i = 0; i < descriptions.length; i++){
        descriptions[i].addEventListener('keypress', function(e){
            if (e.keyCode === 13){
                descriptionModals[i].classList.add('show-modal');

                // wait for the show modal transition to complete before showing text
                closeModals[i].style.opacity = 1;
                descriptionText[i].style.opacity = 1;
            }
        });
    }
*/
    // hide the modals
    for (let i = 0; i < closeModals.length; i++){
        /* use the bind method so the hideModal function will not be immediately invoked */
        closeModals[i].addEventListener('click', hideModal.bind(this, closeModals[i], descriptionText[i], descriptionModals[i]));
    }


})();

