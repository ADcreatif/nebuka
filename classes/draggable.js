/**
 * Created by Alan on 06/10/2017.
 */

"use strict";

(function($) {
    $.fn.draggable = function(options){

        let defaults = {
            draggable_items : '[draggable]',
            droppable_items : 'td,#toolbox'
        };

        let settings = $.extend( {}, defaults, options );

        $(this).each(function(){
            setDragableItem(this);
        });
        setDropZones();

        let movingItem = null;
        let clone= null;


        // STARTDRAG
        function onDragItem(event){
            movingItem = this;

            //event.originalEvent.dataTransfer.effectAllowed = 'move';
            clone = $(this).clone();
            $(this).addClass('dragElem');

        }

        // STOPDRAG
        function onDropItem() {
            $(this).removeClass('dragElem')
                .parent(settings.droppable_items).empty();
        }


        function onOverDroppable(event){
            //if (event.preventDefault) {
            event.preventDefault(); // Necessary. Allows us to drop.
            //}

            //event.originalEvent.dataTransfer.dropEffect = 'move';  // See the section on the DataTransfer object.

            return false;
        }

        // visuel sur les éléments survolés
        function onEnterDroppable() {$(this).addClass('over');}
        function onLeaveDroppable() {$(this).removeClass('over');}

        function onDropDroppable(event) {
            // la cible du drop

            if (event.stopPropagation) {
                event.stopPropagation(); // Stops some browsers from redirecting.
            }

            if (movingItem != this) {
                $(this).append(clone);
            }

            this.classList.remove('over');
            setDragableItem(clone);

            clone = null;
            return false;
        }



        function setDragableItem(target){
            $(target).on('dragstart', onDragItem)
                     .on('dragend', onDropItem);
        }

        function setDropZones(){
            $(settings.droppable_items)
                .on('dragenter', onEnterDroppable)
                .on('dragover', onOverDroppable)
                .on('dragleave', onLeaveDroppable)
                .on('drop', onDropDroppable);
        }
        return this;
    };
})(jQuery);



































