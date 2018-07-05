'use strict';
const ruleBookGen = function() {
  return {
    _actions: {},

    action: function(name, fn) {
      this._actions[name] = fn;
      return this;
    },

    create: function() {
      const _rules = this._actions;
      return {
        handle: function(state, name, payload) {
          if (_rules[name] === undefined) {
            throw "Rule '" + name + "' does not exist!";
          }
          return _rules[name](state, payload);
        }
      };
    }
  };
};

module.exports = ruleBookGen;
