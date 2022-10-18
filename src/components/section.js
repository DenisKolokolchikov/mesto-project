export class Section {
  constructor(items, renderer) {
      this._items = document.querySelector(items);
      this._renderer = renderer;
  }

  renderItem(data){
      this._renderer(data)
  }

  renderItems(cards){
      cards.forEach(data => this.renderItem(data));
  }
  
  addItem(cardNode) {
      this._container.append(cardNode)
  }    
}