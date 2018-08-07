/**
 * @class
 * @description Class for valid only Numbers keys from keyboard
 */
class OnlyNumbers {
  /**
   * @constructor
   */
  constructor() {
    if (this.vars()) {
      this.onlyNumbers();
    }
  }

  /**
   * Register vars
   * @method
   * @return {boolean} true if meta data exist
   */
  vars() {
    this.onlynumbers = document.querySelectorAll('[data-onlynumbers]');
    if (!this.onlynumbers[0]) {
      return;
    }
    return true;
  }


  /**
   * Add event listener to all fields with meta data [data-onlynumbers]
   * @method
   */
  onlyNumbers() {
    Array.prototype.slice.call(this.onlynumbers, 0).forEach((e) => {
      e.addEventListener('keypress', (evt) => {
        this.isNumber(evt);
      }, false);
    });
  }

  /**
   * Check if is nymber key
   * @method
   * @param {*} evt
   * @return {boolean}
   */
  isNumber(evt) {
    const charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode == 46 || charCode > 31 && (charCode < 48 ||
        charCode > 57)) {
      evt.preventDefault();
      return false;
    }
    return true;
  }
}
new OnlyNumbers();
