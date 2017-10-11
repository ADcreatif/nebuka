class Block{

    constructor(level){
        this.material = level;
    }

    static getClass(){
        return 'bloc '+ this.getTypeClass()+' '+ this.getMaterialClasses();
    }

    static getMaterialClasses(){
        return "";
    }

    static getTypeClass(){
        return "";
    }

    static getType(){
        return "";
    }

    static getMaterial(){
        return "";
    }

    static drawBlock(quantity){
        let block = $('<div>')
            .addClass(this.getClass())
            .attr('draggable',true)
            .data('type', this.getType())
            .data('material', this.getMaterial());

        if(quantity !== undefined){
            block.append($('<span>').text(quantity))
        }

        return block;
    }
}

Block.WOOD = 1;
Block.STONE = 2;
Block.STEEL = 3;

Block.WALL = 1;
Block.TOWER = 2;

class Wall extends Block{
    static getType(){
        return Block.WALL;
    }
    static getTypeClass(){
        return "wall";
    }
}

class WallWood extends Wall
{
    static getMaterial(){
        return Block.WOOD;
    }
    static getMaterialClasses(){
        return 'wall_wood';
    }
}

class WallStone extends Wall
{
    static getMaterial(){
        return Block.STONE;
    }
    static getMaterialClasses(){
        return 'wall_stone';
    }
}

class WallSteel extends Wall
{
    static getMaterial(){
        return Block.STEEL;
    }
    static getMaterialClasses(){
        return 'wall_steel';
    }
}

class TowerBlock extends Block
{
    static getMaterial(){
        return Block.WOOD;
    }
    static getType(){
        return Block.TOWER;
    }

    static getTypeClass(){
        return "tower";
    }

    static getMaterialClasses(){
        return 'tower_wood';
    }
}