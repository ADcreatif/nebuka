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
        this.blocks = [];

        this.init();
    }

    init() {
        this.dom = this.drawBoard('edit-board');

        /** fill board with tiles at init **/
        for (let i in inBoard) {
            if (inBoard.hasOwnProperty(i)) {
                this.addBlock(inBoard[i].type, inBoard[i].x, inBoard[i].y);
            }
        }
    }

    static getSize() {
        return Board.TILE_SIZE;
    }

    static getIdFromCoord(x, y) {
        return y * Board.getSize() + x;
    }

    static getXFromIndex(cellID) {
        return cellID % Board.getSize();
    }

    static getYFromIndex(cellID) {
        return Math.floor(cellID / Board.getSize());
    }

    getCellDOM(cellID) {
        return this.dom.find("#" + cellID);
    }

    isOutOfBound(x, y) {
        return x >= Board.getSize() ||
            y >= Board.getSize() ||
            x < 0 ||
            y < 0
    }

    isOccupied(cellID) {
        return this.getCellDOM(cellID).hasClass('occupied');
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

        $('#' + block.getCellID()).append(
            block.constructor.drawBlock(0)
        );
    }

    /**
     * set .occupied class on cell which is actually occupied
     * (usefull especialy with specials shaped blocs)
     * @param   block {Block}
     * **/
    setOccupied(block) {
        let coordX, coordY, shape, cells, cell, origin, shapeX, shapeY;

        // for one size blocks
        if (block.numberOfCell() === 1) {
            this.getCellDOM(block.getCellID()).addClass('occupied');
            return;
        }

        shape = block.getShape();
        origin = block.getOrigin();
        cells = [];

        // for biggers blocks
        for (shapeY = 0; shapeY < shape.length; shapeY++) {
            for (shapeX = 0; shapeX < shape.length; shapeX++) {
                coordX = origin.x + shapeX;
                coordY = origin.y + shapeY;
                cell = '#' + Board.getIdFromCoord(coordX, coordY);

                cells.push(cell);
            }
        }
        $(cells.toString()).addClass('occupied')
    }

    /**
     * remove .occupied class on cell when remove or move objexts on board
     * (usefull especialy with specials shaped blocs)
     * @param   block {Block}
     * **/
    removeOccupied(block) {
        let coordX, coordY, shape, cells, origin, shapeX, shapeY;

        // for one size blocks
        if (block.numberOfCell() === 1) {
            $('#' + Board.getIdFromCoord(block.x, block.y)).removeClass('occupied');
            return;
        }

        shape = block.getShape();
        origin = block.getOrigin();
        cells = [];

        // for biggers blocks
        for (shapeY = 0; shapeY < shape.length; shapeY++) {
            for (shapeX = 0; shapeX < shape.length; shapeX++) {
                coordX = origin.x + shapeX;
                coordY = origin.y + shapeY;
                cells.push('#' + Board.getIdFromCoord(coordX, coordY));
            }
        }
        $(cells.toString()).removeClass('occupied');
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
        let block =  this.blocks[blockID];

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

        for (tileY = 0; tileY < Board.getSize(); tileY++) {
            tr = $('<tr>');
            for (tileX = 0; tileX < Board.getSize(); tileX++) {
                tr.append($('<td>')
                    .data('x', tileX)
                    .data('y', tileY)
                    .attr('id', cellID)
                );
                cellID++;
            }
            table.append(tr)
        }
        $('#' + selector).replaceWith(table);
        return table;
    };



}

Board.TILE_SIZE = 20;
