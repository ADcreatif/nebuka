"use strict";

class RenderBoard extends Board {

    constructor(board) {
        super();
        this.cellList = [];
        this.board = board;
        this.dom = $('#render-board').hide();
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
        $.each(this.board.blocks, function (i, block) {
            if (block) block.update();
        }.bind(this));
    }


    /** path finding algorithm using lee algorithm **/
    getPath(x1, y1, x2, y2) {
        let board = [];
        for (let index = 0; index < Board.getSize() * Board.getSize(); index++) {
            board[index] = {distance: null, visited: false};
        }
        let source = Board.getIdFromCoord(x1, y1);
        let dest = Board.getIdFromCoord(x2, y2);
        let currentIndex = source;

        board[currentIndex].distance = 0;
        let visit = [];
        let test = 0;
        while (currentIndex !== dest) {
            let adjacentCells = getAdjacentCells(currentIndex);

            for (let i = 0; i < adjacentCells.length; i++) {
                let cell = board[adjacentCells[i]];
                if (cell === null || cell === undefined) {
                    console.log("rofl" + adjacentCells[i]);
                    continue;
                }
                if (this.board.isOccupied(adjacentCells[i]))
                    continue;

                if (!cell.visited) {
                    if (cell.distance === null || cell.distance > board[currentIndex].distance + 1) {
                        cell.distance = board[currentIndex].distance + 1;

                        visit.push(adjacentCells[i]);
                    }

                }
            }

            board[currentIndex].visited = true;
            currentIndex = visit.shift();
            test++;
            if (test > 100000) {
                console.log("wut");
                break;
            }

        }

        currentIndex = dest;
        let path = [];
        path.push(currentIndex);
        test = 0;
        while (currentIndex !== source) {
            let adjacentCells = getAdjacentCells(currentIndex);

            let min = 100000;
            let index = -1;
            for (let i = 0; i < adjacentCells.length; i++) {
                if (this.board.isOccupied(adjacentCells[i]))
                    continue;
                if (min > board[adjacentCells[i]].distance && board[adjacentCells[i]].distance !== null) {
                    min = board[adjacentCells[i]].distance;
                    index = adjacentCells[i];
                }
            }

            path.push(index);
            currentIndex = index;
            test++;
            if (test > 100000) {
                console.log("wat");
            }
        }

        return path;

        function getAdjacentCells(id) {
            let cells = [];
            if (id >= Board.getSize())
                cells.push(id - Board.getSize());

            if (id % Board.getSize() !== 0)
                cells.push(id - 1);

            if ((id + 1) % Board.getSize() !== 0 && id < Board.getSize() * Board.getSize())
                cells.push(id + 1);

            if (id < Board.getSize() * ( Board.getSize() - 1))
                cells.push(id + Board.getSize());

            return cells;
        }
    }

    colorPath(x1, y1, x2, y2) {
        let path = this.getPath(x1, y1, x2, y2);
        for (let index = 0; index < path.length; index++) {
            this.getCellDOM(path[index]).addClass("path");
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
            cell_id = getRandom(0, Board.getSize() * Board.getSize() - 1)
        } while (this.isOccupied(cell_id) === true && needEmptyCell);
        return cell_id;
    }

    /****************************************************************************************
     *
     *                                       RENDERING
     *
     ****************************************************************************************/

    startRender() {
        this.updateBoard();
        let backgroundClass;

        for (let cell = 0; cell < this.cellList.length; cell++) {
            let block = this.cellList[cell];

            if (block !== undefined) {
                // add visual depending neighbors
                backgroundClass = this.getClass(block.x, block.y, block.type);
                this.getCellDOM(cell).removeClass().addClass(block.class + ' ' + backgroundClass);
            } else {
                this.getCellDOM(cell).removeClass();
            }
        }
    }

    /**
     * rebuild the whole blockList
     */
    updateBoard() {
        this.cellList = new Array(Math.pow(Board.getSize(), 2));

        for (let index in this.board.blocks) {
            if (this.board.blocks.hasOwnProperty(index) && this.board.blocks[index] !== null) {
                let block = this.board.blocks[index];

                if (block.numberOfCell() === 1) {
                    this.cellList[Board.getIdFromCoord(block.x, block.y)] = {
                        type: block.constructor.getType(),
                        class: block.constructor.getTypeClass(),
                        x: block.x,
                        y: block.y
                    };
                } else {
                    let shape, origin, cells, coordX, coordY, shapeX, shapeY;

                    shape = block.getShape();
                    origin = block.getOrigin();
                    cells = [];

                    // for biggers blocks
                    for (shapeY = 0; shapeY < shape.length; shapeY++) {
                        for (shapeX = 0; shapeX < shape.length; shapeX++) {

                            coordX = origin.x + shapeX;
                            coordY = origin.y + shapeY;
                            cells.push('#' + Board.getIdFromCoord(coordX, coordY));

                            this.cellList[Board.getIdFromCoord(coordX, coordY)] = {
                                type: block.constructor.getType(),
                                class: block.constructor.getTypeClass(),
                                x: coordX,
                                y: coordY
                            };
                        }
                    }
                }
            }
        }
    }

    /**
     * display the list of blocks on full board in the console for backup
     * @param json bool will output json or string
     */
    exportBoard(json) {
        this.updateBoard();
        let board = $.grep(this.cellList, n => n !== undefined && n !== null);

        if (json === true) {
            board = JSON.stringify(board);
        }
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
        let topCell = this.cellList[Board.getIdFromCoord(x, y - 1)];
        let rightCell = this.cellList[Board.getIdFromCoord(x + 1, y)];
        let bottomCell = this.cellList[Board.getIdFromCoord(x, y + 1)];
        let leftCell = this.cellList[Board.getIdFromCoord(x - 1, y)];

        let surrounding = [
            topCell && topCell.type === type ? 'top' : '',
            rightCell && rightCell.type === type ? 'right' : '',
            bottomCell && bottomCell.type === type ? 'bottom' : '',
            leftCell && leftCell.type === type ? 'left' : ''
        ];

        // remove useless "-"
        let backgroundClass = surrounding.join('-').replace(/(-){2,}/, '-').replace(/^(-)+/, '').replace(/(-)+$/, '');

        //console.log(Board.getIdFromCoord(x, y), x, y, type, surrounding);

        // if no surrounding
        if (backgroundClass === '')
            backgroundClass = 'alone';

        return backgroundClass;
    }

}