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

  function renderPile(cards, pileEl, clickHandler) {
    clearPile(pileEl);
    for (let card of cards) {
      let cardEl = createCardEl(cardMap[card]);
      renderCardEl(pileEl, cardEl);
    }
    offsetCardsInPile(pileEl);
  }

  function clearPile(pileEl) {
    pileEl.innerHTML = '';
  }

  function createCardEl(card) {
    const cardEl = document.createElement('img');

    cardEl.setAttribute('id', card.name);
    cardEl.setAttribute('src', 'data/img/' + card.file);
    cardEl.setAttribute('class', 'card');
    cardEl.setAttribute('alt', card.name);

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

  function setEventHandler(el, handleFn) {
    let action;

    if (el.innerHTML === '') {
      action = handleFn({rule: 'shuffle'});
    } else {
      action = handleFn({rule: 'draw from drawpile'});
    }

    el.addEventListener('click', action);
  }

  return {
    render: (state, handleGenFn) => {
      const drawPileEl = clearElHandlers(document.getElementById('draw'));
      const discardPileEl = document.getElementById('discard');
      const handleFn = handleGenFn(state);
      console.log('render state', state);
      renderPile(state.drawPile, drawPileEl);
      renderPile(state.discardPile, discardPileEl);
      setEventHandler(drawPileEl, handleFn);
    },
  }
};

module.exports = rendererGen;
