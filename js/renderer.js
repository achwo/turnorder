'use strict';

const rendererGen = () => {
  const cardMap = {
    '1': {
      name: 'card1',
      file: 'card1.svg',
      back: 'cardback.svg'
    },
    '2': {
      name: 'card2',
      file: 'card2.svg',
      back: 'cardback.svg'
    },
    '3': {
      name: 'card3',
      file: 'card3.svg',
      back: 'cardback.svg'
    },
    wild: {
      name: 'cardwild',
      file: 'cardwild.svg',
      back: 'cardback.svg'
    },
    nemesis1: {
      name: 'cardnemesis1',
      file: 'cardnemesis.svg',
      back: 'cardback.svg'
    },
    nemesis2: {
      name: 'cardnemesis2',
      file: 'cardnemesis.svg',
      back: 'cardback.svg'
    }
  };

  function renderPile(cards, pileEl, open) {
    clearPile(pileEl);
    for (let card of cards) {
      let cardEl = createCardEl(cardMap[card], open);
      renderCardEl(pileEl, cardEl);
    }
    offsetCardsInPile(pileEl);
  }

  function clearPile(pileEl) {
    pileEl.innerHTML = '';
  }

  function createCardEl(card, open) {
    const cardEl = document.createElement('img');

    cardEl.setAttribute('id', card.name);
    cardEl.setAttribute('class', 'card');
    cardEl.setAttribute('alt', card.name);

    if (open) {
      cardEl.setAttribute('src', 'data/img/' + card.file);
    } else {
      cardEl.setAttribute('src', 'data/img/' + card.back);
    }
    return cardEl;
  }

  function offsetCardsInPile(pileEl) {
    const cardEls = pileEl.children;

    const inc = -3;
    let margin = 0;

    for (let el of cardEls) {
      el.style = 'margin-top: ' + margin + 'px;';
      margin += inc;
    }
  }

  function renderCardEl(targetEl, cardEl) {
    targetEl.appendChild(cardEl);
  }

  function clearElHandlers(el) {
    const clone = el.cloneNode(true);
    el.parentNode.replaceChild(clone, el);

    return clone;
  }

  return {
    render: (state, handleGenFn) => {
      const drawPileEl = clearElHandlers(document.getElementById('draw'));
      const discardPileEl = document.getElementById('discard');
      const handleFn = handleGenFn(state);
      console.log('render state', state);
      renderPile(state.drawPile, drawPileEl, false);
      renderPile(state.discardPile, discardPileEl, true);
      drawPileEl.addEventListener(
        'click',
        handleFn({ rule: 'draw from drawpile' })
      );
    }
  };
};

module.exports = rendererGen;
