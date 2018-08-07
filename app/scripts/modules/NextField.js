/**
 * @class
 */
class NextField {
  /**
   * @constructor
   */
  constructor() {
    if (this.vars()) {
      this.maxLengthFunction();
    }
  }

  /**
   * Register vars
   * @method vars
   * @return {boolean} true if meta data exist
   */
  vars() {
    this.maxLength = document.querySelectorAll('[data-nextfield]');
    if (!this.maxLength[0]) {
      return;
    }
    return true;
  }

  /**
   * @method maxLengthFunction
   * @description Add add event
   */
  maxLengthFunction() {
    Array.prototype.slice.call(this.maxLength, 0).forEach((e) => {
      const max = parseInt(e.getAttribute('maxlength'));
      e.addEventListener('keyup', (evt) => {
        this.nextPreviousElement(evt, max);
      }, false);
    });
  }

  /**
   * @method nextPreviousElement
   * @param {*} evt
   * @param {number} max
   * @return {boolean}
   */
  nextPreviousElement(evt, max) {
    const val = evt.target.value.length;
    if (val >= max) {
      const el = evt.target.nextElementSibling;
      if (el) {
        el.focus();
      }
      return false;
    }
    if (val == 0 && evt.keyCode == 8) {
      const el = evt.target.previousElementSibling;
      if (el) {
        el.focus();
      }
    }
    return true;
  }
}

new NextField();
