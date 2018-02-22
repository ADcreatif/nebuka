class Block {

    constructor() {
        this.type = Block.getType();
        this.material = 0;
    }

    static getClass() {
        return 'block ' + this.getTypeClass();
    }

    static getTypeClass() {
        return "";
    }

    static getType() {
        return 0;
    }

    static getMaterial() {
        return "";
    }

    static getShape() {
        return [[1]];
    }

    static getCost() {
        return null;
    }

    /**
     * set the centers coordinates in pixel
     */
    set_center() {
        let shape = this.constructor.getShape();
        this.centerX = (get_biggest_array_size(shape) / 2 + this.x) * Board.getSize();
        this.centerY = (shape.length / 2 + this.y) * Board.getSize();
    }

    /**
     * Sets the block position on board
     * @param x position (number of cell)
     * @param y position (number of cell)
     */
    setPosition(x, y) {
        this.x = x;
        this.y = y;
        this.set_center();
    }

    get_cell_id() {
        return Board.getIdFromCoord(this.x, this.y);
    }

    setMaterial(newMaterial) {
        this.material();
    }

    static drawBlock(quantity) {
        let block = $('<div>')
            .addClass(this.getClass())
            .attr('draggable', true)
            .data('type', this.getType());


        if (quantity !== undefined) {
            block.append($('<span>').text(quantity))
        }

        return block;
    }
}

class Cost {
    constructor(wood, steel, stone) {
        this.stone = stone;
        this.wood = wood;
        this.steel = steel;
    }

    display() {

    }
}

Block.WOOD_WALL = 1;
Block.STONE_WALL = 2;
Block.STEEL_WALL = 3;
Block.WOOD_TOWER = 11;

class Wall extends Block {
    static getTypeClass() {
        return "";
    }

    static getType() {
        return this.type;
    }

    static getMaterial() {
        return this.material;
    }

    static getTypeClass() {
        return "wall";
    }

    static getCost() {
        return new Cost(1, 0, 0);
    }

    static drawBlock(quantity) {
        let block = $('<div>')
            .addClass(this.getClass())
            .attr('draggable', true)
            .data('type', this.getType());


        if (quantity !== undefined) {
            block.append($('<span>').text(quantity))
        }

        return block;
    }
}

class WoodWall extends Wall {
    static getType() {
        return Block.WOOD_WALL;
    }

    static getTypeClass() {
        return "wall wood_wall";
    }

    static getCost() {
        return new Cost(0, 1, 0);
    }
}

class StoneWall extends Wall {
    static getType() {
        return Block.STONE_WALL;
    }

    static getTypeClass() {
        return "wall stone_wall";
    }

    static getCost() {
        return new Cost(0, 0, 1);
    }
}

class SteelWall extends Wall {
    static getType() {
        return Block.STEEL_WALL;
    }

    static getTypeClass() {
        return "wall steel_wall";
    }

    static getCost() {
        return new Cost(1, 0, 0);
    }
}