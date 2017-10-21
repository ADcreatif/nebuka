class Block{

    constructor(){
        this.type = Block.getType();
        this.material = 0;
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

    getCellId(){
        return Board.coordToID(this.x, this.y);
    }

    setMaterial(newMaterial){
        this.material();
    }

    static drawBlock(quantity){
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
    static getTypeClass(){
        return "";
    }

    static getType(){
        return this.type;
    }
    static getMaterial(){
        return this.material;
    }
    static getTypeClass(){
        return "wall";
    }
    static getCost(){
        return new Cost(1,0,0);
    }

     static drawBlock(quantity){
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

class WallWood extends Wall {
    static getType(){
        return Block.WOOD_WALL;
    }

    static getTypeClass(){
        return "wall wall_wood";
    }

    static getMaterialClasses(){
        return ' wall_wood';
    }
    static getCost(){
        return new Cost(0,1,0);
    }
}

class WallStone extends Wall {
    static getType(){
        return  Block.STONE_WALL;
    }

     static getTypeClass(){
        return "wall wall_stone";
    }
   
    static getMaterialClasses(){
        return 'wall_stone';
    }
    static getCost(){
        return new Cost(0,0,1);
    }
}

class WallSteel extends Wall {
    static getType(){
        return Block.STEEL_WALL;
    }

    static getTypeClass(){
        return "wall wall_steel";
    }
  
    static getMaterialClasses(){
        return 'wall_steel';
    }

    static getCost(){
        return new Cost(1,0,0);
    }
}

class TowerBlock extends Block {
    static getType(){
        return Block.WOOD_TOWER;
    }

    static getTypeClass(){
        return "wall tower";
    }
    static getCost(){
        return new Cost(1,1,1);
    }

    static getMaterialClasses(){
        return 'tower_wood';
    }
}