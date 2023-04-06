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
