'use strict';
const ruleBookGen = function () {
  return {
    _actions: {},

    action: function (name, fn) {
      this._actions[name] = fn;
      return this;
    },

    create: function () {
      const _rules = this._actions;
      return {
        handle: function (name) {
          return _rules[name]();
        }
      };
    }
  };
}
