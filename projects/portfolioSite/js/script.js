(function(){
    'use strict';

    /* ========== Global Variables =========== */

    // the word 'description' in each figure caption
    const descriptions = document.querySelectorAll('.description');

    // the actual modal windows
    const descriptionModals = document.querySelectorAll('.description-modal');

    const closeModals = document.querySelectorAll('.close-modal');
    const descriptionText = document.querySelectorAll('.description-text');
    let lastFocusedElement;

    const workExamples = document.querySelector('.work-examples');


    /* ================ Functions ============== */ 

    function hideModal(evt, xModal, descriptionTxt, modal){
        // hide the modal, the text, and the 'x' that closes the modal
        descriptionTxt.style.opacity = 0;
        xModal.style.opacity = 0;
        modal.classList.remove('show-modal');

       // make the modal invisible to screen readers
       modal.setAttribute('aria-hidden', 'true');

       if (evt.type === 'keydown'){
            // return the focus to the element that held focus before modal was open
            lastFocusedElement.focus();
       }
       
    }

    function showModal(evt, xModal, descriptionTxt, modal){
        // show the modal, the 'x' to close it, and the project description text
        modal.classList.add('show-modal');
        descriptionTxt.style.opacity = 1;
        xModal.style.opacity = 1;
        
        if (evt.type === 'keydown'){
            // remember which element was focused before opening modal
            lastFocusedElement = document.activeElement;

            // set focus on the close button when modal is opened
            xModal.focus();  

            // keyboard trap to prevent tabbing outside the modal
            modal.addEventListener('keydown', function(e){
                if (e.keyCode === 9){
                    e.preventDefault();
                }
            });
        }

        // make the modal visible to screen readers
        modal.setAttribute('aria-hidden', 'false');
    }

    /* ================== Event Listeners =============== */

    /* these two event listeners have the same funcionality, to open/close the modal. one is for mouse users(click), the other for keyboard users(keydown) */
    
    workExamples.addEventListener('click', function(e){
        // turn nodelists into arrays so i can use array methods on them
        const descriptionsArr = Array.from(descriptions);
        const closeModalsArr = Array.from(closeModals);
        

        // find specifically which element was clicked
        const index = descriptionsArr.indexOf(e.target);
        const modalIndex = closeModalsArr.indexOf(e.target);

        /* if the user clicks the word 'description', determine which one and show the corresponding modal. if the modal is open and they click the 'x', close the modal that is open */
        if (e.target.classList.contains('description')){
            showModal(e, closeModals[index], descriptionText[index], descriptionModals[index]);
        } else if (e.target.classList.contains('close-modal')){
        hideModal(e, closeModals[modalIndex], descriptionText[modalIndex], descriptionModals[modalIndex]);
        }
        
    });


    workExamples.addEventListener('keydown', function(e){
        // turn nodelists into arrays so i can use array methods on them
        const descriptionsArr = Array.from(descriptions);
        const closeModalsArr = Array.from(closeModals);  

        // find specifically which key was pressed
        const index = descriptionsArr.indexOf(e.target);
        const modalIndex = closeModalsArr.indexOf(e.target);

        /* if the user presses enter or space while the word 'description' is in focus, determine which one and show the corresponding modal. if the modal is open and they press enter or escape while 'x' is in focus, close the modal that is open. also prevent the default behavior of the space and enter keys */
        if ((e.keyCode === 13 || e.keyCode === 32) && (e.target.classList.contains('description'))){
            // when modal is closed, prevent default behavior of enter and space
            e.preventDefault();
            showModal(e, closeModals[index], descriptionText[index], descriptionModals[index]);
        } else {
            if ((e.keyCode === 32) && (e.target.classList.contains('close-modal'))){
                // if modal is open, prevent default behavior of the space key
                e.preventDefault();
            } else if ((e.keyCode === 13 || e.keyCode === 27) && (e.target.classList.contains('close-modal'))){
                hideModal(e, closeModals[modalIndex], descriptionText[modalIndex], descriptionModals[modalIndex]);
            } 
            
        }
    });

})()