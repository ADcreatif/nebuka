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
                    .attr('id', 'cellID_' + cellID)
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
        this.blocks.push(BlockFactory.getBlock(type));
        $('#cellID_' + Board.coordToID(x, y)).append(
            BlockFactory.getBlock(type, true).data('id',this.blocks.length-1)
        );
    }

    moveBlock(blockID, newX, newY) {
        this.blocks[blockID].setPosition(newX, newY);
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
