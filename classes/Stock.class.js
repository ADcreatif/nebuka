class Stock
{
	constructor(type){
        this.type = type;
        this.quantity = 0;
    }

    addBlock(quantity){
    	this.quantity += quantity || 1;
    }

    removeBlock(quantity){
    	this.quantity -= quantity || 1;
    	if(this.quantity < 0){
    		this.quantity = 0;
    	}
    }

    getDisplay(){
    	return BlockFactory.getBlock(this.type, true, this.quantity);
    }
}