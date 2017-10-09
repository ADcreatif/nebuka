/**
 * Created by Alan on 06/10/2017.
 */

"use strict";

class Board {

    constructor(){
        this.board = $('#board');
        this.size = 30;

        this.drawBoard();
        this.drawBlocks();
    }

    drawBoard() {
        let table = $('<table>');
        let cellID = 0;
        let tileY = 0;
        let tileX;
        let tr;

        for (tileY ; tileY < this.size; tileY++) {

            tr = $('<tr>');
            tileX = 0;

            for (tileX; tileX < this.size; tileX++) {
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

    coordToID(x,y){
        return y * this.size + x;
    }

    drawBlocks(){
        $.each(inBoard, function(e,item){

            let cellID = this.coordToID(item.x,item.y);

            let bloc = new Bloc(item.type, item.level);
            bloc.addBoardInfos(item.blocID);

            $('#cellID_'+cellID).append(bloc.drawBlock());

        }.bind(this));
    }
}




