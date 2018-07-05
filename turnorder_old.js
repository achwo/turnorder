'use strict';

function Card(name, file) {
  this.name = name;
  this.file = file;
  this.open = false;
}

Card.prototype.flip = function(open) {
  this.open = open;
};

function dragstartHandler(ev) {
  console.log('dragstart');
  ev.dataTransfer.setData('text/plain', ev.target.id);
}

function dragoverHandler(ev) {
  ev.preventDefault();
  ev.dataTransfer.dropEffect = 'move';
}

function dropHandler(ev) {
  const allowedPlaces = ['card-place', 'card'];
  let target = ev.target;
  if (!allowedPlaces.some(cls => target.classList.contains(cls))) {
    return;
  }

  const data = ev.dataTransfer.getData('text');
  const element = document.getElementById(data);

  if (target.classList.contains('card')) {
    target.parentNode.appendChild(element);
  } else {
    target.appendChild(element);
  }

  calculateOffset(element.parentNode);
}

function createClickHandler(targetMap) {
  return ev => {
    console.log('click');
    const el = ev.srcElement;
    const targetEl = document.getElementById(targetMap[el.parentNode.id]);

    targetEl.appendChild(el);
    calculateOffset(targetEl);
  };
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
  const targetMap = {
    draw: 'discard',
    discard: 'draw'
  };

  cardEl.setAttribute('id', card.name);
  cardEl.setAttribute('src', 'data/img/' + card.file);
  cardEl.setAttribute('class', 'card');
  cardEl.setAttribute('alt', card.name);

  cardEl.setAttribute('draggable', 'true');
  //  cardEl.addEventListener('dragstart', dragstartHandler);
  //  cardEl.addEventListener('click', createClickHandler(targetMap));

  target.appendChild(cardEl);
}

function bindDropHandlers(list, dropHandler, dragoverHandler) {
  for (let item of list) {
    item.addEventListener('drop', dropHandler);
    item.addEventListener('dragover', dragoverHandler);
  }
}
