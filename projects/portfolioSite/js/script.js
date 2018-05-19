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
        // show the modal, and the project description text
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

    //just for testing purposes
    document.body.addEventListener('keydown', function(e){
        console.log(document.activeElement);
        console.log(e.keyCode);
    })
    


    /* ============== Event Listeners ============ */

    // show the modals on click and keydown
    for (let i = 0; i < descriptions.length; i++){
        descriptions[i].addEventListener('click', function(e){
           showModal(e, closeModals[i], descriptionText[i], descriptionModals[i]);
        });

        descriptions[i].addEventListener('keydown', function(e){
            // open the modal if user pressed enter or space
            if (e.keyCode === 13 || e.keyCode === 32){
                showModal(e, closeModals[i], descriptionText[i], descriptionModals[i]);
            }
        });
    }
   


    // hide the modals on click, and keydown
    for (let i = 0; i < descriptions.length; i++){

        descriptionModals[i].addEventListener('click', function(e){
            hideModal(e, closeModals[i], descriptionText[i], descriptionModals[i]);
        });

        descriptionModals[i].addEventListener('keydown', function(e){
            // close the modal if user pressed enter or esc
            if (e.keyCode === 13 || e.keyCode === 27){
                hideModal(e, closeModals[i], descriptionText[i], descriptionModals[i]);
            }
        });
    }

})()