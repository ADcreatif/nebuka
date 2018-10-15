"use strict";

class RenderBoard extends Board {

    constructor(board) {
        super();
        this.board = board;
        this.blocks = this.board.blocks;
        this.dom = $('#render-board');
        this.drawBoard('render-board');
    }


    /****************************************************************************************
     *
     *                                    NIGHT STUFFS
     *
     ****************************************************************************************/


    initNight(zombieController) {
        $.each(this.board.blocks, function (i, block) {
            if (block && typeof block.startNight === 'function') {
                block.startNight(zombieController);
            }
        }.bind(this))
    }

    activateDefences() {
        let block, index;

        for (index in this.blocks) {
            if (this.blocks.hasOwnProperty(index)) {
                block = this.blocks[index];
                if (block && block.update() === 'function') {
                    block.update(this);
                }
            }
        }
    }

    /**
     * returns the id of a cell on the board. You can specify if you want the cell to be empty
     * @param needEmptyCell bool whether the cell need to be empty
     * @returns {int} the id of a cell
     */
    getRandomCell(needEmptyCell) {
        let cell_id;
        do {
            cell_id = getRandom(0, Board.TILE_QUANTITY * Board.TILE_QUANTITY - 1);
            //console.log('random Cell : ', cell_id, this.isOccupied(cell_id))
        } while (this.isOccupied(cell_id) === true && needEmptyCell);
        return cell_id;
    }

    /****************************************************************************************
     *
     *                                       RENDERING
     *
     ****************************************************************************************/
    startRender() {
        this.dom.show();
        this.board.dom.hide();

        let backgroundClass, shape, block, coordX, coordY, shapeX, shapeY;

        for (let index = 0; index < this.blocks.length; index++) {
            let cellDOM = this.getCellDOM(index);
            if (this.blocks.hasOwnProperty(index) && this.blocks[index]) {
                block = this.blocks[index];
                shape = block.getShape();

                for (shapeY = 0; shapeY < shape.length; shapeY++) {
                    for (shapeX = 0; shapeX < shape[shapeY].length; shapeX++) {
                        coordX = block.x + shapeX;
                        coordY = block.y + shapeY;
                        this.blocks[Board.getIdFromCoord(coordX, coordY)] = block;
                        backgroundClass = this.getClass(block.x, block.y, block.type);
                        this.getCellDOM(Board.getIdFromCoord(coordX, coordY)).addClass(block.constructor.getClass() + ' ' + backgroundClass);
                    }
                }
                for (shapeY = 0; shapeY < shape.length; shapeY++) {
                    for (shapeX = 0; shapeX < shape[shapeY].length; shapeX++) {
                        coordX = block.x + shapeX;
                        coordY = block.y + shapeY;


                    }
                }


                if (block.getShape().length > 1) {
                    // todo : display special block
                }

                backgroundClass = this.getClass(block.x, block.y, block.type);
                cellDOM.addClass(block.constructor.getClass() + ' ' + backgroundClass);
            }
        }
    }

    /**
     * display the list of blocks on full board in the console for backup
     * @param json bool will output json or string
     */
    exportBoard(json) {
        let board = $.grep(this.blocks, n => n !== undefined && n !== null);

        if (json === true) {
            board = JSON.stringify(board);
        }
        console.log(board);
        return board;
    }

    /**
     * return the css class depending on surrouding,
     * displaying connection between blocks as well
     * @param x int
     * @param y int
     * @param type int
     * @returns {string}
     */
    getClass(x, y, type) {
        let topCell = this.blocks[Board.getIdFromCoord(x, y - 1)];
        let rightCell = this.blocks[Board.getIdFromCoord(x + 1, y)];
        let bottomCell = this.blocks[Board.getIdFromCoord(x, y + 1)];
        let leftCell = this.blocks[Board.getIdFromCoord(x - 1, y)];

        let surrounding = [
            topCell && topCell.type === type ? 'top' : '',
            rightCell && rightCell.type === type ? 'right' : '',
            bottomCell && bottomCell.type === type ? 'bottom' : '',
            leftCell && leftCell.type === type ? 'left' : ''
        ];

        // remove useless "-"
        let backgroundClass = surrounding.join('-').replace(/(-){2,}/, '-').replace(/^(-)+/, '').replace(/(-)+$/, '');

        // if no surrounding
        if (backgroundClass === '')
            backgroundClass = 'alone';

        return backgroundClass;
    }
}