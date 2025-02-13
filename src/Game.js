// const data = require('./data');
// const prototypeQuestions = data.prototypeData;
const util = require('./util');
const Round = require('../src/Round');
const Deck = require('../src/Deck');
const Card = require('./Card');

class Game {
  constructor(deck) {
    this.currentRound = new Round(deck);
  }

  createCards(cardData) {
    let cards = cardData.map((card) => {
      return new Card(card.id, card.question, card.answers, card.correctAnswer)
    })
    return cards;
  }

  createDeck(cardsArr) {
    let deck = new Deck(cardsArr)
    return deck;
  }

  createRound(deck) {
    let round = new Round(deck)
    return round;
  }

  start(deck, data) {
    this.createCards(data);
    this.createDeck(this.createCards(data));
    this.createRound(this.createDeck(this.createCards(data)));
    this.printMessage(deck);
    this.printQuestion(this.currentRound);
  }

  printMessage(deck) {
    console.log(`Welcome to FlashCards! You are playing with ${deck.countCards()} cards.
-----------------------------------------------------------------------`)
  }

  printQuestion(round) {
      util.main(round);
  }

}

module.exports = Game;