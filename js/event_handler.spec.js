const ruleBookGen = require('./rulebook');
const eventHandlerGen = require('./event_handler');

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

    handle: function(state, rule, payload) {
      this.state = state;
      this.called = true;
      this.rule = rule;
      this.payload = payload;

      return state;
    }
  };

  const renderer = {
    state: null,
    handleGenFn: null,
    render: function(state, handleGenFn) {
      this.state = state;
      this.handleGenFn = handleGenFn;
    }
  };

  beforeEach(() => {
    ruleBook.state = null;
    ruleBook.called = false;
    ruleBook.rule = null;
    ruleBook.payload = null;
    renderer.state = null;
    renderer.handleGenFn = null;
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
