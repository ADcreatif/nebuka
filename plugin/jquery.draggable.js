"use strict";

(function($) {
    $.fn.draggable = function(opt){

        let defaults;
        let drag;

        // ************************* INIT PLUGIN **************************//
        defaults = {
            draggable : '[draggable]',
            droppable : '#edit-board td,#toolbox',
            board     : $('#edit-board'),
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

            // if nothing is dragged || place is the same || tile  is drappable || tile is not empty
            if(drag.length === 0 || $(this).is(drag.source) || !$(this).is(opt.droppable) || ($(this).is('td')  && $(this).children().length ))
                return false;

            let x = $(event.target).data('x');
            let y = $(event.target).data('y');
          
            if(!drag.item.parent().is("td")){
                let type = $(drag.item).data('type');
                board.addBlock(type, x, y);
                inventory.removeBlock(type, 1);
                inventory.displayInventory();
                  
            } else {
                board.moveBlock(drag.item.parent().attr('id'), x, y);
                $(event.target).append(drag.item.clone(true));
                drag.item.remove();
            }

            drag = {};

        }

        function canDropHere(type,dropX,dropY){
            let shape = type.getShape();
            let coordX,coordY;
            let isFree = true;

            for(let x = 0; x < shape; x++){
                if(shape.hasOwnProperty(x)){
                    for(let y = 0; y < shape; y++){
                        coordX = dropX + x;
                        coordY = dropY + y;
//console.log('case:'+ shape[x][y]  )
                        if(shape[x][y] == 1 && $('#'+Board.getIdFromCoord()).children().length){
                            isFree = false;
                        }
                    }
                }
            }
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



































