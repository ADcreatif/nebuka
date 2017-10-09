/**
 * Created by Alan on 06/10/2017.
 */

"use strict";

(function($) {
    $.fn.draggable = function(options){

        let defaults;
        let dragInfos;

        // ************************* INIT PLUGIN **************************//
        defaults = {
            draggable : '[draggable]',
            droppable : '#board td,#toolbox',
            board     : $('#board'),
            storage   : $('#toolbox')
        };

        options = $.extend( {}, defaults, options );

        $(this).each(function(){
            setDragableItem(this);
        });
        setDropZones();

        // *********************** ## INIT PLUGIN ************************//

        // STARTDRAG
        function onDragItem(){
            dragInfos = {
                item : $(this),
                source : $(this).parent(),
                clone : $(this).clone(true)
            };

            $(this).addClass('dragElem');

        }

        // STOPDRAG
        function onDropItem() {
            $(this).removeClass('dragElem');
            return false;
        }


        function onDragover(){return false;}
        function onDragenter() {$(this).addClass('over');return false;}
        function onDragleave() {$(this).removeClass('over');return false;}

        function onDrop() {
            // la cible du drop

            if($(this).is(dragInfos.source)){
                // droped at same place
                console.log('same place');
                return false;

            } else if ($(this).is(options.storage)) {
                // drop on storage
                console.log('drop on storage');
                let blocID = parseInt(dragInfos.clone.data('blocID'));
                let blockInfos = inBoard[blocID];
                toolbox.addBlock(blockInfos.type, blockInfos.level).refreshToolBox();

            } else if ($.contains(options.board[0], this) && $(this).children().length === 0) {
                // drop on board
                console.log('drop on board');
                $(this).append(dragInfos.clone);
                //setDragableItem(dragInfos.clone);
            } else {
                console.log("dropped somwhere over the rainbow")
            }

            $(dragInfos.source).parent(options.droppable).empty();
            $(this).removeClass('over');

            return false;
        }



        function setDragableItem(target){
            $(target).on('dragstart', onDragItem)
                     .on('dragend', onDropItem);
        }

        function setDropZones(){
            $(options.droppable)
                .on('dragenter', onDragenter)
                .on('dragover', onDragover)
                .on('dragleave', onDragleave)
                .on('drop', onDrop);
        }
        return this;
    };
})(jQuery);



































