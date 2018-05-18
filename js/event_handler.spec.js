describe('eventHandlerGen', () => {
  it('generates an eventHandler', () => {
    const eventHandler = eventHandlerGen({});
    expect(eventHandler.dispatch).toBeDefined();
  });
});

describe('eventHandler', () => {
  const ruleBook = {
    state: null,
    called: false,
    rule: null,
    payload: null,

    handle: function (state, rule, payload) {
      this.state = state;
      this.called = true;
      this.rule = rule;
      this.payload = payload;
    }
  };

  const renderer = {
    state: null,
    render: function(state) {
      this.state = state;
    }
  };

  beforeEach(() => {
    ruleBook.state = null;
    ruleBook.called = false;
    ruleBook.rule = null;
    ruleBook.payload = null;
    renderer.state = null;
  });

  it('dispatches events to the RuleBook', () => {
    const eventHandler = eventHandlerGen(ruleBook, renderer);
    const ev = { rule: 'rule', payload: 'payload' };

    expect(ruleBook.called).toBe(false);

    eventHandler.dispatch('state', ev);

    expect(ruleBook.state).toBe('state');
    expect(ruleBook.called).toBe(true);
    expect(ruleBook.rule).toBe('rule');
    expect(ruleBook.payload).toBe('payload');
  });

  it('triggers rerendering after an event returns', () => {
    const eventHandler = eventHandlerGen(ruleBook, renderer);
    const ev = { rule: 'rule', payload: 'payload' };

    eventHandler.dispatch('state', ev);

    expect(renderer.state).toBe('state');
  });

});
