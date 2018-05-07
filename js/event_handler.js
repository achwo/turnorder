'use strict';
const eventHandlerGen = (ruleBook) => {
  return {
    dispatch: (ev) => {
      ruleBook.handle(ev.rule, ev.payload)
    },
  }
};
