'use strict';

const cards = document.querySelectorAll('.card');
const scores = document.querySelector('#scores');

let hasVisibleCard = false;
let firstCard, secondCard;
let lockBoard = false;
let clickCounter = 0;

function shuffle() {
  cards.forEach((card) => {
    let randomPos = Math.floor(Math.random() * 16);
    card.style.order = randomPos;
  });
}

function isWinner() {
  let cardsWithShow = [...cards].filter((c) => c.classList.contains('show'));

  return cardsWithShow.length === cards.length;
}

function handleClick(e) {
  if (isWinner()) return;
  if (lockBoard) return;

  e.target.classList.toggle('show'); // e.target === this
  scores.innerText = clickCounter++;

  if (!hasVisibleCard) {
    // First card revealed
    hasVisibleCard = true;
    firstCard = e.target;
  } else {
    // Second card revealed
    hasVisibleCard = false;
    secondCard = e.target;
    lockBoard = true;

    // Check if cards are the same
    if (firstCard.innerText === secondCard.innerText) {
      firstCard.removeEventListener('click', handleClick);
      secondCard.removeEventListener('click', handleClick);
      lockBoard = false;
    } else {
      setTimeout(() => {
        firstCard.classList.remove('show');
        secondCard.classList.remove('show');
        lockBoard = false;
      }, 1000);
    }
  }
}

cards.forEach((card) => {
  card.addEventListener('click', handleClick);
});

shuffle();
