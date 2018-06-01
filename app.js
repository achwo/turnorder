if ( 'serviceWorker' in navigator ) {
  navigator.serviceWorker.register('/turnorder/sw.js');
}

function initialize(cards) {
  var dropzones = document.getElementsByClassName("drop");
  bindDropHandlers(dropzones, dropHandler, dragoverHandler);

  const stack = document.getElementById('draw');

  for (let card of cards) {
    addCard(card, stack);
  }

  for (let cardPlace of dropzones) {
    calculateOffset(cardPlace);
  }
}

function newInit() {
  const turnOrder = turnOrderGen(eventHandlerGen, ruleBookGen, rendererGen, Math.random);
  turnOrder.init();

}
//initialize(cards);
newInit();
