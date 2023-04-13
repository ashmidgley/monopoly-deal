(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
function getImageUrl(name) {
  const fileName = name
    .toLowerCase()
    .replaceAll("'", "")
    .replaceAll("st.", "street")
    .replaceAll("/", "-")
    .replaceAll(" ", "-");

  return `/images/${fileName}.PNG`;
}

class Card {
  constructor(value, name) {
    this.value = value;
    this.name = name;
  }

  getImageElement(onClick, turnOver) {
    let img = new Image(100, 154);
    img.src = getImageUrl(this.name);
    img.alt = this.name;
    if (turnOver) {
      img.style.opacity = "0.5";
    } else if (onClick) {
      img.style.cursor = "pointer";
      img.addEventListener("click", onClick);
    }

    return img;
  }
}

module.exports = Card;

},{}],2:[function(require,module,exports){
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

},{"./Property":4,"./enums":5}],3:[function(require,module,exports){
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

  playCard(name) {
    const index = this.hand.findIndex((card) => card.name === name);
    if (index === -1) {
      throw new Error(`Card ${name} not found in hand`);
    }

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
    super(value, name);
    this.color = color;
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
"use strict";

const Deck = require("./Deck");
const Player = require("./Player");
const { colors } = require("./enums");
const { delay } = require("./utils");

let deck = new Deck();

let rentTable = {};
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

let currentPlayer = 0;
let players = [];
let playerInputs = [];
let turnCount = 0;

const startButton = document.getElementById("start-button");
startButton.addEventListener("click", () => {
  const startSection = document.getElementById("start-section");
  startSection.classList.add("hide");
  const setupSection = document.getElementById("setup-section");
  setupSection.classList.remove("hide");
});

const playerCount = document.getElementById("player-count");
playerCount.addEventListener("input", () => {
  const count = playerCount.value;
  if (count < 2 || count > 5) {
    playerCount.classList.add("invalid");
    return;
  } else if (playerCount.classList.contains("invalid")) {
    playerCount.classList.remove("invalid");
  }

  playerInputs = [];
  for (let i = 0; i < count; i++) {
    const playerInput = document.createElement("input");
    playerInput.setAttribute("type", "text");
    playerInput.setAttribute("placeholder", `Player ${i + 1} name...`);
    playerInput.setAttribute("id", `player-${i + 1}`);
    playerInputs.push(playerInput);
  }

  document.getElementById("players").replaceChildren(...playerInputs);
  document.getElementById("setup-button").classList.remove("hide");
});

function drawCards(player) {
  if (deck.hasCards()) {
    const drawnCards = deck.drawCards(2);
    player.addToHand(drawnCards);
    const images = drawnCards.map((card) => card.getImageElement());
    document.getElementById("drawn-cards").replaceChildren(...images);
  } else {
    const text = document.createElement("p");
    text.innerText = "No cards left in deck...";
    document.getElementById("drawn-cards").replaceChildren(text);
  }
}

function renderTurn(player) {
  document.getElementById(
    "action-text"
  ).innerText = `It's ${player.name}'s turn.`;

  document.getElementById("finish-turn-button").disabled = true;
}

function onHandImageClick(event) {
  const name = event.target.alt;
  const player = players[currentPlayer];
  player.playCard(name);

  turnCount++;
  const turnOver = turnCount === 2 || player.hand.length === 0;
  if (turnOver) {
    document.getElementById("finish-turn-button").disabled = false;
  }

  renderHand(player.hand, turnOver);
  renderProperties(player.properties);
}

function renderHand(hand, turnOver) {
  if (hand.length === 0) {
    const text = document.createElement("p");
    text.innerText = "No cards left in hand...";
    document.getElementById("hand").replaceChildren(text);
  } else {
    const handImages = hand.map((card) =>
      card.getImageElement(onHandImageClick, turnOver)
    );
    document.getElementById("hand").replaceChildren(...handImages);
  }
}

function renderProperties(properties) {
  if (properties.length === 0) {
    document.getElementById("properties-container").classList.add("hide");
    return;
  }

  if (
    document.getElementById("properties-container").classList.contains("hide")
  ) {
    document.getElementById("properties-container").classList.remove("hide");
  }

  const propertyImages = properties.map((card) => card.getImageElement());
  document.getElementById("properties").replaceChildren(...propertyImages);
}

const setupButton = document.getElementById("setup-button");
setupButton.addEventListener("click", () => {
  let validPlayers = true;
  for (let i = 0; i < playerInputs.length; i++) {
    const value = playerInputs[i].value;
    if (value === "") {
      playerInputs[i].classList.add("invalid");
      validPlayers = false;
    } else if (playerInputs[i].classList.contains("invalid")) {
      playerInputs[i].classList.remove("invalid");
    }
  }

  if (!validPlayers) {
    document.getElementById("players").replaceChildren(...playerInputs);
    return;
  }

  players = playerInputs.map((input) => new Player(input.value));

  const setupSection = document.getElementById("setup-section");
  setupSection.classList.add("hide");
  const gameSection = document.getElementById("game-section");
  gameSection.classList.remove("hide");

  deck.initialize();

  const actionText = document.getElementById("action-text");
  actionText.innerText = "Shuffling deck...";
  deck.shuffle();

  delay(1000).then(() => {
    actionText.innerText = "Dealing cards...";
    for (var i = 0; i < players.length; i++) {
      players[i].addToHand(deck.drawCards(5));
    }

    delay(1000).then(() => {
      actionText.innerText = "Starting game...";
      delay(1000).then(() => {
        const player = players[currentPlayer];
        drawCards(player);
        renderTurn(player);
        renderHand(player.hand);
        renderProperties(player.properties);
        document.getElementById("turn-content").classList.remove("hide");
      });
    });
  });
});

const finishTurnButton = document.getElementById("finish-turn-button");
finishTurnButton.addEventListener("click", () => {
  currentPlayer = (currentPlayer + 1) % players.length;
  const player = players[currentPlayer];
  drawCards(player);
  renderTurn(player);
  renderHand(player.hand);
  renderProperties(player.properties);
  turnCount = 0;
});

},{"./Deck":2,"./Player":3,"./enums":5,"./utils":7}],7:[function(require,module,exports){
function createEnum(values) {
  const enumObject = {};
  for (const val of values) {
    enumObject[val] = val;
  }
  return Object.freeze(enumObject);
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(() => resolve(), ms));
}

module.exports = {
  createEnum,
  delay,
};

},{}]},{},[6]);
