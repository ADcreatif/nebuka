/**
 * Created by Alan on 06/10/2017.
 */
"use strict";
let board;
let l = log => console.log(log);

$(function () {

    let game = new Game();
    game.start();

    let dragBloc = new Draggable(game.inventory, game.board);
    dragBloc.startDrag();

    $('#GUI').accordion({
        collapsible: true,
        event: "click tap",
        heightStyle: "content"
    });

    $('#toggle-render').click(function () {
        if ($(this).text() === 'Start') {
            game.renderBoard.startRender();
            $(this).text('Stop');
        } else {
            game.renderBoard.stopRender();
            $(this).text('Start');
        }
    });
    $('#export-board').on('click', function () {
        game.renderBoard.exportBoard(true)
    });

    // init stock
    $('#wall_wood_inv').val(game.inventory.getBlockQuantity(Block.WOOD_WALL));
    $('#wall_stone_inv').val(game.inventory.getBlockQuantity(Block.STONE_WALL));
    $('#tower_wood_inv').val(game.inventory.getBlockQuantity(Block.WOOD_TOWER));

    $('#block_debug').find('input').change(function () {
        game.inventory.setBlockQuantity($(this).data('type'), $(this).val());
        game.inventory.displayInventory()
    });

    $('#ressource_debug').find('input').change(function () {
        game.resources.setResourceQuantity($(this).data('type'), $(this).val());
        game.resources.displayResources();
    });

    // skill learning events


    $("body").on("click", ".learn", function () {
        let charId = $(this).data("char_id");
        let skillId = $(this).data("skill_id");
        game.learnSkill(charId, skillId);
        game.displayCharactersStats();
    });

    // exploration

    $("body").on("click", ".explore", function () {
        let charId = $(this).data("char_id");

        game.doExploration(charId);
        game.updateDisplay();
    })

});

