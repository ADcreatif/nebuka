/**
 * Created by Alan on 06/10/2017.
 */
"use strict";

let inStorage = [
    {type:Block.WOOD, level : 0, quantity:10},
    {type:Block.STONE, level : 1, quantity:4},
    {type:Block.TOWER, level : 0, quantity:5},
    {type:Block.STEEL, level : 0, quantity:5},
];

let inBoard = {
    6: {type: 'wall', level: 1, x: 2, y: 3, blocID: 6},
    3: {type: 'wall', level: 1, x: 4, y: 9, blocID: 3},
    1: {type: 'wall', level: 0, x: 21, y: 5, blocID: 1}
};

let board;
let toolbox;

$(function(){
    board =  new Board();

    toolbox =  new Toolbox();
    toolbox.displayToolBox();

    $('[draggable]').draggable();

    // TODO : remove test interface

    $("#minusWood").click(function()
    {
        let quantity = parseInt($('#quantity').val());
        toolbox.removeBlock(Block.WOOD, quantity,0);
    });

    $("#plusWood").click(function()
    {
        let quantity = parseInt($('#quantity').val());
        toolbox.addBlock(Block.WOOD, quantity,0);
    });

    $("#minusTower").click(function()
    {
        let quantity = parseInt($('#quantity').val());
        toolbox.removeBlock(Block.TOWER, quantity,0);
    });

    $("#plusTower").click(function()
    {
        let quantity = parseInt($('#quantity').val());
        toolbox.addBlock(Block.TOWER, quantity,0);
    });

    $("#minusStone").click(function()
    {
        let quantity = parseInt($('#quantity').val());
        toolbox.removeBlock(Block.STONE, quantity,0);
    });

    $("#plusStone").click(function()
    {
        let quantity = parseInt($('#quantity').val());
        toolbox.addBlock(Block.STONE, quantity,0);
    });
});

