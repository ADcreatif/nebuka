class ResourceStock{

	constructor(container){
        this.resources = {};
        this.container = container;
    }

    addResource(type,quantity){
    	quantity = parseInt(quantity);
    	if(! this.resources.hasOwnProperty(type)){
    		 this.resources[type] = 0;
    	}
    	// console.log(quantity);
    	this.resources[type]  += quantity ;
    	// console.log(this.resources);
    	
    }

    removeResource(type,quantity){
    	quantity = parseInt(quantity);
    	if(this.resources.hasOwnProperty(type)){
    		this.resources[type]  -= quantity;
    		if( this.resources[type]  < 0)
    			delete this.resources[type];
    	}
    }

    displayResources(){
    	this.container.empty().append(this.getDisplay());
    }

    getDisplay(){
    	let contents = $('<div>');
        for (let type in this.resources) {
            contents.append(this.getResourceDisplay(type ,this.resources[type] ));
        }
        return contents.children();
    }

    addWood(quantity){
    	this.addResource(Resource.WOOD, quantity);
    }

    addSteel(quantity){
    	this.addResource(Resource.STEEL, quantity);
    }

    addStone(quantity){
    	this.addResource(Resource.STONE, quantity);
    }

    getResourceDisplay(type , quantity){
    	var value = parseInt(type);
    	var quantity = $("<span>"+quantity+"</span>");
    	var content = $('<div>').addClass("resource");
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

}

