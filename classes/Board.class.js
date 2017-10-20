/**
 * Created by Alan on 06/10/2017.
 */

"use strict";

class Board {

    constructor() {
        this.board = $('#board');
        this.blocks = [];

        this.drawBoard();
        this.initBoard();
    }

    static getSize() {
        return 30;
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

                cellID++
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
        if( block == null)
            return;
        let display = block.constructor.drawBlock(0);
        this.blocks[ Board.coordToID(x, y)] = block;
        $('#' + Board.coordToID(x, y)).append(
            display
        );
    }

    moveBlock(blockID, newX, newY) {
        console.log(this.blocks);
        console.log(blockID);
        let block =  this.blocks[blockID];
       block.setPosition(newX, newY);
        this.blocks[blockID] = null;
        this.blocks[Board.coordToID(newX,newY)]  = block;
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
