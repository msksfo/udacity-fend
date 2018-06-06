(function main(){

/* the index will be equal to the index of the selected option. the objects in the cirrus array are in the same order as the options in the select. this is how i will change the image title, alt text, and keep track of number of likes
*/
let index = 0;

function view(){
    // the html elements whose values will be changed based on user interaction

    const select = document.getElementById('select');
    //const options = document.getElementById('select').options;
    const figure = document.querySelector('.figure');

    // the span that displays the number of likes
    const numSpan = figure.childNodes[5].childNodes[2];

    const myView = {
        select: select,
        //options: options,
        figure: figure,
        numSpan: numSpan
    }
    return myView;
}


function model(){
    // an array of objects. each object holds photo title, alt text, and number of likes
    const cirrus = [
        {title: 'Sleepy Kitten', src: "images/sleepyCirrus.jpg", alt: 'Cirrus when she was a kitten, sleeping', hearts: 0},
        {title: 'California Cat', src: "images/californiaCat.jpg", alt: 'Cirrus leaning against the frame of a convertible with its top down', hearts: 0},
        {title: 'Avgeek Cat', src: "images/btCirrus.jpg", alt: 'Cirrus on the top of a ladder in front of a BT-13', hearts: 0},
        {title: 'Birthday Cat', src: "images/happyBirthday.jpg", alt: 'Cirrus on her birthday, with a lit candle in her food', hearts: 0},
        {title: 'Santa Cat', src: "images/santaCat.jpg", alt: 'Cirrus wearing her santa hat', hearts: 0},
        {title: 'Pilot Cat', src: "images/clearProp.jpg", alt: 'Cirrus leaning out the window of a Cessna 172 before flying', hearts: 0},
        {title: 'Sunbathing Cat', src: "images/sunbathing2.jpg", alt: 'Cirrus sitting on the bench on the balcony', hearts: 0},
        {title: 'I Hate Mondays Cat', src: "images/imtoocute.jpg", alt: 'Cirrus as a tiny kitten, exhausted, sleeping with feet splayed out in front of her', hearts: 0},
        {title: 'Curious Passenger Cat', src: "images/windowSeat.jpg", alt: 'Cirrus looking out the window while flying in a Cessna', hearts: 0},
        {title: 'Thieving Cat', src: "images/thievingCat.jpg", alt: 'Cirrus as a kitten, runnning away with a five dollar bill in her mouth', hearts: 0},
        {title: 'Copilot Cat', src: "images/copilot.jpg", alt: 'Cirrus watching daddy handle the controls of the Cessna', hearts: 0},
        {title: 'Sunbathing Kitten', src: "images/sunbathing1.jpg", alt: 'Cirrus as a kitten sunbathing on the bench outside', hearts: 0},
        {title: 'Family Portrait', src: "images/familyPortrait.jpg", alt: "Cirrus' first photo with her new family", hearts: 0},
    ];

    return cirrus;

}

function octopus(myModel, theView){
    const view = theView();
    const cirrus = myModel();

    view.select.addEventListener('change', function(e){
        let title = document.querySelector('#title');
        let image = document.querySelector('.photo');
    
        // get the index of which option was chosen
        index = e.target.options.selectedIndex;
       
        // get the image source of the option which was chosen 
        let chosenImageSource = cirrus[index].src
    
        // set the src of the img to be the src of the option that was chosen 
        image.src = chosenImageSource;
    
        // set the image alt text. 
        image.alt = cirrus[index].alt;
    
        // set the figure caption 
        title.innerHTML = 'Cirrus, The ' + cirrus[index].title; 
    
        // make sure the UI displays the correct value of hearts
        view.numSpan.innerHTML = cirrus[index].hearts;
    });
    
    
    view.figure.addEventListener('click', function(){
        // update the value of hearts in the cirrus object
        cirrus[index].hearts += 1;
    
        // reflect the above change in the UI
        view.numSpan.innerHTML = cirrus[index].hearts;
    });
    
}

octopus(model, view);


})();








/*
cat clicker version 2 using closure  

// list of all photos with class of .cirrus 
const cirrus = document.querySelectorAll('.cirrus');

for (let i = 0; i < cirrus.length; i++){
    let numLikes = 0;

    cirrus[i].addEventListener('click', (function(num){
       
        let numSpan = cirrus[i].nextElementSibling.childNodes[2];

        return function(){
            numLikes += 1;
            numSpan.innerHTML = numLikes;
        }

    })(numLikes));
}
*/