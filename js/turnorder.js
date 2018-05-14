'use strict';

const turnOrderGen = function (eventHandlerGen, ruleBookGen) {
  const ruleBook = ruleBookGen()
    .action('action1', () => 'action1')
    .create();

  const eventHandler = eventHandlerGen(ruleBook);

  return {
    handle: function (ev) {
      return eventHandler.dispatch(ev);
    }
  };
};
