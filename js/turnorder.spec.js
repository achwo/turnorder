const turnOrderGen = require('./turnorder');
const eventHandlerGen = require('./event_handler');
const ruleBookGen = require('./rulebook');
const rendererGen = require('./renderer');

xdescribe('turnorder', () => {
  let turnOrder;
  beforeEach(() => {
    turnOrder = turnOrderGen(eventHandlerGen, ruleBookGen, rendererGen, () => 0.1);
  });

  it('adds a rule for drawing from the draw pile', () => {
    expect(typeof turnOrder.handle(
      { drawPile: ['1'], discardPile: []},
      {rule: 'draw from drawpile'})
    ).toBe('object');
  });

  it('adds a rule for setting up the turnorder deck', () => {
    expect(typeof turnOrder.handle(
      { drawPile: ['1'], discardPile: []},
      {rule: 'setup'})).toBe('object');
  });

  it('adds a rule for shuffling the deck', () => {
    expect(typeof turnOrder.handle(
      { drawPile: [], discardPile: []},
      {rule: 'shuffle'})
    ).toBe('object');
  });

  describe('setup', () => {
    it('creates an initial state', () => {
      const state = turnOrder.handle(
        { drawPile: [], discardPile: []},
        {rule: 'setup'});

      expect(state.drawPile.length).toBe(6);
      expect(state.discardPile.length).toBe(0);
    });
  });

  describe('draw from drawpile', () => {
    it('draws one card from the drawPile and puts it on the discardPile', () => {
      const state = {
        drawPile: ['1'],
        discardPile: []
      };
      const newState = turnOrder.handle(state, {rule: 'draw from drawpile'});

      expect(newState.drawPile.length).toBe(0);
      expect(newState.discardPile[0]).toBe('1');
    });

    it('triggers shuffle action before drawing a card when the drawPile is empty', () => {
      const state = {
        drawPile: [],
        discardPile: ['1', '2']
      };
      const newState = turnOrder.handle(state, {rule: 'draw from drawpile'});

      expect(newState.drawPile[0]).toBe('2');
      expect(newState.discardPile[0]).toBe('1');
    });
  });

  describe('shuffle', () => {
    it('puts the discardPile on the drawPile', () => {
      const state = {
        drawPile: [],
        discardPile: ['1']
      };

      const newState = turnOrder.handle(state, {rule: 'shuffle'});

      expect(newState.drawPile[0]).toBe('1');
      expect(newState.discardPile.length).toBe(0);
    });

    it('shuffles the discardPile', () => {
      const state = {
        drawPile: [],
        discardPile: ['1', '2', '3']
      };

      const newState = turnOrder.handle(state, {rule: 'shuffle'});

      expect(newState.drawPile[0]).toBe('2');
      expect(newState.drawPile[1]).toBe('3');
      expect(newState.drawPile[2]).toBe('1');
      expect(newState.discardPile.length).toBe(0);
    });
  });
});
