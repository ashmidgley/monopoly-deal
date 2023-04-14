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
