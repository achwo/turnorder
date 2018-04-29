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

function addCard(name, target) {
  const card = document.createElement('img');

  card.setAttribute('id', name);
  card.setAttribute('src', 'assets/' + name + '.svg');
  card.setAttribute('class', 'card');

  card.setAttribute('draggable', 'true');
  card.addEventListener('dragstart', dragstart_handler);

  target.appendChild(card);
}

function initialize() {
  var dropzones = document.getElementsByClassName("drop");
  bindDropHandlers(dropzones, drop_handler, dragover_handler);

  const stack = document.getElementById('stack');
  const cards = ['card1', 'card2', 'card3', 'cardwild', 'cardnemesis'];
  for (card of cards) {
    addCard(card, stack);
  }

  for (var cardPlace of dropzones) {
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
