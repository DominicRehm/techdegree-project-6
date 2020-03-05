// Variables
const overlay = document.querySelector('#overlay');
const startButton = overlay.querySelector('.btn__reset');
const phrase = document.querySelector('#phrase');
const qwerty = document.querySelector('#qwerty');
const button = qwerty.querySelector('button');

let missed = 0;

// array with phrases
const phrases = [
    'happy coding',
    'team treehouse',
    'javascript',
    'coding',
    'techdegree',
    'wheel of success'
];


// return a random phrase from an array
function getRandomPhraseAsArray(arr) {
    let randomPhrase = arr[Math.floor(Math.random() * arr.length)];
    const charakter = randomPhrase.split('');
    return charakter;
};


// adds the letters of a string to the display
function addPhraseToDisplay(arr) {
    const ul = phrase.querySelector('ul');
    for (i = 0; i < arr.length; i++) {
        let li = document.createElement('li');
        li.textContent = arr[i];
        ul.appendChild(li);

        if (!(arr[i].indexOf(' ') > -1)) {
            li.classList.add('letter');
        } else {
            li.classList.add('space');
        }
    }
};

// check if a letter is in the phrase
function checkLetter(button) {
    const letter = document.getElementsByClassName('letter');
    let foundMatch = null;
    for (i = 0; i < letter.length; i++) {
        if (button.textContent === letter[i].textContent) {
            letter[i].classList.add('show');
            foundMatch = button.textContent;
        }
    }
    return foundMatch;
};

// next round by pressing button -> RESET
function nextRound() {
    const ul = document.querySelector('ul');
    ul.innerHTML = '';

    overlay.style.display = 'none';
    const phrase = getRandomPhraseAsArray(phrases);
    addPhraseToDisplay(phrase);

    // Set keyrow buttons to default
    const keyrowButtons = document.getElementsByTagName('button');
    for (i = 0; i < keyrowButtons.length; i++) {
        keyrowButtons[i].classList.remove('chosen');
        keyrowButtons[i].disabled = false;
    };

    // Set live to default
    const liveList = document.getElementsByClassName('tries');
    for (let i = 0; i < liveList.length; i++) {
          liveList[i].children[0].src = 'images/liveHeart.png';    
    };

    missed = 0;

};

// check if the game has been won or lost
function checkWin() {
    const letter = document.querySelectorAll('.letter');
    const show = document.querySelectorAll('.show');
    const heading = document.querySelector('.title');
    if (letter.length === show.length) {
        overlay.className = 'win';
        overlay.style.display = 'flex';
        startButton.textContent = 'Next Round!';
        heading.innerHTML = 'Congratulation! You did it!';

    } else if (missed > 4) {
        overlay.className = 'lose';
        overlay.style.display = 'flex';
        startButton.textContent = 'Next Round!';
        heading.innerHTML = 'Ohhhhh that was bad ... Next try?';
    }
};

// listen for the start game button to be pressed
startButton.addEventListener('click', () => {
    nextRound();
});


// listen for the onscreen keyboard to be clicked
qwerty.addEventListener('click', (e) => {
    const button = e.target;
    if (button.tagName === 'BUTTON') {
        button.disabled = 'true';
        button.classList.add('chosen');
        const checkLe = checkLetter(button);

        if (checkLe === null) {
            const liveList = document.getElementsByClassName('tries');
            for (let i = 0; i < liveList.length; i++) {
                if (liveList[i].children[0].src.indexOf("live") > -1) {
                  liveList[i].children[0].src = 'images/lostHeart.png';
                  missed += 1;
                  break;
                }
              }
        }
    }
    checkWin();
});

