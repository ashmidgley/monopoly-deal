class Deck {
  constructor(cards = []) {
    this.cards = cards;
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
