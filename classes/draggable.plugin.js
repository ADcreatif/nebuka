/**
 * Created by Alan on 06/10/2017.
 */

"use strict";

(function($) {
    $.fn.draggable = function(opt){

        let defaults;
        let drag;

        // ************************* INIT PLUGIN **************************//
        defaults = {
            draggable : '[draggable]',
            droppable : '#board td,#toolbox',
            board     : $('#board'),
            inventory   : $('#toolbox')
        };

        drag = {};
        opt = $.extend( {}, defaults, opt );

        startDrag();
        // *********************** ## INIT PLUGIN ************************//



        function onDragItem(event){
            if(!event.target.draggable)
                return false;

            drag = {
                item : $(event.target),
                source : $(event.target).parent(),
            };
        }

        function onDragover(event){event.preventDefault();/*allow drop*/}
        function onDragenter(event) {if(drag.length)$(event.target).addClass('over')}
        function onDragleave(event) {$(event.target).removeClass('over')}

        function onDrop(event) {
            event.preventDefault();
            $(event.target).removeClass('over');

            // if nothing is dragged || place is not the same || tile is not empty
            if(drag.length === 0 || $(this).is(drag.source) || !$(this).is(opt.droppable) || ($(this).is('td') && $(this).children().length !== 0))
                return false;


            if(drag.item.data('blockid') === undefined){
                let type = drag.item.data('type');
                let material = drag.item.data('material');

                $(event.target).append(
                    Board.addBlock(type, material, $(event.target).data('x'), $(event.target).data('y'),
                ));
                inventory.removeBlock(type, material, 1);
                inventory.displayInventory();
            } else {
                $(event.target).append(drag.item.clone(true));
                drag.item.remove();
            }



           //
            drag = {};

/*
            // droped at same place
            if($(this).is(drag.source)){
                return false;

            // drop on inventory
            } else if ($(this).is(opt.inventory)) {
                let blocID = parseInt(drag.clone.data('blocID'));
                let blockInfos = inBoard[blocID];
                inventory.addBlock(blockInfos.type, blockInfos.material);

            // drop on board
            } else if ($.contains(opt.board[0], this) && $(this).children().length === 0) {
                if(drag.source.is(opt.inventory)){
                    inventory.removeBlock(
                        drag.clone.data('type'),
                        drag.clone.data('material')
                    );
                    inventory.displayInventory();
                }
            }

            */
        }

        function startDrag(){
            $(document).on('dragstart', '[draggable]', onDragItem);

            $(opt.droppable)
                .on('dragenter', onDragenter)
                .on('dragover', onDragover)
                .on('dragleave', onDragleave)
                .on('drop', onDrop);

        }
        return this;
    };
})(jQuery);



































