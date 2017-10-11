class Inventory
{
	constructor(){
        this.stocks = {};

        this.inventory = $('#toolbox');
        this.initInventory(inStorage);

    }

    addBlock(type, material, quantity){
    	if(! this.stocks.hasOwnProperty(type)){
    		 this.stocks[type] = new Stock(type,material);
    	}
    	 this.stocks[type].addBlock(quantity);
    }

    removeBlock(type, material, quantity) {
        if(! this.stocks.hasOwnProperty(type)){
            return;
        }
        this.stocks[type].removeBlock(quantity);
    }

    initInventory(blockData){
        for( let i = 0; i < blockData.length; i++) {
            this.addBlock(blockData[i].type, blockData[i].material, blockData[i].quantity );
        }
    }

    getBlockDisplay(){
        let contents = $('<div>');
        for (let property in this.stocks) {
            if (this.stocks.hasOwnProperty(property) && this.stocks[property].quantity > 0) {
                contents.append(this.stocks[property].getDisplay());
            }
        }
        return contents.children();
    }

    displayInventory(){
        this.inventory.empty().append(this.getBlockDisplay());
    }
}