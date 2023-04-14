(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
/**
 * name: fireworks-js
 * version: 2.10.2
 * author: Vitalij Ryndin (https://crashmax.ru)
 * homepage: https://fireworks.js.org
 * license MIT
 */
"use strict";Object.defineProperties(exports,{__esModule:{value:!0},[Symbol.toStringTag]:{value:"Module"}});function f(e){return Math.abs(Math.floor(e))}function c(e,t){return Math.random()*(t-e)+e}function o(e,t){return Math.floor(c(e,t+1))}function m(e,t,i,s){const n=Math.pow;return Math.sqrt(n(e-i,2)+n(t-s,2))}function x(e,t,i=1){if(e>360||e<0)throw new Error(`Expected hue 0-360 range, got \`${e}\``);if(t>100||t<0)throw new Error(`Expected lightness 0-100 range, got \`${t}\``);if(i>1||i<0)throw new Error(`Expected alpha 0-1 range, got \`${i}\``);return`hsla(${e}, 100%, ${t}%, ${i})`}const g=e=>{if(typeof e=="object"&&e!==null){if(typeof Object.getPrototypeOf=="function"){const t=Object.getPrototypeOf(e);return t===Object.prototype||t===null}return Object.prototype.toString.call(e)==="[object Object]"}return!1},b=["__proto__","constructor","prototype"],v=(...e)=>e.reduce((t,i)=>(Object.keys(i).forEach(s=>{b.includes(s)||(Array.isArray(t[s])&&Array.isArray(i[s])?t[s]=i[s]:g(t[s])&&g(i[s])?t[s]=v(t[s],i[s]):t[s]=i[s])}),t),{});function S(e,t){let i;return(...s)=>{i&&clearTimeout(i),i=setTimeout(()=>e(...s),t)}}class O{x;y;ctx;hue;friction;gravity;flickering;lineWidth;explosionLength;angle;speed;brightness;coordinates=[];decay;alpha=1;constructor({x:t,y:i,ctx:s,hue:n,decay:h,gravity:a,friction:r,brightness:u,flickering:p,lineWidth:l,explosionLength:d}){for(this.x=t,this.y=i,this.ctx=s,this.hue=n,this.gravity=a,this.friction=r,this.flickering=p,this.lineWidth=l,this.explosionLength=d,this.angle=c(0,Math.PI*2),this.speed=o(1,10),this.brightness=o(u.min,u.max),this.decay=c(h.min,h.max);this.explosionLength--;)this.coordinates.push([t,i])}update(t){this.coordinates.pop(),this.coordinates.unshift([this.x,this.y]),this.speed*=this.friction,this.x+=Math.cos(this.angle)*this.speed,this.y+=Math.sin(this.angle)*this.speed+this.gravity,this.alpha-=this.decay,this.alpha<=this.decay&&t()}draw(){const t=this.coordinates.length-1;this.ctx.beginPath(),this.ctx.lineWidth=this.lineWidth,this.ctx.fillStyle=x(this.hue,this.brightness,this.alpha),this.ctx.moveTo(this.coordinates[t][0],this.coordinates[t][1]),this.ctx.lineTo(this.x,this.y),this.ctx.strokeStyle=x(this.hue,this.flickering?c(0,this.brightness):this.brightness,this.alpha),this.ctx.stroke()}}class E{constructor(t,i){this.options=t,this.canvas=i,this.pointerDown=this.pointerDown.bind(this),this.pointerUp=this.pointerUp.bind(this),this.pointerMove=this.pointerMove.bind(this)}active=!1;x;y;get mouseOptions(){return this.options.mouse}mount(){this.canvas.addEventListener("pointerdown",this.pointerDown),this.canvas.addEventListener("pointerup",this.pointerUp),this.canvas.addEventListener("pointermove",this.pointerMove)}unmount(){this.canvas.removeEventListener("pointerdown",this.pointerDown),this.canvas.removeEventListener("pointerup",this.pointerUp),this.canvas.removeEventListener("pointermove",this.pointerMove)}usePointer(t,i){const{click:s,move:n}=this.mouseOptions;(s||n)&&(this.x=t.pageX-this.canvas.offsetLeft,this.y=t.pageY-this.canvas.offsetTop,this.active=i)}pointerDown(t){this.usePointer(t,this.mouseOptions.click)}pointerUp(t){this.usePointer(t,!1)}pointerMove(t){this.usePointer(t,this.active)}}class M{hue;rocketsPoint;opacity;acceleration;friction;gravity;particles;explosion;mouse;boundaries;sound;delay;brightness;decay;flickering;intensity;traceLength;traceSpeed;lineWidth;lineStyle;autoresize;constructor(){this.autoresize=!0,this.lineStyle="round",this.flickering=50,this.traceLength=3,this.traceSpeed=10,this.intensity=30,this.explosion=5,this.gravity=1.5,this.opacity=.5,this.particles=50,this.friction=.95,this.acceleration=1.05,this.hue={min:0,max:360},this.rocketsPoint={min:50,max:50},this.lineWidth={explosion:{min:1,max:3},trace:{min:1,max:2}},this.mouse={click:!1,move:!1,max:1},this.delay={min:30,max:60},this.brightness={min:50,max:80},this.decay={min:.015,max:.03},this.sound={enabled:!1,files:["explosion0.mp3","explosion1.mp3","explosion2.mp3"],volume:{min:4,max:8}},this.boundaries={height:0,width:0,x:50,y:50}}update(t){Object.assign(this,v(this,t))}}class z{constructor(t,i){this.options=t,this.render=i}tick=0;rafId=0;fps=60;tolerance=.1;now;mount(){this.now=performance.now();const t=1e3/this.fps,i=s=>{this.rafId=requestAnimationFrame(i);const n=s-this.now;n>=t-this.tolerance&&(this.render(),this.now=s-n%t,this.tick+=n*(this.options.intensity*Math.PI)/1e3)};this.rafId=requestAnimationFrame(i)}unmount(){cancelAnimationFrame(this.rafId)}}class L{constructor(t,i,s){this.options=t,this.updateSize=i,this.container=s}resizer;mount(){if(!this.resizer){const t=S(()=>this.updateSize(),100);this.resizer=new ResizeObserver(t)}this.options.autoresize&&this.resizer.observe(this.container)}unmount(){this.resizer&&this.resizer.unobserve(this.container)}}class C{constructor(t){this.options=t,this.init()}buffers=[];audioContext;onInit=!1;get isEnabled(){return this.options.sound.enabled}get soundOptions(){return this.options.sound}init(){!this.onInit&&this.isEnabled&&(this.onInit=!0,this.audioContext=new(window.AudioContext||window.webkitAudioContext),this.loadSounds())}async loadSounds(){for(const t of this.soundOptions.files){const i=await(await fetch(t)).arrayBuffer();this.audioContext.decodeAudioData(i).then(s=>{this.buffers.push(s)}).catch(s=>{throw s})}}play(){if(this.isEnabled&&this.buffers.length){const t=this.audioContext.createBufferSource(),i=this.buffers[o(0,this.buffers.length-1)],s=this.audioContext.createGain();t.buffer=i,s.gain.value=c(this.soundOptions.volume.min/100,this.soundOptions.volume.max/100),s.connect(this.audioContext.destination),t.connect(s),t.start(0)}else this.init()}}class T{x;y;sx;sy;dx;dy;ctx;hue;speed;acceleration;traceLength;totalDistance;angle;brightness;coordinates=[];currentDistance=0;constructor({x:t,y:i,dx:s,dy:n,ctx:h,hue:a,speed:r,traceLength:u,acceleration:p}){for(this.x=t,this.y=i,this.sx=t,this.sy=i,this.dx=s,this.dy=n,this.ctx=h,this.hue=a,this.speed=r,this.traceLength=u,this.acceleration=p,this.totalDistance=m(t,i,s,n),this.angle=Math.atan2(n-i,s-t),this.brightness=o(50,70);this.traceLength--;)this.coordinates.push([t,i])}update(t){this.coordinates.pop(),this.coordinates.unshift([this.x,this.y]),this.speed*=this.acceleration;const i=Math.cos(this.angle)*this.speed,s=Math.sin(this.angle)*this.speed;this.currentDistance=m(this.sx,this.sy,this.x+i,this.y+s),this.currentDistance>=this.totalDistance?t(this.dx,this.dy,this.hue):(this.x+=i,this.y+=s)}draw(){const t=this.coordinates.length-1;this.ctx.beginPath(),this.ctx.moveTo(this.coordinates[t][0],this.coordinates[t][1]),this.ctx.lineTo(this.x,this.y),this.ctx.strokeStyle=x(this.hue,this.brightness),this.ctx.stroke()}}class w{target;container;canvas;ctx;width;height;traces=[];explosions=[];waitStopRaf;running=!1;opts;sound;resize;mouse;raf;constructor(t,i={}){this.target=t,this.container=t,this.opts=new M,this.updateOptions(i),this.createCanvas(this.target),this.sound=new C(this.opts),this.resize=new L(this.opts,this.updateSize.bind(this),this.container),this.mouse=new E(this.opts,this.canvas),this.raf=new z(this.opts,this.render.bind(this))}get isRunning(){return this.running}get version(){return"2.10.2"}get currentOptions(){return this.opts}start(){this.running||(this.canvas.isConnected||this.createCanvas(this.target),this.running=!0,this.resize.mount(),this.mouse.mount(),this.raf.mount())}stop(t=!1){!this.running||(this.running=!1,this.resize.unmount(),this.mouse.unmount(),this.raf.unmount(),this.clear(),t&&this.canvas.remove())}async waitStop(t){if(!!this.running)return new Promise(i=>{this.waitStopRaf=()=>{!this.waitStopRaf||(requestAnimationFrame(this.waitStopRaf),!this.traces.length&&!this.explosions.length&&(this.waitStopRaf=null,this.stop(t),i()))},this.waitStopRaf()})}pause(){this.running=!this.running,this.running?this.raf.mount():this.raf.unmount()}clear(){!this.ctx||(this.traces=[],this.explosions=[],this.ctx.clearRect(0,0,this.width,this.height))}launch(t=1){for(let i=0;i<t;i++)this.createTrace();this.waitStopRaf||(this.start(),this.waitStop())}updateOptions(t){this.opts.update(t)}updateSize({width:t=this.container.clientWidth,height:i=this.container.clientHeight}={}){this.width=t,this.height=i,this.canvas.width=t,this.canvas.height=i,this.updateBoundaries({...this.opts.boundaries,width:t,height:i})}updateBoundaries(t){this.updateOptions({boundaries:t})}createCanvas(t){t instanceof HTMLCanvasElement?(t.isConnected||document.body.append(t),this.canvas=t):(this.canvas=document.createElement("canvas"),this.container.append(this.canvas)),this.ctx=this.canvas.getContext("2d"),this.updateSize()}render(){if(!this.ctx||!this.running)return;const{opacity:t,lineStyle:i,lineWidth:s}=this.opts;this.ctx.globalCompositeOperation="destination-out",this.ctx.fillStyle=`rgba(0, 0, 0, ${t})`,this.ctx.fillRect(0,0,this.width,this.height),this.ctx.globalCompositeOperation="lighter",this.ctx.lineCap=i,this.ctx.lineJoin="round",this.ctx.lineWidth=c(s.trace.min,s.trace.max),this.initTrace(),this.drawTrace(),this.drawExplosion()}createTrace(){const{hue:t,rocketsPoint:i,boundaries:s,traceLength:n,traceSpeed:h,acceleration:a,mouse:r}=this.opts;this.traces.push(new T({x:this.width*o(i.min,i.max)/100,y:this.height,dx:this.mouse.x&&r.move||this.mouse.active?this.mouse.x:o(s.x,s.width-s.x*2),dy:this.mouse.y&&r.move||this.mouse.active?this.mouse.y:o(s.y,s.height*.5),ctx:this.ctx,hue:o(t.min,t.max),speed:h,acceleration:a,traceLength:f(n)}))}initTrace(){if(this.waitStopRaf)return;const{delay:t,mouse:i}=this.opts;(this.raf.tick>o(t.min,t.max)||this.mouse.active&&i.max>this.traces.length)&&(this.createTrace(),this.raf.tick=0)}drawTrace(){let t=this.traces.length;for(;t--;)this.traces[t].draw(),this.traces[t].update((i,s,n)=>{this.initExplosion(i,s,n),this.sound.play(),this.traces.splice(t,1)})}initExplosion(t,i,s){const{particles:n,flickering:h,lineWidth:a,explosion:r,brightness:u,friction:p,gravity:l,decay:d}=this.opts;let y=f(n);for(;y--;)this.explosions.push(new O({x:t,y:i,ctx:this.ctx,hue:s,friction:p,gravity:l,flickering:o(0,100)<=h,lineWidth:c(a.explosion.min,a.explosion.max),explosionLength:f(r),brightness:u,decay:d}))}drawExplosion(){let t=this.explosions.length;for(;t--;)this.explosions[t].draw(),this.explosions[t].update(()=>{this.explosions.splice(t,1)})}}exports.Fireworks=w;exports.default=w;

},{}],2:[function(require,module,exports){
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

},{}],3:[function(require,module,exports){
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

},{"./Property":5,"./enums":8}],4:[function(require,module,exports){
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

},{"./PropertyCollection":6}],5:[function(require,module,exports){
const Card = require("./Card");

class Property extends Card {
  constructor(value, color, name) {
    super(value, name);
    this.color = color;
  }
}

module.exports = Property;

},{"./Card":2}],6:[function(require,module,exports){
const PropertySet = require("./PropertySet");
const { colors } = require("./enums");

class PropertyCollection {
  constructor() {
    this.sets = [
      new PropertySet(colors.blue),
      new PropertySet(colors.brown),
      new PropertySet(colors.gray),
      new PropertySet(colors.yellow),
      new PropertySet(colors.green),
      new PropertySet(colors.lightBlue),
      new PropertySet(colors.purple),
      new PropertySet(colors.red),
      new PropertySet(colors.orange),
      new PropertySet(colors.black),
    ];
  }

  isComplete() {
    return this.sets.filter((x) => x.isComplete()).length >= 3;
  }

  add(property) {
    const set = this.sets.find((x) => x.color === property.color);
    if (set === undefined) {
      throw new Error(`No set found for color ${property.color}.`);
    }

    set.add(property);
  }

  getElements() {
    let result = [];
    for (let key in this.sets) {
      const set = this.sets[key];
      if (!set.isEmpty()) {
        result.push(set.getElement());
      }
    }
    return result;
  }
}

module.exports = PropertyCollection;

},{"./PropertySet":7,"./enums":8}],7:[function(require,module,exports){
const { colors } = require("./enums");

const propertiesCount = {
  [colors.blue]: 2,
  [colors.brown]: 2,
  [colors.gray]: 2,
  [colors.yellow]: 3,
  [colors.green]: 3,
  [colors.lightBlue]: 3,
  [colors.purple]: 3,
  [colors.red]: 3,
  [colors.orange]: 3,
  [colors.black]: 4,
};

class PropertySet {
  constructor(color) {
    this.color = color;
    this.properties = [];
  }

  add(property) {
    this.properties.push(property);
  }

  isEmpty() {
    return this.properties.length === 0;
  }

  isComplete() {
    return this.properties.length === propertiesCount[this.color];
  }

  getElement() {
    const images = this.properties.map((property) =>
      property.getImageElement()
    );

    let container = document.createElement("div");
    container.classList.add("column-center");
    container.append(...images);
    return container;
  }
}

module.exports = PropertySet;

},{"./enums":8}],8:[function(require,module,exports){
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

},{"./utils":10}],9:[function(require,module,exports){
"use strict";

const { Fireworks } = require("fireworks-js");

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

  renderHand(player.hand, turnOver);
  renderProperties(player.properties);

  if (player.hasWon()) {
    const container = document.getElementById("container");
    const text = document.createElement("h2");
    text.innerText = `${player.name} wins!`;
    container.appendChild(text);
    const fireworks = new Fireworks(container, {});
    fireworks.start();
    return;
  }

  if (turnOver) {
    document.getElementById("finish-turn-button").disabled = false;
  }
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
  const propertySets = properties.getElements();
  if (propertySets.length === 0) {
    document.getElementById("properties-container").classList.add("hide");
    return;
  }

  if (
    document.getElementById("properties-container").classList.contains("hide")
  ) {
    document.getElementById("properties-container").classList.remove("hide");
  }

  document.getElementById("properties").replaceChildren(...propertySets);
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

},{"./Deck":3,"./Player":4,"./enums":8,"./utils":10,"fireworks-js":1}],10:[function(require,module,exports){
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

},{}]},{},[9]);
