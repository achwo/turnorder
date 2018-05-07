describe('eventHandlerGen', () => {
  it('generates an eventHandler', () => {
    const eventHandler = eventHandlerGen({});
    expect(eventHandler.dispatch).toBeDefined();
  });
});

describe('eventHandler', () => {
  let ruleBook = {
    called: false,
    rule: null,
    payload: null,

    handle: function (rule, payload) {
      this.called = true;
      this.rule = rule;
      this.payload = payload;
    }
  };

  it('dispatches events to the RuleBook', () => {
    const eventHandler = eventHandlerGen(ruleBook);
    const ev = { rule: 'rule', payload: 'payload' };

    expect(ruleBook.called).toBe(false);

    eventHandler.dispatch(ev);

    expect(ruleBook.called).toBe(true);
    expect(ruleBook.rule).toBe('rule');
    expect(ruleBook.payload).toBe('payload');
  });

});
