// tried to make sure all global variables were called in a single location
let Board = document.getElementById('board');
let selectedCards = [];
let restartButton = document.getElementById('restart');
let moveCounter, matchCount, stars, timeStart, TimeEnd, totalGameTime;
const moveDisplay = document.querySelector('.moves');

// took this (CardsArray & generateCard() ) idea from the webinar.
// wanted to change it to only listing each card once in the array and have
// the generateCard function or the cardsArray.Map (inside the resetGame function)
// create the duplicate for each card. decided to focus on the project. 
const CardsArray = [
    'fa-anchor',
    'fa-bicycle',
    'fa-bolt',
    'fa-bomb',
    'fa-cube',
    'fa-diamond',
    'fa-leaf',
    'fa-paper-plane-o',
];

function generateCard(card) {
    return `<li class ="card"><i class="fa ${card}"></i></li>`;
};

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
};

function resetGame() {
    const board = document.querySelector('#board');
    let cardsHTML = CardsArray.map(function (card) {
        return generateCard(card);
    });
    cardsHTML = cardsHTML.concat(cardsHTML);
    shuffle(cardsHTML);
    board.innerHTML = cardsHTML.join('');
    moveCounter = 0;
    moveDisplay.innerText = moveCounter;
    matchCount = 0;
    calcStars(moveCounter);
    timeStart = 0;
    scorePanelTimer();
};

function respondToClick(evt) {
    if (timeStart == 0) {
        timeStart = Date.now();
        scorePanelTimer();
    };

    if (evt.target.classList != "card") {
        console.log("please click a card");
    } else if (selectedCards.length < 2) {
        selectedCards.push(evt.target);
        openCard(evt);
        if (selectedCards.length == 2) {
            addMove();
            checkMatch(selectedCards);
        };
    };
};

function openCard(evt) {
    if (evt.target.classList != "open") {
        evt.target.classList.add('open', 'show');
    };
};

function closeCard(foo) {
    foo.forEach(function (card) {
        card.classList.remove('open', 'show');
    });
};

function checkMatch(bar) {
    let cardA = bar[0].querySelector('i').classList;
    let cardB = bar[1].querySelector('i').classList;
    if (cardA[1] == cardB[1]) {
        matchCount += 1;
        bar.forEach(function (card) {
            card.classList.remove('open', 'show');
            card.classList.add('match');
            selectedCards = [];
        });
    } else {
        setTimeout(function () {
            closeCard(bar);
            selectedCards = [];
        }, 1000);
    };
    if (matchCount == 8) {
        endGame();
    };
};

// moves are only added when a second card is selected. 1 move = pair selected
// defined in respondToClick()
function addMove() {
    moveCounter += 1;
    moveDisplay.innerText = moveCounter;
    calcStars(moveCounter);
};

// calcStars only evaluates based on number of moves. the entire timer 
// function would need to be modified if we wanted to calculate stars 
// based off the timer.
function calcStars(i) {
    let star3 = document.getElementById('starThree');
    let star2 = document.getElementById('starTwo');
    let star1 = document.getElementById('starOne');
    if (i > 24) {
        stars = 1;
    } else if (i > 12) {
        stars = 2;
    } else {
        stars = 3;
    };
    if (stars == 3) {
        star3.classList.remove("hide");
        star2.classList.remove("hide");
        star1.classList.remove("hide");
    } else if (stars == 2) {
        star3.classList.add("hide");
    } else {
        star2.classList.add("hide");
    };
};
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
function endGame() {
    calcGameTime();
    scorePanelTimer();
    if (confirm(`You\'ve completed the game in ${moveCounter} moves.
                \nIt took you ${totalGameTime} to complete.
                \nYou earned ${stars} stars.
                \nDo you want to play again?`)) {
        resetGame();
    };
};

//calculate game time when all matches are completed
function calcGameTime() {
    timeEnd = Date.now();
    let gameDuration = timeEnd - timeStart;
    let gameSeconds, gameMinutes, gameHours;

    //add leading zero to minutes and seconds when needed
    function leadingZero(i) {
        if (i < 10) {
            i = "0" + i;
        };
        return i;
    };
    function displayTime(h, m, s) {
        s = leadingZero(s);
        if (h > 0) {
            m = leadingZero(m);
            totalGameTime = `${h}:${m}:${s}`;
        } else {
            totalGameTime = `${m}:${s}`;
        };
    };
    gameSeconds = Math.floor(gameDuration / 1000);
    if (gameSeconds > 60) {
        gameMinutes = Math.floor(gameSeconds / 60);
        gameSeconds = gameSeconds - (gameMinutes * 60);
    } else {
        gameMinutes = 0;
    };
    if (gameMinutes > 60) {
        gameHours = Math.floor(gameMinutes / 60);
        gameMinutes = gameMinutes - (gameHours * 60);
    };
    displayTime(gameHours, gameMinutes, gameSeconds);
};

function scorePanelTimer() {
    if (timeStart == 0) {
        let scorePanelTime = document.getElementById('time');
        scorePanelTime.innerText = `Time 0:00`;
    } else if (moveCounter !==8) {
        setInterval(function () {
            calcGameTime();
            let scorePanelTime = document.getElementById('time');
            scorePanelTime.innerText = `Time ${totalGameTime}`;
        }, 100);
    } else {
        calcGameTime();
        let scorePanelTime = document.getElementById('time');
        scorePanelTime.innerText = `Time ${totalGameTime}`;
    };
}



resetGame();

Board.addEventListener('click', respondToClick);
restartButton.addEventListener('click', resetGame);