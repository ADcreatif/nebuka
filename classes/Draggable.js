"use strict";

class Draggable {

    constructor(inventory, board) {
        this.inventory = inventory;
        this.board = board;
        this.draggable = '[draggable]';
        this.droppable = '#edit-board td,#inventory';
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
        let blockID = parseInt(blockDOM.parent().data('id'));
        let blockType = blockDOM.data('type');
        let x = target.data('x');
        let y = target.data('y');

        this.clearHelpers();

        if (!this.canDropHere(blockType, x, y)) {
            return false;
        }

        if (target.is('#inventory')) {
            // board -> inventory
            this.board.removeBlock(blockID);
            blockDOM.parent().empty();
            this.inventory.addBlock(blockType);
            this.inventory.displayInventory();
            this.setDraggable(this.draggable);

        } else if (blockDOM.parent().is('#inventory')) {
            // inventory -> board
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
        $.each(this.hoverCells, (i, cell) => cell.removeClass('hoverBusy hoverFree'));
        this.hoverCells = [];
    }

    canDropHere(blockType, targetX, targetY, display) {
        let cellDom, checkingX, checkingY, cellID, domClass, fakeBlock, shape, origin;

        display = display || false;
        let isOccupied = false;
        let outOfBound = false;

        this.clearHelpers();

        // create fake block
        fakeBlock = BlockFactory.getBlock(blockType);
        shape = fakeBlock.getShape();
        fakeBlock.setPosition(targetX, targetY);
        origin = fakeBlock.getOrigin();

        for (let y = 0; y < shape.length; y++) {
            for (let x = 0; x < getBiggestArraySize(shape); x++) {
                checkingX = origin.x + x;
                checkingY = origin.y + y;

                cellDom = this.board.getCellDOM(Board.getIdFromCoord(checkingX, checkingY));

                console.log(cellDom);

                if (this.board.isOutOfBound(checkingX, checkingY))
                    outOfBound = true;
                else
                    this.hoverCells.push(cellDom);

                if (cellDom.hasClass('occupied') || outOfBound)
                    isOccupied = true;

            }
        }
        if (display) {
            domClass = isOccupied ? 'hoverBusy' : 'hoverFree';
            $.each(this.hoverCells, (i, cell) => cell.addClass(domClass));
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