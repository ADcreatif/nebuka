class Stock
{
	constructor(type, level){
        this.type = type;
        this.level = level;
        this.quantity = 0;
    }

    addBlock(quantity){

    	this.quantity += quantity;
    }

    removeBlock(quantity){
    	this.quantity -= quantity;
    	if(this.quantity < 0){
    		this.quantity = 0;
    	}
    }

    getDisplay(){
    	return BlockFactory.getBlockDisplay(this.type, this.quantity, this.level);
    }
}