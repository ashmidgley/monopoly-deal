const Deck = require("./Deck");
const Property = require("./Property");
const { colors } = require("./enums");

describe("hasCards()", () => {
  test("should return false when cards length is 0", () => {
    const deck = new Deck();
    expect(deck.hasCards()).toBe(false);
  });

  test("should return true when cards length is greater than 0", () => {
    const blueCards = [
      new Property(4, colors.blue, "Mayfair"),
      new Property(4, colors.blue, "Park Lane"),
    ];

    const cards = [...blueCards];
    const deck = new Deck(cards);

    expect(deck.hasCards()).toBe(true);
  });
});
