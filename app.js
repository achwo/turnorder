function dragstart_handler(ev) {
  console.log(ev);
  ev.dataTransfer.setData("text/plain", ev.target.id);
}

function dragover_handler(ev) {
  ev.preventDefault();
  ev.dataTransfer.dropEffect = "move";
}

function drop_handler(ev) {
  var data = ev.dataTransfer.getData("text");
  console.log(data);
  ev.target.appendChild(document.getElementById(data));
}

