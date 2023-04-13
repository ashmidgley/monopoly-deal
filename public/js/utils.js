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
