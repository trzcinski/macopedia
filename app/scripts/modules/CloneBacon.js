/**
 * @class
 */
class CloneBacon {
  /**
   * @constructor
   */
  constructor() {
    if (this.vars()) {
      this.clone();
    }
  }
  /**
   * Register vars
   * @method vars
   * @return {boolean} true if meta data exist
   */
  vars() {
    this.cloneBacon = document.querySelector('[data-cloneBacon]');
    this.imgBacon = document.querySelector('[data-imgBacon]');
    this.wrapBacon = document.querySelector('[data-wrapbacon]');
    if (!this.cloneBacon) {
      return;
    }
    return true;
  }
  /**
   * @method clone
   * @description Add event to [data-cloneBacon]
   */
  clone() {
    this.cloneBacon.addEventListener('click', () => {
      this.cloneAction();
    });
  }

  /**
   * @method cloneAction
   * @description Clone bacon Img
   */
  cloneAction() {
    const src = this.imgBacon.getAttribute('src');
    const alt = this.cloneBacon.getAttribute('alt');
    if (src) {
      const newImg = document.createElement('img');
      newImg.setAttribute('src', src);
      newImg.setAttribute('alt', alt);
      newImg.style.width = 100 + '%';
      newImg.style.height = 100 + '%';
      this.wrapBacon.appendChild(newImg);
    }
  }
}

new CloneBacon();
