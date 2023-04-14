const PropertyCollection = require("./PropertyCollection");

class Player {
  constructor(name) {
    this.name = name;
    this.hand = [];
    this.properties = new PropertyCollection();
    this.money = 0;
  }

  addToHand(cards) {
    this.hand.push(...cards);
  }

  playCard(name) {
    const index = this.hand.findIndex((card) => card.name === name);
    if (index === -1) {
      throw new Error(`Card ${name} not found in hand`);
    }

    const card = this.hand.splice(index, 1)[0];
    this.properties.add(card);
    return card;
  }

  hasWon() {
    return this.properties.isComplete();
  }
}

module.exports = Player;
