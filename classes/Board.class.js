/**
 * Created by Alan on 06/10/2017.
 */

"use strict";

class Board {

    constructor(){
        this.board = $('#board');

        this.drawBoard();
        Board.drawBlocks();
    }

    static getSize(){
        return 30;
    }

    drawBoard() {
        let table = $('<table>');
        let cellID = 0;
        let tileY = 0;
        let tileX;
        let tr;

        for (tileY ; tileY < Board.getSize(); tileY++) {

            tr = $('<tr>');
            tileX = 0;

            for (tileX; tileX < Board.getSize(); tileX++) {
                tr.append($('<td>')
                    .data('x', tileX)
                    .data('y', tileY)
                    .attr('id', 'cellID_'+cellID)
                );

                cellID++
            }
            table.append(tr)
        }

        this.board.append(table);
    };

    // IDToCoord(id){
    //     let y = parseInt(id / this.size);
    //     let x = parseInt(id % this.size);
    //     return {x:x, y:y}
    // }

    static coordToID(x,y){
        return y * Board.getSize() + x;
    }

    static addBlock(type, material,x,y){
        let blockID = Board.storeBlock(type, material, x, y);
        Board.drawBlock(type, material, x, y, blockID);
    }

    static storeBlock(type, material, x, y,){
        let blockID = inBoard.length;
        inBoard.push({type:type, material:material, x:x, y:y, blockID : blockID});
        return blockID;
    }

    static updateBlock(blockID, newX, newY, material){
        for(let index in inBoard){
            if(inBoard.hasOwnProperty(index)){
                if(inBoard[index].blockID === blockID){
                    inBoard[index].blockID.x = newX;
                    inBoard[index].blockID.y = newY;
                    inBoard[index].blockID.material = material || inBoard[index].blockID.material;
                }
            }
        }
    }

    static drawBlock(type, material, x, y, blockID ){
        let cellID = Board.coordToID(x,y);
        let block = Board.getBlockDisplay(type, material, blockID);
        $('#cellID_'+cellID).append(block);
    }

    static getBlockDisplay(type, material, blockID){
        return BlockFactory.getBlockDisplay(type, material)
            .attr('id', 'blocID_' + blockID)
            .data('blockid', blockID);
    }

    static drawBlocks(){
        for(let i in inBoard){
            if(inBoard.hasOwnProperty(i)){
                Board.drawBlock(inBoard[i].type, inBoard[i].material, inBoard[i].x,inBoard[i].y, parseInt(i) );
            }
        }
    }
}




