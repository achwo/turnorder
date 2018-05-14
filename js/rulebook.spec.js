describe('ruleBookGen', () => {
  it('creates a ruleBook with actions', () => {
    const gen = ruleBookGen();
    gen.action('actionName', () => 'action');

    const ruleBook = gen.create();
    expect(ruleBook).toBeDefined();
    expect(ruleBook).not.toBeNull();
    expect(ruleBook.handle('actionName')).toBe('action');
  });

  it('allows to chain multiple action calls', () => {
    const ruleBook = ruleBookGen()
      .action('action1', () => 'action')
      .action('action2', () => 'action2')
      .create();

    expect(ruleBook.handle('action1')).toBe('action');
    expect(ruleBook.handle('action2')).toBe('action2');
  });
});
