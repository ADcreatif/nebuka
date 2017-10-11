/**
 * Created by Alan on 06/10/2017.
 */
"use strict";

let inStorage = [
    {type : Block.WALL, material : Block.WOOD, quantity:10},
    {type : Block.WALL, material : Block.STEEL, quantity:4},
    {type : Block.WALL, material : Block.STONE, quantity:5},
    {type : Block.TOWER, material : Block.WOOD, quantity:5},
];

let inBoard = [
    {type : Block.WALL, material: Block.WOOD, x: 2, y: 3},
    {type : Block.WALL, material: Block.WOOD, x: 4, y: 9},
    {type : Block.WALL, material: Block.STEEL, x: 1, y: 1}
];

let board;
let inventory;

$(function(){
    board =  new Board();

    inventory =  new Inventory();
    inventory.displayInventory();

    $('[draggable]').draggable();

    // TODO : remove test interface
    $('#shitTest').find('button').click(function(){
        let quantity = parseInt($('#quantity').val());

        if($(this).data('increment') !== undefined)
            inventory.addBlock($(this).data('type'),$(this).data('material'), quantity);
        else
            inventory.removeBlock($(this).data('type'),$(this).data('material'), quantity);
        inventory.displayInventory()
    });

});

