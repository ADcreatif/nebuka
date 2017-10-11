class Stock
{
	constructor(type, material){
        this.type = type;
        this.material = material;
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
    	return BlockFactory.getBlockDisplay(this.type, this.material, this.quantity);
    }
}