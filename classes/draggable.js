/**
 * Created by Alan on 06/10/2017.
 */

"use strict";

(function($) {
    $.fn.dragable = function(options){

        let defaults = {
            dragable_items : '[draggable]',
            dropable_items : 'td,#toolbox'
        };

        let settings = $.extend( {}, defaults, options );

        init();


        let movingItem = null;
        let clone;

        function handleDragStart(event){
            // Target (this) element is the source node.
            movingItem = this;

            event.originalEvent.dataTransfer.effectAllowed = 'move';
            clone = $(this).clone();
            $(this).addClass('dragElem');
        }

        function handleDragOver(event){
            //if (event.preventDefault) {
            event.preventDefault(); // Necessary. Allows us to drop.
            //}

            event.originalEvent.dataTransfer.dropEffect = 'move';  // See the section on the DataTransfer object.

            return false;
        }

        // les éléments survolés
        function handleDragEnter(e) {$(this).addClass('over');}
        function handleDragLeave(e) {$(this).removeClass('over');}

        function handleDrop(event) {
            // la cible du drop

            if (event.stopPropagation) {
                event.stopPropagation(); // Stops some browsers from redirecting.
            }

            if (movingItem != this) {
                $(this).append(clone);
            }
            this.classList.remove('over');
            return false;
        }

        function handleDragEnd(e) {
            // l'élément déplacé
            $(this).removeClass('drag-elem');
            $(this).parent('td').empty();
        }


        function setDragableItem(target){
            target.on('dragstart', handleDragStart);
            target.on('dragend', handleDragEnd);
        }

        function setDropableZones(target){
            $(document).on('dragenter','td', handleDragEnter);
            $(document).on('dragover','td', handleDragOver);
            $(document).on('dragleave','td', handleDragLeave);
            $(document).on('drop','td', handleDrop);
        }

        function init(this){

        }

        return this;
    };
})(jQuery);



































