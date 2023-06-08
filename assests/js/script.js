// game selectors
const moves = document.getElementById("moves");
const timeValue = document.getElementById("timer");
const startButton = document.getElementById("start-button");
const stopButton = document.getElementById("stop-button");
const controls = document.querySelector(".initial-startUp");
const result = document.getElementById("results-content");
const resetAllCards = () => {
    cards.forEach(card => card.classList.remove('flip'));
};

// start game functions
const startGame = () => {
    movesCount = 0;
    seconds = 0;
    minutes = 0;
    controls.classList.add("hide");
    startButton.classList.add("hide");
    stopButton.classList.remove("hide");
    interval = setInterval(timeGenerator, 1000);
    moves.innerHTML = `<span>Moves:</span>${movesCount}`;
    initializer();
    resetBoard();
    resetAllCards();
};

// stop game function
const stopGame = () => {
    controls.classList.remove("hide");
    stopButton.classList.add("hide");
    startButton.classList.remove("hide");
};

//initialise values
const initializer = () => {
    result.innerText = "";
    matchPairs = 0;

};

// for timer logic
const timeGenerator = () => {
    seconds += 1;
    if (seconds >= 60) {
        minutes += 1;
        seconds = 0;
    }

    // timer before start
    let secondsValue = seconds < 10 ? `0${seconds}` : seconds;
    let minutesValue = minutes < 10 ? `0${minutes}` : minutes;
    timeValue.innerHTML = `<span>Time:</span>${minutesValue}:${secondsValue}`;
};

// calculating moves
const movesCounter = () => {
    movesCount += 1;
    moves.innerHTML = `<span>Moves</span>${movesCount}`;
};

// flipping cards
const cards = document.querySelectorAll('.card');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flip');

    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        return;
    }

    movesCounter();

    secondCard = this;

    checkForMatch();

    if (matchPairs == 6) {
        result.innerHTML = `<h2>You Won</h2>
            <h4>Moves: ${movesCount}</h4>`;
        stopGame();
    }
}

// matching card
function checkForMatch() {
    if (firstCard.dataset.framework === secondCard.dataset.framework) {
        disableCards();
        matchPairs += 1;
        return;
    }

    unflipCards();
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    resetBoard();
}

function unflipCards() {
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        resetBoard();
    }, 1500);
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

// shuffle board function

(function shuffle() {
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * 12);
        card.style.order = randomPos;
    });
})();

// initial timer
let seconds = 0,
    minutes = 0;

// matching cards
let matchPairs = 0;

// initial move counter
let movesCount = 0;

// start button
startButton.addEventListener(
    "click",
    startGame
);

//stop button
stopButton.addEventListener(
    "click",
    stopGame
);

cards.forEach(card => card.addEventListener('click', flipCard));