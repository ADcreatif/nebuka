"use strict";

class RenderBoard extends Board {

    constructor(board) {
        super();
        this.board = board;
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
        $.each(this.board.blocks, function (i, block) {
            if (block) block.update();
        }.bind(this));
    }


    /** path finding algorithm using lee algorithm **/
    getPath(x1, y1, x2, y2) {
        let board = new Array(Board.TILE_QUANTITY * Board.TILE_QUANTITY);
        board.fill({distance: null, visited: false});

        /*let board = [];
         for (let index = 0; index < Board.TILE_QUANTITY * Board.TILE_QUANTITY; index++) {
            board[index] = {distance: null, visited: false};
         }*/

        let source = Board.getIdFromCoord(x1, y1);
        let dest = Board.getIdFromCoord(x2, y2);
        let currentIndex = source;

        console.log(currentIndex, source, x1, y1, x2, y2);
        if (currentIndex === undefined) {
            currentIndex = 0;
            console.log(source, x1, x2);
            console.log(this.board);
        }

        board[currentIndex].distance = 0;
        let visit = [];
        let test = 0;
        do {
            let adjacentCells = this.getAdjacentCells(currentIndex);

            for (let i = 0; i < adjacentCells.length; i++) {
                let cell = board[adjacentCells[i]];
                if (cell === null || cell === undefined) {
                    console.log("rofl, cell unknown" + adjacentCells[i]);
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
                console.log("wut cannot find path");
                break;
            }

        } while (currentIndex !== dest || visit.length > 0);

        currentIndex = dest;
        let path = [];
        path.push(currentIndex);
        test = 0;
        while (currentIndex !== source) {
            let adjacentCells = this.getAdjacentCells(currentIndex);

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
                currentIndex = source
            }
        }
        return path;
    }


    /**
     getPath(x1, y1, x2, y2) {
        let board = new Array(Board.TILE_QUANTITY * Board.TILE_QUANTITY);
        board.fill({distance: null, visited: false});

        let source = Board.getIdFromCoord(x1, y1);
        let dest = Board.getIdFromCoord(x2, y2);
        let currentIndex = source;

        console.log(currentIndex, source ,x1, y1, x2, y2  );
        if(currentIndex === undefined){
            currentIndex = 0;
            console.log(source, x1,x2);
            console.log(this.board);
        }

        board[currentIndex].distance = 0;
        let visit = [];
        let test = 0;
        while (currentIndex !== dest) {
            let adjacentCells = this.getAdjacentCells(currentIndex);

            for (let i = 0; i < adjacentCells.length; i++) {
                let cell = board[adjacentCells[i]];
                if (cell === null || cell === undefined) {
                    console.log("rofl, cell unknown" + adjacentCells[i]);
                    continue;
                }
                if (this.board.isOccupied(adjacentCells[i]))
                    continue;

                if (!cell.visited) {
                    if (cell.distance === null || cell.distance > board[currentIndex].distance +1 ) {
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
            let adjacentCells = this.getAdjacentCells(currentIndex);

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
                currentIndex = source
            }
        }
        return path;
    }
     */

    getAdjacentCells(id) {
        let cells = [];
        if (id >= Board.TILE_QUANTITY)
            cells.push(id - Board.TILE_QUANTITY);

        if (id % Board.TILE_QUANTITY !== 0)
            cells.push(id - 1);

        if ((id + 1) % Board.TILE_QUANTITY !== 0 && id < Board.TILE_QUANTITY * Board.TILE_QUANTITY)
            cells.push(id + 1);

        if (id < Board.TILE_QUANTITY * ( Board.TILE_QUANTITY - 1))
            cells.push(id + Board.TILE_QUANTITY);

        return cells;
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
            cell_id = getRandom(0, Board.TILE_QUANTITY * Board.TILE_QUANTITY - 1);
            console.log(this.isOccupied(cell_id), cell_id)
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

        let backgroundClass;

        for (let index = 0; index < this.board.blocks.length; index++) {
            let cellDOM = this.getCellDOM(index);

            if (this.board.blocks.hasOwnProperty(index) && this.board.blocks[index]) {
                // add visual depending neighbors
                let block = this.board.blocks[index];
                if (block.getShape().length > 1) {
                    // block spécial
                    // console.log('block spécial')
                    // todo : display special block
                }
                backgroundClass = this.getClass(block.x, block.y, block.type);
                cellDOM.addClass(block.constructor.getClass() + ' ' + backgroundClass);
            }
        }
    }

    /**
     * rebuild the whole blockList
     */
    /*updateBoard() {
     //let shape, origin, cellID, coordX, coordY, shapeX, shapeY, block;
     //this.blocks =  this.board.blocks;
     this.blocks = new Array(Board.getSize() * Board.getSize());
     this.blocks.fill(null);

        for (let index in this.board.blocks) {
            if (this.board.blocks.hasOwnProperty(index) && this.board.blocks[index] !== null) {
     block = this.board.blocks[index];
     shape = block.getShape();
     origin = block.getOrigin();

     // Also check special blocks shapes
     for (shapeY = 0; shapeY < shape.length; shapeY++) {
     for (shapeX = 0; shapeX < shape.length; shapeX++) {
     coordX = origin.x + shapeX;
     coordY = origin.y + shapeY;
     cellID =  Board.getIdFromCoord(coordX,coordY);
     this.blocks[cellID] = {
     type: block.constructor.getType(),
     class: block.constructor.getTypeClass(),
     x: coordX,
     y: coordY
                        }
                    }
                }
            }
        }
     console.log('Blocks : ');
     console.log(this.blocks);
     }*/

    /**
     * display the list of blocks on full board in the console for backup
     * @param json bool will output json or string
     */
    exportBoard(json) {
        let board = $.grep(this.board.blocks, n => n !== undefined && n !== null);

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
        let topCell = this.board.blocks[Board.getIdFromCoord(x, y - 1)];
        let rightCell = this.board.blocks[Board.getIdFromCoord(x + 1, y)];
        let bottomCell = this.board.blocks[Board.getIdFromCoord(x, y + 1)];
        let leftCell = this.board.blocks[Board.getIdFromCoord(x - 1, y)];

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