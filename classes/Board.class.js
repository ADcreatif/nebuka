"use strict";

class Board {

    constructor() {
        /**
         * the Board, from DOM (<table>)
         */
        this.dom = $();

        /**
         * the blocks list by instance
         * @type {Array}
         */
        this.blocks = new Array(Board.TILE_QUANTITY * Board.TILE_QUANTITY);
        this.blocks.fill(null);
        this.matrix = [];
    }


    init() {
        this.drawBoard('edit-board');

        // loading saveGAme or default values
        let datas = GameSave.loadDatas(GameSave.BOARD);
        let board = datas.length > 0 ? datas : inBoard;

        for (let i in board) {
            if (board.hasOwnProperty(i) && board[i] !== null) {
                this.addBlock(board[i].type, board[i].x, board[i].y);
            }
        }
    }

    static getIdFromCoord(x, y) {
        return y * Board.TILE_QUANTITY + x;
    }

    static getXFromIndex(cellID) {
        return cellID % Board.TILE_QUANTITY;
    }

    static getYFromIndex(cellID) {
        return Math.floor(cellID / Board.TILE_QUANTITY);
    }

    getCellDOM(cellID) {
        return this.dom.find(".cell_" + cellID);
    }

    isOutOfBound(x, y) {
        return x >= Board.TILE_QUANTITY ||
            y >= Board.TILE_QUANTITY ||
            x < 0 ||
            y < 0
    }

    isOccupied(cellID) {
        return this.blocks[cellID] !== null;
    }

    /**
     * Create a new block on board (ex, from inventory)
     * @param type String the type of block to create
     * @param x Int
     * @param y Int
     */
    addBlock(type, x, y) {
        let block = BlockFactory.getBlock(type);
        if( block === null)
            return;
        block.setPosition(x, y);
        this.blocks[block.getCellID()] = block;
        this.setOccupied(block);
        let blockHTML = block.constructor.drawBlock(0);
        this.dom.find(block.getCellClass()).append(blockHTML);
    }

    /**
     * set .occupied class on cell which is actually occupied
     * (usefull especialy with specials shaped blocs)
     * @param   block {Block}
     * **/
    setOccupied(block) {
        let coordX, coordY, cells, shape, origin;
        cells = [];
        shape = block.getShape();
        origin = block.getOrigin();

        // for special shapes blocks
        for (let shapeY = 0; shapeY < shape.length; shapeY++) {
            for (let shapeX = 0; shapeX < shape.length; shapeX++) {
                coordX = origin.x + shapeX;
                coordY = origin.y + shapeY;
                cells.push(this.getCellDOM(Board.getIdFromCoord(coordX, coordY)));
            }
        }
        $.each(cells, (i, cell) => $(cell).addClass('occupied'));
    }

    /**
     * remove .occupied class on cell when remove or move objexts on board
     * (usefull especialy with specials shaped blocs)
     * @param   block {Block}
     * **/
    removeOccupied(block) {
        let coordX, coordY, cells, shape, origin;

        cells = [];
        shape = block.getShape();
        origin = block.getOrigin();

        // for special shapes blocks
        for (let shapeY = 0; shapeY < shape.length; shapeY++) {
            for (let shapeX = 0; shapeX < shape.length; shapeX++) {
                coordX = origin.x + shapeX;
                coordY = origin.y + shapeY;
                cells.push(this.getCellDOM(Board.getIdFromCoord(coordX, coordY)));
            }
        }
        $.each(cells, (i, cell) => $(cell).removeClass('occupied'));
    }

    removeBlock(blockID) {
        this.blocks[blockID] = null;
    }

    /**
     * Change block position on board and coordinate in the instance
     * @param blockID Int the id of block
     * @param newX  Int
     * @param newY Int
     */
    moveBlock(blockID, newX, newY) {
        let block = this.blocks[blockID];
        this.removeOccupied(block);
        block.setPosition(newX, newY);
        this.blocks[blockID] = null;
        this.blocks[block.getCellID()] = block;
        this.setOccupied(block)
    }

    /** build board and cells at init() */
    drawBoard(selector) {
        let table = $('<table>').attr('id', selector);
        let cellID = 0;
        let tileY;
        let tileX;
        let tr;

        for (tileY = 0; tileY < Board.TILE_QUANTITY; tileY++) {
            tr = $('<tr>');
            for (tileX = 0; tileX < Board.TILE_QUANTITY; tileX++) {
                tr.append($('<td>')
                    .data('x', tileX)
                    .data('y', tileY)
                    .data('id', cellID)
                    .addClass('cell_' + cellID)
                );
                cellID++;
            }
            table.append(tr)
        }
        $('#' + selector).replaceWith(table);
        this.dom = $('#' + selector);
    };

    /**
     * prepare path for Lee Pathfinder,
     */
    getMatrix() {
        if (this.matrix.length > 0)
            return this.matrix;

        this.matrix = new Array(Board.TILE_QUANTITY * Board.TILE_QUANTITY);

        let block, shape, origin, coordX, coordY;

        for (let index = 0; index < this.board.blocks.length; index++) {
            block = this.board.blocks[index];
            let x = Board.getXFromIndex(index);
            let y = Board.getYFromIndex(index);

            if (!block) {
                // set empty cells;
                this.matrix[x] = this.matrix[x] || [];
                this.matrix[x][y] = 0;
                continue;
            }
            origin = block.getOrigin();
            shape = block.getShape();
            for (let shapeY = 0; shapeY < shape.length; shapeY++) {
                for (let shapeX = 0; shapeX < shape.length; shapeX++) {
                    coordX = origin.x + shapeX;
                    coordY = origin.y + shapeY;

                    if (!this.matrix[coordX]) this.matrix[coordX] = [];

                    this.matrix[coordX][coordY] = -1
                }
            }
        }
        return this.matrix;
    }

    colorPath(path) {

        for (let index = 0; index < path.length; index++) {
            this.getCellDOM(Board.getIdFromCoord(path[index][0], path[index][1])).addClass("path");
        }
    }

    getPath(x1, y1, x2, y2) {
        return Lee.getPath(this.getMatrix(), x2, y2, x1, y1);
    }

}
Board.TILE_QUANTITY = 20;
Board.TILE_SIZE = 40;
