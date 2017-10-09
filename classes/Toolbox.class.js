/**
 * Created by Alan on 06/10/2017.
 */




class Toolbox{

    constructor(){

        this.toolbox = $('#toolbox');
        this.storedBlocks = this.getBlocs();
    }

    refreshToolBox(){
        let contents = $('<div>');
        $.each(this.storedBlocks,function(){
            let bloc = new Bloc(this.type, this.level, this.quantity);
            contents.append(bloc.drawBlock());
        });
        this.toolbox.empty().append(contents.children());
    }

    // TODO gestion des stocks de blocs
    getBlocs(){
        return inStorage;
    }

    addBlock(type, level, quantity){
        quantity = quantity || 1;

        let found = false;

        $.each(this.storedBlocks, function(){
            if(this.type === type && this.level === level){
                this.quantity += quantity;
                return found = true;
            }
        });
        if(!found){
            // si le bloc n'existe pas dans la toolbox
            this.toolbox.push({type:type, level:level, quantity:quantity})
        }

        return this;
    }

    removeBloc(id){

    }
}