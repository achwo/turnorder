const ruleBookGen = require('./rulebook');
describe('ruleBookGen', () => {
  it('creates a ruleBook with actions', () => {
    const ruleBook = ruleBookGen()
      .action('actionName', state => 'action')
      .create();

    expect(ruleBook).toBeDefined();
    expect(ruleBook).not.toBeNull();
    expect(ruleBook.handle({}, 'actionName')).toBe('action');
  });

  it('allows to chain multiple action calls', () => {
    const ruleBook = ruleBookGen()
      .action('action1', state => 'action')
      .action('action2', state => 'action2')
      .create();

    expect(ruleBook.handle({}, 'action1')).toBe('action');
    expect(ruleBook.handle({}, 'action2')).toBe('action2');
  });

  it('throws exception if rule does not exist', () => {
    const ruleBook = ruleBookGen().create();

    expect(() => ruleBook.handle({}, 'action1')).toThrow(
      "Rule 'action1' does not exist!"
    );
  });
});
