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
