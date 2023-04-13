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
