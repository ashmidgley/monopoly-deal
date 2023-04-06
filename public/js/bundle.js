(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
class Card {
  constructor(value) {
    this.value = value;
  }
}

module.exports = Card;

},{}],2:[function(require,module,exports){
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

},{}],3:[function(require,module,exports){
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

},{}],4:[function(require,module,exports){
const Card = require("./Card");

class Property extends Card {
  constructor(value, color, name) {
    super(value);
    this.color = color;
    this.name = name;
  }

  present() {
    return `${this.name} (${this.color})`;
  }
}

module.exports = Property;

},{"./Card":1}],5:[function(require,module,exports){
const { createEnum } = require("./utils");

const colors = createEnum([
  "blue",
  "yellow",
  "brown",
  "green",
  "lightBlue",
  "black",
  "red",
  "purple",
  "orange",
  "gray",
]);

exports.colors = colors;

},{"./utils":7}],6:[function(require,module,exports){
const Deck = require("./Deck");
const Player = require("./Player");
const Property = require("./Property");
const { colors } = require("./enums");

let rentTable = {};
let deck = new Deck();
let currentPlayer = 0;
let players = [];
let playerInputs = [];
let turnCount = 0;

function initializeGame() {
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

  rentTable[colors.blue] = [3, 8];
  rentTable[colors.brown] = [1, 2];
  rentTable[colors.gray] = [1, 2];
  rentTable[colors.yellow] = [2, 4, 6];
  rentTable[colors.green] = [2, 4, 7];
  rentTable[colors.lightBlue] = [1, 2, 3];
  rentTable[colors.purple] = [1, 2, 4];
  rentTable[colors.red] = [2, 3, 6];
  rentTable[colors.orange] = [1, 3, 5];
  rentTable[colors.black] = [1, 2, 3, 4];

  deck = new Deck([
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
  ]);
}

function renderTurn(player) {
  document.getElementById(
    "action-text"
  ).innerText = `It's ${player.name}'s turn.`;

  document.getElementById(
    "hand-text"
  ).innerText = `Your hand:\n${player.presentHand()}`;

  document.getElementById(
    "properties-text"
  ).innerText = `Your properties:\n${player.presentProperties()}`;

  document.getElementById("finish-turn-button").disabled = true;
}

const startButton = document.getElementById("start-button");
startButton.addEventListener("click", () => {
  const startSection = document.getElementById("start-section");
  startSection.classList.add("hide");
  const setupSection = document.getElementById("setup-section");
  setupSection.classList.remove("hide");
});

const playerCount = document.getElementById("player-count");
playerCount.addEventListener("input", (e) => {
  const count = playerCount.value;
  playerInputs = [];
  for (let i = 0; i < count; i++) {
    const playerInput = document.createElement("input");
    playerInput.setAttribute("type", "text");
    playerInput.setAttribute("placeholder", `Player ${i + 1} name...`);
    playerInput.setAttribute("id", `player-${i + 1}`);
    playerInputs.push(playerInput);
  }

  document.getElementById("players").append(...playerInputs);
  document.getElementById("setup-button").disabled = false;
});

const setupButton = document.getElementById("setup-button");
setupButton.addEventListener("click", () => {
  players = playerInputs.map((input) => new Player(input.value));

  const setupSection = document.getElementById("setup-section");
  setupSection.classList.add("hide");
  const gameSection = document.getElementById("game-section");
  gameSection.classList.remove("hide");

  initializeGame();

  const actionText = document.getElementById("action-text");
  actionText.innerText = "Shuffling deck...";
  deck.shuffle();

  setTimeout(() => {
    actionText.innerText = "Dealing cards...";
    for (var i = 0; i < players.length; i++) {
      players[i].addToHand(deck.drawCards(5));
    }

    setTimeout(() => {
      actionText.innerText = "Starting game...";
      setTimeout(() => {
        const player = players[currentPlayer];
        const drawnCards = deck.drawCards(2);
        player.addToHand(drawnCards);
        document.getElementById(
          "drawn-cards-text"
        ).innerText = `You drew:\n${drawnCards[0].present()}\n${drawnCards[1].present()}`;
        renderTurn(player);
      }, 1000);
    }, 1000);
  }, 1000);
});

const turnSubmitButton = document.getElementById("turn-submit-button");
turnSubmitButton.addEventListener("click", () => {
  const turnInput = document.getElementById("turn-input");
  const cardNumber = turnInput.value;
  const player = players[currentPlayer];
  player.playCard(cardNumber - 1);

  document.getElementById(
    "hand-text"
  ).innerText = `Your hand:\n${player.presentHand()}`;

  document.getElementById(
    "properties-text"
  ).innerText = `Your properties:\n${player.presentProperties()}`;

  turnInput.value = "";

  turnCount++;
  if (turnCount === 2) {
    turnInput.disabled = true;
    turnSubmitButton.disabled = true;
    document.getElementById("finish-turn-button").disabled = false;
  }
});

const finishTurnButton = document.getElementById("finish-turn-button");
finishTurnButton.addEventListener("click", () => {
  currentPlayer = (currentPlayer + 1) % players.length;
  const player = players[currentPlayer];

  if (deck.hasCards()) {
    const drawnCards = deck.drawCards(2);
    player.addToHand(drawnCards);

    document.getElementById(
      "drawn-cards-text"
    ).innerText = `You drew:\n${drawnCards[0].present()}\n${drawnCards[1].present()}`;
  } else {
    document.getElementById("drawn-cards-text").innerText =
      "No cards left in deck...";
  }

  renderTurn(player);
  turnCount = 0;
  document.getElementById("turn-input").disabled = false;
  document.getElementById("turn-submit-button").disabled = false;
});

},{"./Deck":2,"./Player":3,"./Property":4,"./enums":5}],7:[function(require,module,exports){
const createEnum = (values) => {
  const enumObject = {};
  for (const val of values) {
    enumObject[val] = val;
  }
  return Object.freeze(enumObject);
};

exports.createEnum = createEnum;

},{}]},{},[6]);
