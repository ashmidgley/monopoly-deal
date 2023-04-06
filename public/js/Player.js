class Player {
  constructor(name) {
    this.name = name;
    this.hand = [];
    this.properties = [];
    this.money = 0;
  }

  addToHand(cards) {
    this.hand.push(...cards);
  }

  presentHand() {
    return this.hand
      .map((card, index) => `(${index + 1}) ${card.present()}`)
      .join("\n");
  }

  presentProperties() {
    if (this.properties.length === 0) {
      return "No properties yet...";
    }

    return this.properties
      .map((property, index) => property.present())
      .sort((property) => property.color)
      .join("\n");
  }

  playCard(index) {
    const card = this.hand.splice(index, 1)[0];
    this.properties.push(card);
    return card;
  }
}

module.exports = Player;
