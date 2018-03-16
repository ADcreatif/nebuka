class Block {

    constructor() {
        this.type = Block.getType();
        this.material = 0;
        this.size = this.numberOfCell();
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

    update() {
    }

    static getMaterial() {
        return "";
    }

    setMaterial(newMaterial) {
        this.material();
    }

    getShape() {
        return [[1]];
    }

    static getCost() {
        return null;
    }

    /** sets the centers coordinates including shape */
    setCenter() {
        let shape = this.getShape();
        this.centerX = Math.floor(getBiggestArraySize(shape) / 2 + this.x);
        this.centerY = Math.floor(shape.length / 2 + this.y);
    }

    getOrigin() {
        let shape = this.getShape();
        this.originX = this.x - Math.floor(getBiggestArraySize(shape) / 2);
        this.originY = this.y - Math.floor(shape.length / 2);
        return {x: this.originX, y: this.originY};
    }

    getCenter() {
        return {x: this.centerX, y: this.centerY};
    }

    getCenterInPixel() {
        return {x: this.centerX * Board.getSize(), y: this.centerY * Board.getSize()};
    }

    numberOfCell() {
        if (this.size)
            return this.size;

        let shape = this.getShape();
        let count = 0;

        $(shape).each(function () {
            count += this.length;
        });

        return count;
    }

    /**
     * Sets the block position on board
     * @param x position (number of cell)
     * @param y position (number of cell)
     */
    setPosition(x, y) {
        this.x = x;
        this.y = y;
        this.setCenter();
    }

    getCellID() {
        return Board.getIdFromCoord(this.x, this.y);
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