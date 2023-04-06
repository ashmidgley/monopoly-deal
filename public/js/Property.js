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
