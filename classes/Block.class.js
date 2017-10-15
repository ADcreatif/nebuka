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

    static getCost(){
        return null;
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

class Cost{
    constructor(wood,steel,stone){
        this.stone = stone;
        this.wood = wood;
        this.steel = steel;
    }

    display(){

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

    static getCost(){
        return new Cost(1,0,0);
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

    static getCost(){
        return new Cost(0,1,0);
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
    static getCost(){
        return new Cost(0,0,1);
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

    static getCost(){
        return new Cost(1,0,0);
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

     static getCost(){
        return new Cost(1,1,1);
    }

    static getMaterialClasses(){
        return 'tower_wood';
    }
}