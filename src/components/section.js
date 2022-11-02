export class Section {                          
    constructor({renderer}, containerSelector) { 
        this._renderer = renderer;
        this._container = containerSelector;    
    }

    renderItems(items) {
        items.forEach(item => this.renderItem(item));
    }

    addItem(cardNode) { 
        this._container.prepend(cardNode)
    }
}