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

function initialize() {
  var dropzones = document.getElementsByClassName("drop");
  bindDropHandlers(dropzones, drop_handler, dragover_handler);
  for (var stack of dropzones) {
    calculateOffset(stack);
  }
}

function bindDropHandlers(list, dropHandler, dragoverHandler) {
  for (var item of list) {
    item.addEventListener('drop', dropHandler);
    item.addEventListener('dragover', dragoverHandler);
  }
}
initialize();
