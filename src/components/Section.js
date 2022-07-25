export default class Section{
    constructor({ items, renderer }, classSelector){
        this._items = items;
        this._renderer = renderer;
        this._container = document.querySelector(classSelector);
    }

    _clear() {
    this._container.innerHTML = "";
    }

    renderItems(){
        this._clear();

        this._items.slice(0, 6).forEach((item, index) => {
          const element = this._renderer(item, index);
          this._container.append(element);
        });


    }

    addItem(element){
        this._container.append(element);
    }

}