const descriptions = document.querySelectorAll('.description');
const descriptionModals = document.querySelectorAll('.description-modal');
const closeModals = document.querySelectorAll('.close-modal');


// show the modals
for (let i = 0; i < descriptions.length; i++){
    descriptions[i].addEventListener('click', function(){
        descriptionModals[i].style.display = 'flex';
    });
}

// hide the modals
for (let i = 0; i < closeModals.length; i++){
    closeModals[i].addEventListener('click', function(e){
        descriptionModals[i].style.display = 'none';
    });
}