class Inventory
{
	constructor(){
        this.stocks = {};

        this.inventory = $('#toolbox');

        // todo : remove ressouces
        this.addBlock(Block.WOOD_WALL, 10);
        this.addBlock(Block.STONE_WALL, 4);
        this.addBlock(Block.STEEL_WALL, 15);
        this.addBlock(Block.WOOD_TOWER, 5);
    }

    getBlockQuantity(type) {
        if (!this.stocks.hasOwnProperty(type)) {
            this.stocks[type] = new Stock(type);
        }
        return this.stocks[type].quantity;
    }

    setBlockQuantity(type, quantity) {
        quantity = quantity < 0 ? 0 : quantity;

        if (!this.stocks.hasOwnProperty(type)) {
            this.stocks[type] = new Stock(type);
        }
        this.stocks[type].setQuantity(parseInt(quantity));
    }

    addBlock(type, quantity){
    	if(! this.stocks.hasOwnProperty(type)){
    		 this.stocks[type] = new Stock(type);
    	}
        this.stocks[type].addBlock(parseInt(quantity));
    }

    removeBlock(type, quantity) {
        if(! this.stocks.hasOwnProperty(type)){
            return;
        }
        this.stocks[type].removeBlock(parseInt(quantity));
    }

    /*
    initInventory(blockData){
        for( let i = 0; i < blockData.length; i++) {
            this.addBlock(blockData[i].type, blockData[i].quantity );
        }
    }
     */
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