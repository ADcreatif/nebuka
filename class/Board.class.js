/**
 * Created by Alan on 06/10/2017.
 */

"use strict";

class Board {

    constructor() {
        /**
         * the DOM element containing <table> and cells
         * @type {*}
         */
        this.board = $('#edit-board');

        /**
         * the cell list by instance
         * @type {Array}
         */
        this.blocks = [];

        this.drawBoard();
        this.initBoard();
    }

    static getSize() {
        return 22;
    }

    static getIdFromCoord(x, y) {
        return y * Board.getSize() + x;
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

        this.blocks[block.getCellId()] = block;

        $('#' + block.getCellId()).append(
            block.constructor.drawBlock(0)
        );
    }

    /**
     * Change block position on board and coordinate in the instance
     * @param blockID Int the id of block
     * @param newX  Int
     * @param newY Int
     */
    moveBlock(blockID, newX, newY) {
        let block =  this.blocks[blockID];
        block.setPosition(newX, newY);
        this.blocks[blockID] = null;
        this.blocks[block.getCellId()]  = block;
    }

    /**
     * fill board with tiles at init
     */
    initBoard() {
        for (let i in inBoard) {
            if (inBoard.hasOwnProperty(i)) {
                this.addBlock(inBoard[i].type, inBoard[i].x, inBoard[i].y);
            }
        }
    }

    /**
     * build board and cells at init()
     */
    drawBoard() {
        let table = $('<table>');
        let cellID = 0;
        let tileY = 0;
        let tileX;
        let tr;

        for (tileY; tileY < Board.getSize(); tileY++) {
            tr = $('<tr>');
            tileX = 0;
            for (tileX; tileX < Board.getSize(); tileX++) {
                tr.append($('<td>')
                    .data('x', tileX)
                    .data('y', tileY)
                    .attr('id', cellID)
                );
                cellID++;
            }
            table.append(tr)
        }
        this.board.append(table);
    };
}


// IDToCoord(id){
//     let y = parseInt(id / this.size);
//     let x = parseInt(id % this.size);
//     return {x:x, y:y}
// }
