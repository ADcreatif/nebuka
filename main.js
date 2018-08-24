"use strict";
let board;
let gameLoop;
let l = s => {
    s = s || 'test';
    console.log(s)
};

$(function () {

    let game, dragBloc;

    game = new Game();
    game.start();

    game.startInterval();

    dragBloc = new Draggable(game.inventory, game.board);
    dragBloc.startDrag();


    /*----------------------------------------
     TOOLBOX at right of screen display
     ----------------------------------------*/
    $('#GUI').find('.accordion').accordion({
        collapsible: true,
        event: "click tap",
        heightStyle: "fill"
    });
    $('#GUI').hover(function () {
        $('#GUI').removeClass('collapsed');
    }).mouseleave(function () {
        $('#GUI').addClass('collapsed');
    });
    $('#GUI-TOGGLE').click(function () {
        $('#GUI').toggleClass('pinned');
    });

    // start Night
    $('#start-night').click(game.startNight.bind(game));



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
    });

    /************************************************************
     *
     *           -------       DEBUG        -------
     *
     ************************************************************/
    $('#edit-board').mousemove(function (event) {
        let x = event.clientX - event.currentTarget.offsetLeft;
        let y = event.clientY - event.currentTarget.offsetTop;
        $('#mousecoord').val('x:' + x + ' y:' + y);
    });

    $('#edit-board').find('td').hover(function () {
        $('#mousecell').val('x:' + $(this).data('x') + ' y:' + $(this).data('y'))
    });

    $('#export-board').on('click', function () {
        game.renderBoard.exportBoard(true)
    });
});

