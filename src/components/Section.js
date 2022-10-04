export default class Section {
  constructor(selector, itemCreator) {
    this._container = document.querySelector(selector);
    this._creator = itemCreator
  }

  addArray(data) {
    data.forEach(item => this.setItem(item))
  }

  setItem(item) {
    const element = this._creator(item);
    this._container.append(element.generate())
  }

  clear(){
    this._container.textContent=''
  }
}


