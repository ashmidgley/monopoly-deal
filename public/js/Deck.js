const Property = require("./Property");
const { colors } = require("./enums");

class Deck {
  constructor(cards = []) {
    this.cards = cards;
  }

  initialize() {
    const blueCards = [
      new Property(4, colors.blue, "Mayfair"),
      new Property(4, colors.blue, "Park Lane"),
    ];

    const yellowCards = [
      new Property(3, colors.yellow, "Piccadilly"),
      new Property(3, colors.yellow, "Coventry Street"),
      new Property(3, colors.yellow, "Leicester Square"),
    ];

    const brownCards = [
      new Property(1, colors.brown, "Old Kent Road"),
      new Property(1, colors.brown, "Whitechapel Road"),
    ];

    const greenCards = [
      new Property(4, colors.green, "Bond Street"),
      new Property(4, colors.green, "Oxford Street"),
      new Property(4, colors.green, "Regent Street"),
    ];

    const lightBlueCards = [
      new Property(1, colors.lightBlue, "Euston Road"),
      new Property(1, colors.lightBlue, "Pentonville Road"),
      new Property(1, colors.lightBlue, "The Angel/Islington"),
    ];

    const blackCards = [
      new Property(2, colors.black, "King's Cross Station"),
      new Property(2, colors.black, "Marylbone Station"),
      new Property(2, colors.black, "Liverpool St. Station"),
      new Property(2, colors.black, "Fenchurch St. Station"),
    ];

    const redCards = [
      new Property(3, colors.red, "Fleet Street"),
      new Property(3, colors.red, "Trafalgar Square"),
      new Property(3, colors.red, "Strand"),
    ];

    const purpleCards = [
      new Property(2, colors.purple, "Whitehall"),
      new Property(2, colors.purple, "Pall Mall"),
      new Property(2, colors.purple, "Northumberland Avenue"),
    ];

    const orangeCards = [
      new Property(2, colors.orange, "Vine Street"),
      new Property(2, colors.orange, "Bow Street"),
      new Property(2, colors.orange, "Marlborough Street"),
    ];

    const grayCards = [
      new Property(2, colors.gray, "Water Works"),
      new Property(2, colors.gray, "Electric Company"),
    ];

    this.cards = [
      ...blueCards,
      ...yellowCards,
      ...brownCards,
      ...greenCards,
      ...lightBlueCards,
      ...blackCards,
      ...redCards,
      ...purpleCards,
      ...orangeCards,
      ...grayCards,
    ];
  }

  drawCards(count) {
    const result = [];
    for (var i = 0; i < count; i++) {
      if (this.cards.length > 0) {
        result.push(this.cards.pop());
      }
    }

    return result;
  }

  shuffle() {
    for (let i = this.cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
    }
  }

  hasCards() {
    return this.cards.length > 0;
  }
}

module.exports = Deck;
