'use strict';

const turnOrderGen = function (eventHandlerGen, ruleBookGen, rendererGen, random) {
  const INITIAL_STATE = {
    drawPile: [],
    discardPile: ['1', '2', '3', 'wild', 'nemesis1', 'nemesis2']
  };

  function shuffle(a) {
    let j, x;
    for (let i = a.length - 1; i > 0; i--) {
        j = Math.floor(random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
  }

  const ruleBook = ruleBookGen()
    .action('setup', (_) => {
      console.log('setup initial state', INITIAL_STATE);
      return eventHandler.dispatch(INITIAL_STATE, {rule: 'shuffle'});
     // return INITIAL_STATE;
    })
    .action('draw from drawpile', (state) => {
      if ( state.drawPile.length === 0 ) {
        return eventHandler.dispatch(state, {rule: 'shuffle'});
      }
      const card = state.drawPile.pop();
      const newDiscard = state.discardPile;
      newDiscard.push(card);

      const newState = {
        drawPile: state.drawPile,
        discardPile: newDiscard
      }
      return newState;
    })
    .action('shuffle', (state) => {
      console.log('shuffle state', state);
      const discardPile = state.discardPile;
      shuffle(discardPile);

      return {
        drawPile: discardPile,
        discardPile: []
      };
    })
    .create();

  const renderer = rendererGen();
  const eventHandler = eventHandlerGen(ruleBook, renderer);

  return {
    handle: function (state, ev) {
      console.log('state in handle', state, 'event', ev);
      return eventHandler.dispatch(state, ev);
    },
    init: function () {
      return eventHandler.dispatch(INITIAL_STATE, { 'rule': 'setup' });
    }
  };
};

module.exports = turnOrderGen;
