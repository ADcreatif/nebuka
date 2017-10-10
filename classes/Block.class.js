class Block{

    constructor(level){
        this.level = level;
    }

    static getClass(level){
        let blockClass = this.getClasses()[level];
        return 'bloc '+ this.getTypeClass()+' '+ blockClass;
    }

    static getClasses(){
        return [];
    }

    static getTypeClass(){
        return "";
    }

    static getType(){
        return "";
    }
    
    static drawBlock(quantity, level){
        let quantityDisplay = $('<span>').text(quantity);
        
        let bloc = $('<div>')
            .addClass(this.getClass(level))
            .attr('draggable','')
            .append(quantityDisplay);

        /*if(this.blocID){
            bloc.attr('id', 'blocID_' + this.blocID)
                .data('blocID', this.blocID);
        }*/
       
        return bloc;
    }
}

Block.WOOD = 1;
Block.STONE = 2;
Block.STEEL = 3;
Block.TOWER = 4;

class WoodBlock extends Block
{
    static getType(){
        return Block.WOOD;
    }

    static getTypeClass(){
        return "wall";
    }

    static getClasses(){
        return ['wall_wood', 'wall_steel'];
    }
}

class StoneBlock extends Block
{
    static getType(){
        return Block.STONE;
    }

    static getTypeClass(){
        return "wall";
    }

    static getClasses(){
        return ['wall_stone', 'wall_stone'];
    }
}

class SteelBlock extends Block
{
    static getType(){
        return Block.STEEL;
    }

    static getTypeClass(){
        return "wall";
    }

    static getClasses(){
        return ['wall_steel', 'wall_steel'];
    }
}

class TowerBlock extends Block
{
    static getType(){
        return Block.TOWER;
    }

    static getTypeClass(){
        return "tower";
    }

    static getClasses(){
        return ['tower_wood', 'tower_steel'];
    }
}