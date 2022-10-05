export default class Section {
  constructor(selector, renderer) {
    this._container = document.querySelector(selector);
    this._renderer = renderer
  }

  addArray(data) {
    data.reverse().forEach(item => this.setItem(item))
  }

  setItem(item) {
    const element = this._renderer(item);
    this._container.prepend(element)
  }

  clear(){
    this._container.textContent=''
  }
}


