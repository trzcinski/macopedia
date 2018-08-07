/**
 * @class Form
 */
class Form {
  /**
   * @constructor
   */
  constructor() {
    if (this.vars()) {
      this.validate();
    }
  }
  /**
   * Register vars
   * @method
   * @return {boolean} true if meta data exist
   */
  vars() {
    this.dataForm = Array.prototype.slice.call(document.querySelectorAll('[data-form]'), 0);

    if (!this.dataForm[0]) {
      return;
    }

    this.formLabel = Array.prototype.slice.call(document.querySelectorAll('[data-form-label]'), 0);

    return true;
  }
  /**
   * @method validate
   */
  validate() {
    this.dataForm.forEach((e) => {
      e.addEventListener('submit', (evt) => {
        const el = document.querySelectorAll('[data-form-input]');
        const expirationMonth = document.querySelector('[data-form-input-expiration-month]');
        const expirationYear = document.querySelector('[data-form-input-expiration-year]');
        const card = document.querySelectorAll('[data-form-input-card]');
        this.expiration = true;
        this.card = true;
        this.ok = true;

        this.validateFields({
          el: el,
          expirationMonth: expirationMonth,
          expirationYear: expirationYear,
          card: card,
        });

        this.checkAllButtonsAndShowMessage();

        evt.preventDefault();
      });
    });
  }

  /**
   * @method checkAllButtonsAndShowMessage
   */
  checkAllButtonsAndShowMessage() {
    const form = this.testForm(this.formLabel);
    const formLenght = this.formLabel.length + 1;
    let test = true;
    do {
      const element = form.next();

      if (element.i < formLenght) {
        test = element.value;
        this.ok = test;
      } else {
        test = false;
      }
    } while (test);

    this.form(this.ok);
  }

  /**
   * @method validateFields
   * @param {*} item
   */
  validateFields(item) {
    this.checkCard({
      card: item.card,
    });

    this.checkExpiration({
      month: item.expirationMonth,
      year: item.expirationYear,
    });

    this.items(item.el);
  }
  /**
   * @method form
   * @param {*} valid
   */
  form(valid) {
    const info = document.querySelector('[data-form-info]');

    if (valid) {
      info.innerHTML = info.getAttribute('data-okay');
    } else {
      info.innerHTML = info.getAttribute('data-error');
    }
  }
  /**
   * @method testForm
   * @param {*} array
   * @return {Object}
   */
  testForm(array) {
    let nextIndex = 0;

    return {
      next: function() {
        return nextIndex < array.length ? {
          value: !array[nextIndex++].classList.contains('error'),
          i: nextIndex,
          done: false,
        } : {
          done: true,
        };
      },
    };
  }
  /**
   * @method checkCard
   * @param {*} el
   */
  checkCard(el) {
    const parent = el.card[0].closest('[data-form-label]');
    const cardId = parent.getAttribute('data-form-label');
    const isCard = cardId != '' ? parseInt(cardId) : 0;
    let number = '';
    if (!isCard) {
      this.card = false;
    } else {
      el.card.forEach((evt) => {
        number = number + evt.value;
      });
      if (number.length == 16) {
        if (!this.validCreditCard(number)) {
          this.card = false;
        }
      } else {
        this.card = false;
      }
    }
    this.errorToggle(this.card, parent);
  }
  /**
   * @method validCreditCard
   * @param {String} value
   * @return {boolean}
   */
  validCreditCard(value) {
    // accept only digits, dashes or spaces
    if (/[^0-9-\s]+/.test(value)) return false;

    // The Luhn Algorithm. It's so pretty.
    let nCheck = 0;
    let bEven = false;
    value = value.replace(/\D/g, '');

    for (let n = value.length - 1; n >= 0; n--) {
      let cDigit = value.charAt(n);
      let nDigit = parseInt(cDigit, 10);

      if (bEven) {
        if ((nDigit *= 2) > 9) nDigit -= 9;
      }
      nCheck += nDigit;
      bEven = !bEven;
    }
    return (nCheck % 10) == 0;
  }
  /**
   * @method checkExpiration
   * @param {Node} el
   */
  checkExpiration(el) {
    const currentYear = new Date().getYear() - 100;
    const currentMonth = new Date().getMonth();
    const parent = el.year.closest('[data-form-label]');

    if (el.year.value < currentYear) {
      this.expiration = false;
    }
    if (this.expiration && el.year.value == currentYear) {
      if (parseInt(el.month.value.replace('0', '')) <
        currentMonth) {
        this.expiration = false;
      }
    }

    this.errorToggle(this.expiration, parent);
  }
  /**
   * @method errorToggle
   * @param {Boolean} val
   * @param {Node} parent
   */
  errorToggle(val, parent) {
    if (!val) {
      parent.classList.add('error');
    } else {
      parent.classList.remove('error');
    }
  }
  /**
   * @method items
   * @param {Object} items
   */
  items(items) {
    items.forEach((item) => {
      const getType = item.getAttribute('data-form-input');
      this.valid({
        element: item,
        type: getType,
      });
    });
  }
  /**
   * @method valid
   * @param {Node} el
   * @return {false} if is not valid
   */
  valid(el) {
    const contain = el.element.closest('[data-form-label]');
    if (!this.isValid(el.element.value, el.type)) {
      this.expiration = false;
      contain.classList.add('error');
      return false;
    } else {
      contain.classList.remove('error');
    }
  }
  /**
   * @method isValid
   * @param {*} value
   * @param {*} el
   * @return {boolean};
   */
  isValid(value, el) {
    const reg = {
      security: /[0-9]{3,}/,
      card: /[0-9]{4,}/,
      number: /^[0-9]*$/,
      min_one_letter: /^[a-z]+/,
      notempty: /([^\s])/,
      email: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      phone: /^(1[ \-\+]{0,3}|\+1[ -\+]{0,3}|\+1|\+)?((\(\+?1-[2-9][0-9]{1,2}\))|(\(\+?[2-8][0-9][0-9]\))|(\(\+?[1-9][0-9]\))|(\(\+?[17]\))|(\([2-9][2-9]\))|([ \-\.]{0,3}[0-9]{2,4}))?([ \-\.][0-9])?([ \-\.]{0,3}[0-9]{2,4}){2,3}$/,
    };
    if (reg[el]) {
      return reg[el].test(value);
    }
  }
}
new Form();
