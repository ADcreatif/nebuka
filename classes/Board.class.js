/**
 * Created by Alan on 06/10/2017.
 */

"use strict";

class Board {

    constructor() {
        this.board = $('#edit-board');
        this.blocks = [];

        this.drawBoard();
        this.initBoard();
    }

    static getSize() {
        return 22;
    }

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

    static coordToID(x, y) {
        return y * Board.getSize() + x;
    }

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

    moveBlock(blockID, newX, newY) {
        let block =  this.blocks[blockID];
        block.setPosition(newX, newY);
        this.blocks[blockID] = null;
        this.blocks[block.getCellId()]  = block;
    }

    initBoard() {
        for (let i in inBoard) {
            if (inBoard.hasOwnProperty(i)) {
                this.addBlock(inBoard[i].type, inBoard[i].x, inBoard[i].y);
            }
        }
    }
}


// IDToCoord(id){
//     let y = parseInt(id / this.size);
//     let x = parseInt(id % this.size);
//     return {x:x, y:y}
// }
