const chai = require('chai');
const expect = chai.expect;
const Card = require('../src/Card');
const Turn = require('../src/Turn');
const Deck = require('../src/Deck');
const Round = require('../src/Round');
const data = require('../src/data.js')



describe('Round', function() {

let card1;
let card2;
let card3;
let deck;

  beforeEach(function() {
    card1 = new Card(1, 'What is Tom\'s favorite music genre?', ['techno', 'house', 'classic rock'], 'techno');
    card2 = new Card(2, 'What is Tom\'s favorite live music venue?', ['The Fillmore', 'Red Rocks', 'Mission Ballroom'], 'Red Rocks');
    card3 = new Card(3, 'How many times has Tom seen Bassnectar perform live?', [4, 13, 25], 25);
    deck = new Deck([card1, card2, card3]);
  });

  it('should be a function', function() {
    const round = new Round(deck)

    expect(Round).to.be.a('function');
  });

  it('should be a new instance of Round', function() {
    const round = new Round(deck)

    expect(round).to.be.an.instanceOf(Round);
  });

  it('should begin with the current card being the first card in the deck', function() {
    const round = new Round(deck)

    round.returnCurrentCard()
    expect(round.returnCurrentCard()).to.equal(card1);
  });

  it('should be able to return which card is currently being played', function() {
    const round = new Round(deck);

    expect(round.returnCurrentCard()).to.equal(card1);
  });

  it('should be able to update the current card to the next card in the deck after a turn is taken', function() {
    const round = new Round(deck);

    round.takeTurn();
    expect(round.returnCurrentCard()).to.equal(card2);
  });

  it('should return feedback telling the user whether the guess was correct or incorrect', function() {
    const round = new Round(deck);

    expect(round.takeTurn('techno')).to.equal('Correct!')
    expect(round.takeTurn('house')).to.equal('Incorrect!')
  })

  it('should be able to store the id\'s of any cards that were incorrectly guessed', function() {
    const round = new Round(deck)

    expect(round.incorrectGuessIds).to.deep.equal([]);
    round.takeTurn('house');
    expect(round.incorrectGuessIds).to.deep.equal([1]);
  })

  it('should be able to update the turn count when a turn is taken', function() {
    const round = new Round(deck);

    round.takeTurn();
    expect(round.turnCount).to.equal(1);

    round.takeTurn();
    expect(round.turnCount).to.equal(2);

    round.takeTurn();
    expect(round.turnCount).to.equal(3);
  });

  it('should be able to calculate the percent of quesions answered correctly', function() {
    const round = new Round(deck);

    round.takeTurn('techno');
    round.takeTurn('The Fillmore');
    round.takeTurn(25)
    expect(round.calculatePercentCorrect()).to.equal(66)
  });

});