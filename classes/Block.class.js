class Block{

    constructor(){
        this.type = 0;
        this.material = 0;
    }

    getClass(){
        return 'bloc '+ this.getTypeClass()+' '+ this.getMaterialClasses();
    }

    getMaterialClasses(){
        return "";
    }

    getTypeClass(){
        return "";
    }

    getType(){
        return 0;
    }

    static getMaterial(){
        return "";
    }

    static getCost(){
        return null;
    }

    setPosition(x,y){
        this.x = x;
        this.y = y;
    }

    setMaterial(newMaterial){
        this.material();
    }

    drawBlock(quantity){
        let block = $('<div>')
            .addClass(this.getClass())
            .attr('draggable',true)
            .data('type', this.getType());

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

Block.WOOD_WALL = 1;
Block.STONE_WALL = 2;
Block.STEEL_WALL = 3;
Block.WOOD_TOWER = 11;

class Wall extends Block{

    getType(){
        return this.type;
    }
    getMaterial(){
        return this.material;
    }
    getTypeClass(){
        return "wall";
    }

    static getCost(){
        return new Cost(1,0,0);
    }
}

class WallWood extends Wall {
    constructor(){
        super();
        this.type = Block.WOOD_WALL;
    }
    getMaterialClasses(){
        return 'wall_wood';
    }

    static getCost(){
        return new Cost(0,1,0);
    }
}

class WallStone extends Wall {
    constructor(){
        super();
        this.type = Block.STONE_WALL;
    }
    getMaterialClasses(){
        return 'wall_stone';
    }
    static getCost(){
        return new Cost(0,0,1);
    }
}

class WallSteel extends Wall {
    constructor(){
        super();
        this.type = Block.STEEL_WALL;
    }
    getMaterialClasses(){
        return 'wall_steel';
    }

    static getCost(){
        return new Cost(1,0,0);
    }
}

class TowerBlock extends Block {
    constructor(){
        super();
        this.type = Block.WOOD_TOWER;
    }

    getTypeClass(){
        return "tower";
    }

    static getCost(){
        return new Cost(1,1,1);
    }

    getMaterialClasses(){
        return 'tower_wood';
    }
}