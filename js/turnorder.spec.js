describe('turnorder', () => {
  it('adds a rule for drawing from the draw pile', () => {
    const turnOrder = turnOrderGen(eventHandlerGen, ruleBookGen);

    expect(turnOrder.handle({rule: 'action1'})).toBe('action1');
  });


  // TODO:
  // - implement concrete actions in app specific module
  // - draw action
  // - bind listeners to actions in app specific
  // - implement visual / non business logic stuff (how to decouple?)

});
