class Memoria {
  constructor() {
    this.hasFlippedCard = false;
    this.lockBoard = false;
    this.firstCard = null;
    this.secondCard = null;
    this.elements = [
      { element: 'HTML5', source: 'https://upload.wikimedia.org/wikipedia/commons/3/38/HTML5_Badge.svg' },
      { element: 'CSS3', source: 'https://upload.wikimedia.org/wikipedia/commons/6/62/CSS3_logo.svg' },
      { element: 'JS', source: 'https://upload.wikimedia.org/wikipedia/commons/b/ba/Javascript_badge.svg' },
      { element: 'PHP', source: 'https://upload.wikimedia.org/wikipedia/commons/2/27/PHP-logo.svg' },
      { element: 'SVG', source: 'https://upload.wikimedia.org/wikipedia/commons/4/4f/SVG_Logo.svg' },
      { element: 'W3C', source: 'https://upload.wikimedia.org/wikipedia/commons/5/5e/W3C_icon.svg' },
      { element: 'HTML5', source: 'https://upload.wikimedia.org/wikipedia/commons/3/38/HTML5_Badge.svg' },
      { element: 'CSS3', source: 'https://upload.wikimedia.org/wikipedia/commons/6/62/CSS3_logo.svg' },
      { element: 'JS', source: 'https://upload.wikimedia.org/wikipedia/commons/b/ba/Javascript_badge.svg' },
      { element: 'PHP', source: 'https://upload.wikimedia.org/wikipedia/commons/2/27/PHP-logo.svg' },
      { element: 'SVG', source: 'https://upload.wikimedia.org/wikipedia/commons/4/4f/SVG_Logo.svg' },
      { element: 'W3C', source: 'https://upload.wikimedia.org/wikipedia/commons/5/5e/W3C_icon.svg' }
    ];

    this.shuffleElements(this.elements);
    this.createElements();
    this.addEventListeners();
  }

  shuffleElements(elements) {
    for (let i = elements.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [elements[i], elements[j]] = [elements[j], elements[i]];
    }
    return elements;
  }

  unflipCards() {
    this.lockBoard = true;

    setTimeout(() => {
      this.firstCard.dataset.state = 'unflip';
      this.secondCard.dataset.state = 'unflip';

      this.resetBoard();
    }, 1000);
  }

  resetBoard() {
    this.hasFlippedCard = false;
    this.lockBoard = false;
    this.firstCard = null;
    this.secondCard = null;
  }

  checkForMatch() {
    const isMatch = this.firstCard.dataset.element === this.secondCard.dataset.element;

    isMatch ? this.disableCards() : this.unflipCards();
  }

  disableCards() {
    this.firstCard.dataset.state = 'revealed';
    this.secondCard.dataset.state = 'revealed';

    this.resetBoard();
  }

  createElements() {
    const memorySection = document.querySelector('main section');

    this.elements.forEach(element => {
      const card = document.createElement('article');
      card.dataset.element = element.element;

      const h2 = document.createElement('h3');
      h2.textContent = 'Tarjeta de memoria';

      const img = document.createElement('img');
      img.src = element.source;
      img.alt = element.element;

      card.appendChild(h2);
      card.appendChild(img);

      memorySection.appendChild(card);
    });
  }

  addEventListeners() {
    const cards = document.querySelectorAll("main section article");
    cards.forEach(card => card.addEventListener('click', this.flipCard.bind(card, this)));
  }

  flipCard(game) {
    if (
      this.dataset.state === 'revealed' ||  
      game.lockBoard ||  
      this === game.firstCard  
    ) {
      return;
    }
    this.dataset.state = 'flip';

    if (!game.hasFlippedCard) {
      game.hasFlippedCard = true;
      game.firstCard = this;
    } else {
      game.secondCard = this;
      game.checkForMatch();
    }
  }
}
const memoria = new Memoria()