'use strict';
const eventHandlerGen = (ruleBook, renderer) => {
  return {
    dispatch: (state, ev) => {
      const newState = ruleBook.handle(state, ev.rule, ev.payload);
      renderer.render(state);
      return newState;
    },
  }
};

module.exports = eventHandlerGen;
