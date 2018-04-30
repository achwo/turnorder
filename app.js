'use strict';

function Card(name, file) {
  this.name = name;
  this.file = file;
  this.open = false;
}

Card.prototype.flip = function ( open ) {
  this.open = open;
}

function dragstart_handler(ev) {
  ev.dataTransfer.setData("text/plain", ev.target.id);
}

function dragover_handler(ev) {
  ev.preventDefault();
  ev.dataTransfer.dropEffect = "move";
}

function drop_handler(ev) {
  const allowedPlaces = ['card-place', 'card'];
  let target = ev.target;
  if (!allowedPlaces.some(cls => target.classList.contains(cls))) {
    return;
  }

  const data = ev.dataTransfer.getData("text");
  const element = document.getElementById(data)

  if(target.classList.contains('card')) {
    target.parentNode.appendChild(element);
  } else {
    target.appendChild(element);
  }

  calculateOffset(element.parentNode);
}

function calculateOffset(stack) {
  const siblings = stack.children;

  const inc = -3;
  let margin = 0;
  for (let el of siblings) {
    let marginTop = 'margin-top: ' + margin + 'px;';
    el.style = marginTop;
    margin += inc;
  }
}

function addCard(card, target) {
  const cardEl = document.createElement('img');

  cardEl.setAttribute('id', card.name);
  cardEl.setAttribute('src', 'assets/' + card.file);
  cardEl.setAttribute('class', 'card');

  cardEl.setAttribute('draggable', 'true');
  cardEl.addEventListener('dragstart', dragstart_handler);

  target.appendChild(cardEl);
}

function initialize() {
  var dropzones = document.getElementsByClassName("drop");
  bindDropHandlers(dropzones, drop_handler, dragover_handler);

  const stack = document.getElementById('stack');
  const cards = [
    new Card('card1', 'card1.svg'),
    new Card('card2', 'card2.svg'),
    new Card('card3', 'card3.svg'),
    new Card('cardwild', 'cardwild.svg'),
    new Card('cardnemesis1', 'cardnemesis.svg'),
    new Card('cardnemesis2', 'cardnemesis.svg')
  ];

  for (let card of cards) {
    addCard(card, stack);
  }

  for (let cardPlace of dropzones) {
    calculateOffset(cardPlace);
  }
}

function bindDropHandlers(list, dropHandler, dragoverHandler) {
  for (var item of list) {
    item.addEventListener('drop', dropHandler);
    item.addEventListener('dragover', dragoverHandler);
  }
}
initialize();
