/**
 * Created by Alan on 06/10/2017.
 */
"use strict";

$(function(){
    let board =  new Board();
    board.drawBoard();

    let toolbox =  new Toolbox();
    toolbox.drawToolBox();

    $('[draggable]').draggable();

});