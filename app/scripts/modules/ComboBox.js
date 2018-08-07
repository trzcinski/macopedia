/**
 * @author Maciej Trzciński
 * @class ComboBox
 * @version 1.0.0
 * @link https//trzcinski.org
 */
class ComboBox {
  /**
   * @constructor
   * @param {*} className
   */
  constructor(className) {
    this.buid(className);
  }
  /**
   * @method build
   * @param {*} className
   */
  buid(className) {
    const el = document.querySelector(className);
    const current = el.querySelector('[data-comboBoxCurrent]');
    const name = el.querySelector('[data-comboBoxName]');
    const values = el.querySelector('[data-comboBoxValues]');
    const comboBoxValue = el.querySelectorAll('[data-comboBoxValue]');
    const comboBoxInput = el.querySelector('[data-comboBoxInput]');

    current.addEventListener('click', () => {
      this.toggleActiveClass({
        values: values,
        el: el,
      });
    });

    for (const item of comboBoxValue) {
      item.addEventListener('click', (e) => {
        this.changeItem({
          e: e,
          comboBoxInput: comboBoxInput,
          name: name,
          values: values,
          el: el,
        });
      });
    }
  }
  /**
   * @method changeItem
   * @param {array} item
   */
  changeItem(item) {
    const value = item.e.target.getAttribute('data-comboBoxValue');
    const inner = item.e.target.innerHTML;

    item.comboBoxInput.value = value;
    item.name.innerHTML = inner;
    item.values.classList.remove('active');
    item.el.style.zIndex = 1;
  }

  /**
   * @method toggleActiveClass
   * @param {*} item
   */
  toggleActiveClass(item) {
    if (item.values.classList.contains('active')) {
      item.values.classList.remove('active');
      item.el.style.zIndex = 1;
    } else {
      item.values.classList.add('active');
      item.el.style.zIndex = 2;
    }
  }
}
new ComboBox('#comboBox0');

/**
* Sample code:
  <div class="comboBox" id="comboBox0" data-comboBoxContainer="">
      <span class="icon-dropdown_icon comboBox__arrow"></span>
      <input class="comboBox__input" data-comboBoxInput="">
      <div class="comboBox__current" data-comboBoxCurrent="">No</div>
     <div class="comboBox__values" data-comboBoxValues="">
          <div class="comboBox__value" data-comboBoxValue="No">
              No
          </div>
          <div class="comboBox__value" data-comboBoxValue="Yes">
              Yes
          </div>
      </div>
  </div>
*/
