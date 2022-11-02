export class Section {                          
    constructor({renderer}, containerSelector) { 
        this._renderer = renderer;
        this._container = containerSelector;    
    }

    renderItem(data) { //получаем данные с сервера и используем их в renderItems
        this._renderer(data);
    }

    renderItems(items) {
        items.forEach(item => this.renderItem(item));
    }

    addItem(cardNode) { 
        this._container.prepend(cardNode)
    }
}