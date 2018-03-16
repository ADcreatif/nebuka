"use strict";

class Draggable {

    constructor(inventory, board) {
        this.inventory = inventory;
        this.board = board;
        this.draggable = '[draggable]';
        this.droppable = '#edit-board td,#toolbox';
        this.hoverCells = [];

    }

    onStartDrag(event, ui) {
    }

    onDrag(event, ui) {
    }

    onHover(event, ui) {
        if ($(event.target).is('td')) {
            let x = $(event.target).data('x');
            let y = $(event.target).data('y');
            let blockType = $(ui.draggable).data('type');
            this.canDropHere(blockType, x, y, true);
        }
    }

    onDrop(event, ui) {
        let target = $(event.target);
        let blockDOM = $(ui.draggable);
        let blockID = parseInt(blockDOM.parent().attr('id'));
        let blockType = blockDOM.data('type');
        let x = target.data('x');
        let y = target.data('y');


        this.clearHelpers();

        if (!this.canDropHere(blockType, x, y)) {
            return false;
        }

        if (target.is('#toolbox')) {
            // board -> toolbox
            this.board.removeBlock(blockID);
            blockDOM.parent().empty();
            this.inventory.addBlock(blockType);
            this.inventory.displayInventory();
            this.setDraggable(this.draggable);

        } else if (blockDOM.parent().is('#toolbox')) {
            // toolbox -> board
            this.board.addBlock(blockType, x, y);
            this.inventory.removeBlock(blockType, 1);
            this.inventory.displayInventory();
            this.setDraggable(this.draggable);
        } else {
            // board -> board
            this.board.moveBlock(blockID, x, y);
            blockDOM.appendTo(target);
        }

    }

    /** remove helpers on hovered classes **/
    clearHelpers() {
        $(this.hoverCells.toString()).removeClass('hoverBusy hoverFree');
        this.hoverCells = [];
    }

    canDropHere(blockType, targetX, targetY, display) {
        let cellDom, checkingX, checkingY, cellID, domClass;

        display = display || false;
        let isOccupied = false;
        let outOfBound = false;

        this.clearHelpers();

        let block = BlockFactory.getBlock(blockType);
        let shape = block.getShape();
        block.setPosition(targetX, targetY);
        let origin = block.getOrigin();

        for (let y = 0; y < shape.length; y++) {
            for (let x = 0; x < getBiggestArraySize(shape); x++) {
                checkingX = origin.x + x;
                checkingY = origin.y + y;

                cellID = Board.getIdFromCoord(checkingX, checkingY);
                cellDom = $('#' + cellID);

                if (this.board.isOutOfBound(checkingX, checkingY)) {
                    outOfBound = true;
                } else {
                    this.hoverCells.push('#' + cellID);
                }
                if (this.board.isOccupied(cellID) || outOfBound) {
                    isOccupied = true;
                }
            }
        }
        if (display) {
            domClass = isOccupied ? 'hoverBusy' : 'hoverFree';
            $(this.hoverCells.toString()).addClass(domClass);
        }
        return !isOccupied;
    }

    setDraggable(target) {
        $(target).draggable({
            //snap: this.droppable,
            helper: 'clone',
            start: this.onStartDrag.bind(this),
            drag: this.onDrag.bind(this)
        });
    }

    startDrag() {
        this.setDraggable(this.draggable);

        $(this.droppable).droppable({
            accept: this.draggable,
            hoverClass: "hoverFree",
            drop: this.onDrop.bind(this),
            over: this.onHover.bind(this),
            greedy: true
        });
    }
}