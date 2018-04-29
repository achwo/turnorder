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

  let data = ev.dataTransfer.getData("text");

  if(target.classList.contains('card')) {
    target.parentNode.appendChild(document.getElementById(data));
  } else {
    target.appendChild(document.getElementById(data));
  }
}

