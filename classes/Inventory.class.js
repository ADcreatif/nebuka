class Inventory
{
	constructor(){
        this.stocks = {}
    }

    addBlock(type, quantity, level){

    	if(! this.stocks.hasOwnProperty(type)){
    		 this.stocks[type] = new Stock(type,level);
    	}
    	 this.stocks[type].addBlock(quantity);
    }

    removeBlock(type, quantity) {
        if(! this.stocks.hasOwnProperty(type)){
            return;
        }

         this.stocks[type].removeBlock(quantity);
    }

    initInventory(blockData){
        for( let i = 0; i < blockData.length; i++) {
            this.addBlock(blockData[i].type, blockData[i].quantity, blockData[i].level );
        }
    }

    getBlockDisplay(){
        let contents = $('<div>');
        for (var property in this.stocks) {
            if (this.stocks.hasOwnProperty(property)) {
                contents.append(this.stocks[property].getDisplay());
            }
        }
        return contents.children();
    }
}