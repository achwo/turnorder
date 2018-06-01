const rendererGen = require('./renderer');

describe('rendererGen', () => {
  let renderer;
  beforeEach(() => {
    renderer = rendererGen();
  });

  it('creates a renderer', () => {
    expect(renderer).toBeDefined();
    expect(renderer).not.toBeNull();
  });

  xdescribe('renderer.render', () => {
    it('renders an empty drawpile', () => {
      const state = {
        drawPile: [],
        discardPile: []
      };
      renderer.render(state, () => {});
    });

  });
});
