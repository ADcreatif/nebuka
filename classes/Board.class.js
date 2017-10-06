/**
 * Created by Alan on 06/10/2017.
 */


"use strict";

class Board {


    constructor(){
        this.board = $('#board');
    }


    drawBoard() {
        let size = 40;
        let table = $('<table>');
        let tr;
        let td;

        for (let tileX = 0; tileX < size; tileX++) {

            tr = $('<tr>');

            for (let tileY = 0; tileY < size; tileY++) {
                td = $('<td>').data('x', tileX).data('y', tileX);
                tr.append(td);
            }
            table.append(tr)
        }

        this.board.append(table);

    };
}




