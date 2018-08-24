
class Block {

    constructor() {
        this.type = this.constructor.getType();
        this.size = this.numberOfCell();
        this.class = this.constructor.getClass();
        this.x = 0;
        this.y = 0;
    }

    static getClass() {
        return 'block ';
    }

    static getType() {
    }

    update() {
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

    getCenterInPixel() {
        return {x: this.centerX * Board.TILE_SIZE, y: this.centerY * Board.TILE_SIZE};
    }

    getOrigin() {
        let shape = this.getShape();
        this.originX = this.x - Math.floor(getBiggestArraySize(shape) / 2);
        this.originY = this.y - Math.floor(shape.length / 2);
        return {x: this.originX, y: this.originY};
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

    getCellClass() {
        return '.cell_' + this.getCellID();
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

Block.DEFAULT_BLOCK = 0;
Block.WOOD_WALL = 1;
Block.STONE_WALL = 2;
Block.STEEL_WALL = 3;
Block.WOOD_TOWER = 11;

class Cost {
    constructor(wood, steel, stone) {
        this.stone = stone;
        this.wood = wood;
        this.steel = steel;
    }

    display() {

    }
}

