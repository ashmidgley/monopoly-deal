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
