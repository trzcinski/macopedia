/**
 * @class CheckCard
 */
class CheckCard {
  /**
   * @constructor
   */
  constructor() {
    if (this.vars()) {
      this.check();
    }
  }
  /**
   * Register vars
   * @method vars
   * @return {boolean} true if meta data exist
   */
  vars() {
    this.getCard = document.querySelector('[data-getcard]');
    if (!this.getCard) {
      return;
    }
    this.getCardLogo = document.querySelector('[data-getcardLogo]');

    this.last = 0;

    this.logo = {
      1: 'visa.png',
      2: 'mastercard.png',
    };

    return true;
  }

  /**
   * @method setLogo
   * @param {*} value
   */
  setLogo(value) {
    if (value != this.last) {
      this.getCardLogo.innerHTML = '';
      if (value != 0) {
        const img = document.createElement('img');
        img.classList.add('form__cardInfoImg');
        img.setAttribute('src', 'images/card/' + this.logo[value]);
        this.getCardLogo.appendChild(img);
      }
      this.last = value;
      this.getCardLogo.parentNode.setAttribute('data-form-label', value);
    }
  }
  /**
   * @method check
   */
  check() {
    this.getCard.addEventListener('keyup', (evt) => {
      const val = evt.target.value;
      const n = (typeof val == 'string') ? val : val.toString();
      this.setLogo(this.getCardType( n ));
    }, false);
  }
  /**
   * @method getCardType
   * @param {*} number
   * @return {boolean}
   */
  getCardType(number) {
    let re = new RegExp('^4');
    if (number.match(re) != null) {
      return 1;
    }

    re = new RegExp('^5[1-5]');
    if (number.match(re) != null) {
      return 2;
    }

    return 0;
  }
}

new CheckCard();
