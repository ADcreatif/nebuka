/**
 * Created by Alan on 06/10/2017.
 */
"use strict";

let inStorage = [
    {type : Block.WOOD_WALL, quantity:10},
    {type : Block.STONE_WALL, quantity:4},
    {type : Block.STEEL_WALL,  quantity:5},
    {type : Block.WOOD_TOWER, quantity:5},
];


let inBoard = [{"type":1,"material":3,"x":1,"y":1},{"type":2,"material":1,"x":2,"y":1},{"type":3,"material":1,"x":1,"y":2},{"type":1,"material":1,"x":7,"y":2},{"type":1,"material":1,"x":14,"y":2},{"type":1,"material":1,"x":5,"y":3},{"type":1,"material":1,"x":6,"y":3},{"type":1,"material":1,"x":7,"y":3},{"type":1,"material":1,"x":8,"y":3},{"type":1,"material":1,"x":12,"y":3},{"type":1,"material":1,"x":13,"y":3},{"type":1,"material":1,"x":14,"y":3},{"type":1,"material":1,"x":15,"y":3},{"type":1,"material":1,"x":17,"y":3},{"type":1,"material":1,"x":18,"y":3},{"type":1,"material":1,"x":20,"y":3},{"type":1,"material":1,"x":5,"y":4},{"type":1,"material":1,"x":8,"y":4},{"type":1,"material":1,"x":9,"y":4},{"type":1,"material":1,"x":11,"y":4},{"type":1,"material":1,"x":12,"y":4},{"type":1,"material":1,"x":14,"y":4},{"type":1,"material":1,"x":18,"y":4},{"type":1,"material":1,"x":20,"y":4},{"type":1,"material":1,"x":5,"y":5},{"type":1,"material":1,"x":6,"y":5},{"type":1,"material":1,"x":7,"y":5},{"type":1,"material":1,"x":8,"y":5},{"type":1,"material":1,"x":14,"y":5},{"type":1,"material":1,"x":18,"y":5},{"type":1,"material":1,"x":19,"y":5},{"type":1,"material":1,"x":20,"y":5},{"type":1,"material":1,"x":5,"y":6},{"type":1,"material":1,"x":19,"y":6},{"type":1,"material":1,"x":5,"y":7},{"type":1,"material":1,"x":6,"y":7},{"type":1,"material":1,"x":8,"y":7},{"type":1,"material":1,"x":9,"y":7},{"type":1,"material":1,"x":10,"y":7},{"type":1,"material":1,"x":11,"y":7},{"type":1,"material":1,"x":12,"y":7},{"type":1,"material":1,"x":13,"y":7},{"type":1,"material":1,"x":14,"y":7},{"type":1,"material":1,"x":15,"y":7},{"type":1,"material":1,"x":16,"y":7},{"type":1,"material":1,"x":17,"y":7},{"type":1,"material":1,"x":18,"y":7},{"type":1,"material":1,"x":19,"y":7},{"type":1,"material":1,"x":4,"y":9}];

let board;
let inventory;
let l = log=>console.log(log);

$(function(){

    board =  new Board();

    inventory =  new Inventory();
    inventory.displayInventory();

    $('[draggable]').draggable();

    let renderBoard = new RenderBoard();

    let resources = new ResourceStock($("#resources"));

    // TODO : remove test interface
    resources.addWood(2);
    resources.addSteel(3);
    resources.addStone(225);
    resources.displayResources();
    $('#toggle-render').click(function(){
        if($(this).text() === 'Start'){
            renderBoard.startRender();
            $(this).text('Stop');
        } else {
            renderBoard.stopRender();
            $(this).text('Start');
        }
    });
    $('#export-board').on('click', function(){renderBoard.exportBoard(true)});


    $('#shitTest').find('button').click(function(){
        let quantity = parseInt($('#quantity').val());

        if($(this).data('increment') !== undefined)
            inventory.addBlock($(this).data('type'),$(this).data('material'), quantity);
        else
            inventory.removeBlock($(this).data('type'),$(this).data('material'), quantity);
        inventory.displayInventory()
    });

    $('#shitTest2').find('button').click(function()
    {
        if($(this).data('increment') !== undefined)
            resources.addResource($(this).data('type'), $("#resource_quantity").val());
        else
            resources.removeResource($(this).data('type'), $("#resource_quantity").val());

        resources.displayResources();

    });

});

