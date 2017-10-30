"use strict";

class Draggable {

    constructor(inventory, board) {
        this.inventory = inventory;
        this.board = board;
        this.draggable = '[draggable]';
        this.droppable = '#edit-board td,#toolbox';
        this.boardDOM = $('#edit-board');
        this.inventoryDOM = $('#toolbox');
    }

    onDrag(event, ui) {
    }

    onHover(event, ui) {
        if ($(event.target).is('td')) {
            let type = ui.draggable.data('type');
            let x = $(event.target).data('x');
            let y = $(event.target).data('y');
            this.canDropHere(type, x, y, true);
        }
    }

    onDrop(event, ui) {
        let target = $(event.target);
        let item = $(ui.draggable);
        let itemID = parseInt(item.parent().attr('id'));
        let type = item.data('type');
        let x = target.data('x');
        let y = target.data('y');

        $(this.hiddenCells).removeClass();

        //$(this.hiddenCells).each((a,b)=>$(b).removeClass());
        if (!this.canDropHere(type, x, y))
            return false;

        if (target.is('#toolbox')) {
            // board -> toolbox
            this.board.removeBlock(itemID);
            item.parent().empty();
            this.inventory.addBlock(type);
            this.inventory.displayInventory();
            this.setDraggable(this.draggable);

        } else if (item.parent().is('#toolbox')) {
            // toolbox -> board
            this.board.addBlock(type, x, y);
            this.inventory.removeBlock(type, 1);
            this.inventory.displayInventory();
            this.setDraggable(this.draggable);

        } else {
            // board -> board
            this.board.moveBlock(itemID, x, y);
            item.appendTo(target);
        }
    }

    canDropHere(type, hoverX, hoverY, visual) {
        // TODO : avoid self detection.
        let shape = BlockFactory.getBlock(type).constructor.getShape();
        let isFree = true;
        visual = visual || false;

        let block, coordX, coordY;

        // erase previous hovered cell
        $(this.hiddenCells).each((a, b) => $(b).removeClass());
        this.hiddenCells = [];

        // find central point
        let origin = {
            x: Math.floor(shape[0].length / 2),
            y: Math.floor(shape.length / 2)
        };

        for (let x = 0; x < shape.length; x++) {
            if (shape.hasOwnProperty(x)) {
                for (let y = 0; y < shape.length; y++) {
                    coordX = hoverX + x - origin.x;
                    coordY = hoverY + y - origin.y;

                    block = $('#' + Board.getIdFromCoord(coordX, coordY));
                    this.hiddenCells.push(block);

                    if (coordX >= Board.getSize() || coordY >= Board.getSize() || coordX < 0 || coordY < 0 || block.children().length) {
                        isFree = false;
                        if (visual)
                            block.addClass('hoverBusy')
                    } else if (visual) {
                        block.addClass('hoverFree')
                    }
                }
            }
        }
        return isFree;
    }

    setDraggable(target) {
        $(target).draggable({
            //snap: this.droppable,
            helper: 'clone',
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



































