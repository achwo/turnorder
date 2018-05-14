'use strict';
const eventHandlerGen = (ruleBook) => {
  return {
    dispatch: (ev) => {
      return ruleBook.handle(ev.rule, ev.payload)
    },
  }
};
