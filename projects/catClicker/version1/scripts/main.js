
const select = document.getElementById('select');
const options = document.getElementById('select').options;
let image = document.querySelector('.photo');
const figure = document.querySelector('.figure');
const numSpan = figure.childNodes[5].childNodes[2];

/* the index will be equal to the index of the selected option. the objects in the cirrus array are in the same order as the options in the select. this is how i will change the image title, alt text, and keep track of number of likes
*/
let index = 0;



const cirrus = [
    {title: 'Sleepy Kitten', alt: 'Cirrus when she was a kitten, sleeping', hearts: 0},
    {title: 'California Cat', alt: 'Cirrus leaning against the frame of a convertible with its top down', hearts: 0},
    {title: 'Avgeek Cat', alt: 'Cirrus on the top of a ladder in front of a BT-13', hearts: 0},
    {title: 'Birthday Cat', alt: 'Cirrus on her birthday, with a lit candle in her food', hearts: 0},
    {title: 'Santa Cat', alt: 'Cirrus wearing her santa hat', hearts: 0},
    {title: 'Pilot Cat', alt: 'Cirrus leaning out the window of a Cessna 172 before flying', hearts: 0},
    {title: 'Sunbathing Cat', alt: 'Cirrus sitting on the bench on the balcony', hearts: 0},
    {title: 'I Hate Mondays Cat', alt: 'Cirrus as a tiny kitten, exhausted, sleeping with feet splayed out in front of her', hearts: 0},
    {title: 'Window Seat', alt: 'Cirrus looking out the window while flying in a Cessna', hearts: 0},
    {title: 'Thieving Cat', alt: 'Cirrus as a kitten, runnning away with a five dollar bill in her mouth', hearts: 0},
    {title: 'Copilot Cat', alt: 'Cirrus watching daddy handle the controls of the Cessna', hearts: 0},
    {title: 'Sunbathing Kitten', alt: 'Cirrus as a kitten sunbathing on the bench outside', hearts: 0},
    {title: 'Family Portrait', alt: "Cirrus' first photo with her new family", hearts: 0},
];

select.addEventListener('change', function(e){
    let title = document.querySelector('#title');
    let image = document.querySelector('.photo');

    // get the index of which option was chosen
    let chosenImage = e.target.options.selectedIndex;
    index = e.target.options.selectedIndex;

    // get the image source of the option which was chosen 
    let chosenImageSource = options[chosenImage].value;

    // set the src of the img to be the src of the option that was chosen 
    image.src = chosenImageSource;

    // set the image alt text. 
    image.alt = cirrus[chosenImage].alt;

    // set the figure caption
    title.innerHTML = 'Cirrus, The ' + cirrus[chosenImage].title; 

    // make sure the UI displays the correct value of hearts
    numSpan.innerHTML = cirrus[index].hearts;
});



figure.addEventListener('click', function(){
    // update the value of hearts in the cirrus object
    cirrus[index].hearts += 1;

    // reflect the above change in the UI
    numSpan.innerHTML = cirrus[index].hearts;
});



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