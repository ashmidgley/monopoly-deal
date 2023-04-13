const Card = require("./Card");

class Property extends Card {
  constructor(value, color, name) {
    super(value, name);
    this.color = color;
  }
}

module.exports = Property;
