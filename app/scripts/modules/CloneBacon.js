class CloneBacon {
    constructor() {
      if (this.vars()) {
        this.clone();
      }
    }
    vars() {
      this.cloneBacon = document.querySelector('[data-cloneBacon]');
      this.imgBacon = document.querySelector('[data-imgBacon]');
      this.wrapBacon = document.querySelector('[data-wrapbacon]');
      if (!this.cloneBacon) {
        return;
      }
      return true;
    }
    clone() {
      this.cloneBacon.addEventListener('click', () => {
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
      });
    }
  }
  
  new CloneBacon();
  