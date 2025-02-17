const chai = require('chai');
const expect = chai.expect;
const Card = require('../src/Card');
const Turn = require('../src/Turn');

describe('Turn', function() {

  let card;

  beforeEach(function() {
    card = new Card(1, 'What is Tom\'s favorite music genre?', ['techno', 'metal', 'classic rock'], 'techno');
  });

  it('should be a function', function() {
    const turn = new Turn();

    expect(Turn).to.be.a('function');
  });

  it('should be an instance of Turn', function() {
    const turn = new Turn();

    expect(turn).to.be.an.instanceOf(Turn);
  });

  it('should take in a string that represents a user\'s guess as an argument', function() {
    const turn = new Turn('techno');

    expect(turn.guess).to.equal('techno');
  });

  it('should take in a card object as a second argument', function() {
    const turn = new Turn('techno', card);

    expect(turn.card).to.equal(card);
  });

  it('should be able to return the user\'s guess', function() {
    const turn = new Turn('techno', card);

    expect(turn.returnGuess()).to.equal('techno');
  });

  it('should be able to return the current card', function() {
    const turn = new Turn('techno', card);

    expect(turn.returnCard()).to.equal(card);
  });

  it('should be able to determine if the user\'s guess is true or false', function() {
    const turn = new Turn('metal', card);
    const turn2 = new Turn('techno', card);

    turn.evaluateGuess();
    expect(turn.isCorrect).to.equal(false);
    expect(turn.evaluateGuess()).to.equal(false);

    turn2.evaluateGuess();
    expect(turn2.isCorrect).to.equal(true);
    expect(turn2.evaluateGuess()).to.equal(true);
  });

  it('should give the user feeback based on the accuracy of their guess', function() {
    const turn = new Turn('metal', card);
    const turn2 = new Turn('techno', card);

    turn.evaluateGuess();
    const result = turn.giveFeedback();
    expect(result).to.equal('Incorrect!');

    turn2.evaluateGuess();
    const result2 = turn2.giveFeedback();
    expect(result2).to.equal('Correct!');
  });

});