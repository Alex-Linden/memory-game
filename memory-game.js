"use strict";

/** Memory game: find matching pairs of cards and flip both of them. */
let score = 0;
const scoreVal = document.getElementById('score');
const newGame = document.getElementById('new-game');
//let highScore = localStorage.getItem('highscore');
//const highScoreVal = document.getElementById('high-score');
// high score needs to be lowest score. determined after game


const FOUND_MATCH_WAIT_MSECS = 1000;
const COLORS = [
  "red", "blue", "green", "orange", "purple",
  "red", "blue", "green", "orange", "purple",
];

const colors = shuffle(COLORS);

createCards(colors);


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
  scoreVal.innerHTML = score

  for (let color of colors) {
    // missing code here ...
    let newCard = document.createElement('div');
    newCard.className = 'card';
    newCard.style.backgroundColor = 'white';
    newCard.Color = color
    //newCard.id = 'unflipped'

    newCard.addEventListener('click', handleCardClick)

    gameBoard.appendChild(newCard)
  }
}

/** Flip a card face-up. */

function flipCard(card) {
  // ... you need to write this ...
  card.style.backgroundColor = card.Color
  console.log('flip')

}

/** Flip a card face-down. */

function unFlipCard(card) {
  // ... you need to write this ...
  card.style.backgroundColor = 'white';
  console.log('unflip')
}

/** Handle clicking on a card: this could be first-card or second-card. */

function handleCardClick(evt) {
  // ... you need to write this ...
  console.log('click')
  score ++
  scoreVal.innerHTML = score

  flipCard(evt.currentTarget);
  setTimeout(function(){
    unFlipCard(evt.currentTarget);
  }, 1000);



  // will need to adjust score counter to happen after both clicks
}
