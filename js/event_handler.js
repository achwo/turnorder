'use strict';
const eventHandlerGen = (ruleBook, renderer) => {
  return {
    handleGen: function (state) {
      return function (ev) {
        return function ($event) {
          $event.stopPropagation();
          this.dispatch(state, ev);
        }.bind(this);
      }.bind(this);
    },
    dispatch: function (state, ev) {
      console.log('eventHandler.dispatch', state, ev);
      const newState = ruleBook.handle(state, ev.rule, ev.payload);
      console.log('new state', newState);
      renderer.render(newState, this.handleGen.bind(this));
      return newState;
    },
  }
};

module.exports = eventHandlerGen;
