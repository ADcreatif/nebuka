class ResourceStock{

    constructor() {
        this.resources = {};
        this.container = $('#ressources');
    }

    addResource(type,quantity){
    	quantity = parseInt(quantity);
    	if(! this.resources.hasOwnProperty(type)){
    		 this.resources[type] = 0;
    	}
    	this.resources[type]  += quantity ;
    }

    getRessource(type) {
        type = parseInt(type);
        if (!this.resources.hasOwnProperty(type)) {
            return 0;
        }
        return this.resources[type];
    }

    removeResource(type,quantity){
    	quantity = parseInt(quantity);
    	if(this.resources.hasOwnProperty(type)){
    		this.resources[type]  -= quantity;
    		if( this.resources[type]  < 0)
    			delete this.resources[type];
    	}
    }

    setResourceQuantity(type, quantity) {
        if (this.resources.hasOwnProperty(type)) {
            this.resources[type] = quantity;
            if (this.resources[type] < 0)
                delete this.resources[type];
        }
    }

    displayResources(){
        this.container.find('#wood_inv').val(this.getRessource(Resource.WOOD));
        this.container.find('#stone_inv').val(this.getRessource(Resource.STONE));
        this.container.find('#steel_inv').val(this.getRessource(Resource.STEEL));
    }

	/*
    getDisplay(){
    	let contents = $('<div>');
        for (let type in this.resources) {
	 if(this.resources.hasOwnProperty(type))
	 contents.append(this.getResourceDisplay(type ,this.resources[type] ));
        }
        return contents.children();
    }
	 */
    addWood(quantity){
    	this.addResource(Resource.WOOD, quantity);
    }

    addSteel(quantity){
    	this.addResource(Resource.STEEL, quantity);
    }

    addStone(quantity){
    	this.addResource(Resource.STONE, quantity);
    }

	/*
    getResourceDisplay(type , quantity){
	 let value = parseInt(type);
	 let quantity = $("<span>"+quantity+"</span>");
	 let content = $('<div>').addClass("resource");
    	content.append(quantity);
    
    	switch(value){
    		case Resource.WOOD:
    			return content.addClass("wood");
    		break;
    		case Resource.STEEL:
    			return content.addClass("stone");
    		break;
    		case Resource.STONE:
    			return content.addClass("steel");
    		break;
    	}
    	return "";
    }
	 */
}

