"use strict";

/** Memory game: find matching pairs of cards and flip both of them. */
let score = 0;
const scoreVal = document.getElementById('score');
const newGame = document.getElementById('new-game');
let highScore = localStorage.getItem("highscore")
const highScoreVal = document.getElementById('highScore');
/* const qImg = document.createElement('img');
qImg.src = 'question-mark.png' */

//const highScoreVal = document.getElementById('high-score');
// high score needs to be lowest score. determined after game

let guess = [];
let matches = [];

const FOUND_MATCH_WAIT_MSECS = 1000;
const COLORS = [
  "red", "blue", "green", "orange", "purple",
  "red", "blue", "green", "orange", "purple",
];

const colors = shuffle(COLORS);

createCards(colors);

newGame.addEventListener('click', function(){
  shuffle(COLORS)
  createCards(colors);
  console.log('new Game')
})
// new game creats a new board, needs to reset board,
//doesn't reset the score
/** Shuffle array items in-place and return shuffled array. */

function shuffle(items) {
  // This algorithm does a "perfect shuffle", where there won't be any
  // statistical bias in the shuffle (many naive attempts to shuffle end up not
  // be a fair shuffle). This is called the Fisher-Yates shuffle algorithm; if
  // you're interested, you can learn about it, but it's not important.

  for (let i = items.length - 1; i > 0; i--) {
    // generate a random index between 0 and i
    let j = Math.floor(Math.random() * i);
    // swap item at i <-> item at j
    [items[i], items[j]] = [items[j], items[i]];
  }

  return items;
}

/** Create card for every color in colors (each will appear twice)
 *
 * Each div DOM element will have:
 * - a class with the value of the color
 * - an click listener for each card to handleCardClick
 */

function createCards(colors) {
  const gameBoard = document.getElementById("game");

  while(gameBoard.firstChild) {
    gameBoard.removeChild(gameBoard.firstChild)
  }
  matches = [];
  score = 0;
  scoreVal.innerHTML = score

  for (let color of colors) {
    // missing code here ...
    let newCard = document.createElement('div');
    newCard.className = 'card';
    newCard.style.backgroundColor = 'white';
    newCard.Color = color
    newCard.status = 'unflipped'

    newCard.addEventListener('click', handleCardClick)

    gameBoard.appendChild(newCard)
  }
}

/** Flip a card face-up. */

function flipCard(card) {
  // ... you need to write this ...
  card.style.backgroundColor = card.Color;
  card.status = 'flipped';
  console.log('flip', card.status)

}

/** Flip a card face-down. */

function unFlipCard(card) {
  // ... you need to write this ...
  card.style.backgroundColor = 'white';
  card.status = 'unflipped'
  console.log('unflip', card.status)
}

/** Handle clicking on a card: this could be first-card or second-card. */

function resetGuess(){
  guess = [];
}


function handleCardClick(evt) {
  // ... you need to write this ...
  let pick;
  if(guess.length < 2){
  pick = evt.currentTarget;
  }
  if(pick.status === 'flipped'){
    console.log('already flipped')
  }else if (pick.status === 'unflipped'){
    flipCard(pick);
    guess.push(pick);
    if(guess.length === 2){
      if(guess[0].Color === guess[1].Color){
        console.log('its a match')
        matches.push(guess[0]);
        matches.push(guess[1])
        score ++;
        scoreVal.innerHTML = score;
        guess = [];

      } else{
        console.log('try again')
        setTimeout(function(){
          unFlipCard(guess[0]);
          unFlipCard(guess[1]);
          resetGuess();
        }, 500);
        score ++;
        scoreVal.innerHTML = score;
      }
    }
  }

  if(matches.length === COLORS.length){
    setTimeout(function(){
      alert('Congrats!');
      highScoreCheck();
    }, 500)
  }

  // will need to adjust score counter to happen after both clicks
}

function highScoreCheck(){
  if(highScore !== null){
    if (score < highScore) {
        localStorage.setItem("highscore", score);
    }
    }else{
    localStorage.setItem("highscore", score);
  }
  highScoreVal.innerHTML = highScore;
}

highScoreCheck()

