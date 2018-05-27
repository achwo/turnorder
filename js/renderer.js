'use strict';

const rendererGen = () => {
  const cardMap = {
    '1': {
      name: 'card1',
      file: 'card1.svg'
    },
    '2': {
      name: 'card2',
      file: 'card2.svg'
    },
    '3': {
      name: 'card3',
      file: 'card3.svg'
    },
    'wild': {
      name: 'cardwild',
      file: 'cardwild.svg'
    },
    'nemesis1': {
      name: 'cardnemesis1',
      file: 'cardnemesis.svg'
    },
    'nemesis2': {
      name: 'cardnemesis2',
      file: 'cardnemesis.svg'
    },
  };

  function renderPile(cards, pileEl) {
    for (let card of cards) {
      createCardEl(cardMap[card], pileEl);
    }


  }

  function createCardEl(card, target) {
    const cardEl = document.createElement('img');

    cardEl.setAttribute('id', card.name);
    cardEl.setAttribute('src', 'data/img/' + card.file);
    cardEl.setAttribute('class', 'card');
    cardEl.setAttribute('alt', card.name);
  }

  return {
    render: (state) => {
      const drawPileEl = document.getElementById('draw');
      renderPile(state.drawPile, drawPileEl);
    },
  }
};

module.exports = rendererGen;
