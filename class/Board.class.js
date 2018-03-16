"use strict";

class Board {

    constructor() {
        /**
         * the Board, from DOM (<table>)
         */
        this.dom = $('#edit-board');


        /**
         * the blocks list by instance
         * @type {Array}
         */
        this.blocks = [];

        this.drawBoard();
        this.initBoard();
    }

    static getSize() {
        return Board.TILE_SIZE;
    }

    static getIdFromCoord(x, y) {
        return y * Board.getSize() + x;
    }

    static getXFromIndex(cellID) {
        return cellID % Board.getSize();
    }

    static getYFromIndex(cellID) {
        return Math.floor(cellID / Board.getSize());
    }


    getCellDOM(cellID) {
        return this.dom.find("#" + cellID);
    }

    getBlockinCell(cellID) {
        return this.blocks[cellID];
    }

    isOutOfBound(x, y) {
        return x >= Board.getSize() ||
            y >= Board.getSize() ||
            x < 0 ||
            y < 0
    }

    isOccupied(cellID) {
        return this.getCellDOM(cellID).hasClass('occupied');
    }
    /**
     * Create a new block on board (ex, from inventory)
     * @param type String the type of block to create
     * @param x Int
     * @param y Int
     */
    addBlock(type, x, y) {
        let block = BlockFactory.getBlock(type);

        if( block === null)
            return;

        block.setPosition(x, y);

        this.blocks[block.getCellID()] = block;
        this.setOccupied(block);

        $('#' + block.getCellID()).append(
            block.constructor.drawBlock(0)
        );
    }

    /**
     * set .occupied class on cell which is actually occupied
     * (usefull especialy with specials shaped blocs)
     * @param   block {Block}
     * **/
    setOccupied(block) {
        let coordX, coordY, posX, posY, shape, cells, origin;

        // for one size blocks
        if (block.numberOfCell() === 1) {
            $('#' + Board.getIdFromCoord(block.x, block.y)).addClass('occupied');
            return;
        }

        shape = block.getShape();
        origin = block.getOrigin();
        cells = [];

        // for biggers blocks
        for (coordY = 0; coordY < shape.length; coordY++) {
            for (coordX = 0; coordX < shape.length; coordX++) {
                posX = origin.x + coordX;
                posY = origin.y + coordY;
                cells.push('#' + Board.getIdFromCoord(posX, posY));
            }
        }
        $(cells.toString()).addClass('occupied')
    }

    /**
     * remove .occupied class on cell when dropped on board
     * (usefull especialy with specials shaped blocs)
     * @param   block {Block}
     * **/
    removeOccupied(block) {
        let coordX, coordY, posX, posY, shape, cells, origin;

        // for one size blocks
        if (block.numberOfCell() === 1) {
            $('#' + Board.getIdFromCoord(block.x, block.y)).removeClass('occupied');
            return;
        }

        shape = block.getShape();
        origin = block.getOrigin();
        cells = [];

        // for biggers blocks
        for (coordY = 0; coordY < shape.length; coordY++) {
            for (coordX = 0; coordX < shape.length; coordX++) {
                posX = origin.x + coordX;
                posY = origin.y + coordY;
                cells.push('#' + Board.getIdFromCoord(posX, posY));
            }
        }
        $(cells.toString()).removeClass('occupied')
    }

    removeBlock(blockID) {
        this.blocks[blockID] = null;
    }

    /**
     * Change block position on board and coordinate in the instance
     * @param blockID Int the id of block
     * @param newX  Int
     * @param newY Int
     */
    moveBlock(blockID, newX, newY) {
        let block =  this.blocks[blockID];

        this.removeOccupied(block);
        block.setPosition(newX, newY);
        this.blocks[blockID] = null;
        this.blocks[block.getCellID()] = block;

        this.setOccupied(block)
    }

    /** fill board with tiles at init **/
    initBoard() {
        for (let i in inBoard) {
            if (inBoard.hasOwnProperty(i)) {
                this.addBlock(inBoard[i].type, inBoard[i].x, inBoard[i].y);
            }
        }
    }

    /** build board and cells at init() */
    drawBoard() {
        let table = $('<table>');
        let cellID = 0;
        let tileY = 0;
        let tileX;
        let tr;

        for (tileY; tileY < Board.getSize(); tileY++) {
            tr = $('<tr>');
            tileX = 0;
            for (tileX; tileX < Board.getSize(); tileX++) {
                tr.append($('<td>')
                    .data('x', tileX)
                    .data('y', tileY)
                    .attr('id', cellID)
                );
                cellID++;
            }
            table.append(tr)
        }
        this.dom.append(table);
    };

    /** path finding algorithm using lee algorithm **/
    getPath(x1,y1,x2,y2){
        let board = [];
        for (let index = 0; index < Board.getSize() * Board.getSize(); index++) {
            board[index] = {distance: null, visited: false};
        }
        let source =  Board.getIdFromCoord(x1, y1);
        let dest = Board.getIdFromCoord(x2, y2);
        let currentIndex = source;

        board[currentIndex].distance = 0;
        let visit = [];
        let test = 0;
        while (currentIndex !== dest) {
            let adjacentCells = getAdjacentCells(currentIndex);

            for(let i = 0; i < adjacentCells.length; i++){
                let cell = board[adjacentCells[i]];
                if (cell === null || cell === undefined)
                {
                    console.log("rofl" + adjacentCells[i]);
                    continue;
                }
                if (this.isOccupied(adjacentCells[i]))
                    continue;

                if(!cell.visited){
                    if (cell.distance === null || cell.distance > board[currentIndex].distance + 1) {
                        cell.distance = board[currentIndex].distance + 1;
                     
                     visit.push(adjacentCells[i]);
                   }
                   
                }
            }

            board[currentIndex].visited = true;
            currentIndex = visit.shift();
            test ++;
            if( test > 100000)
            {
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
            for(let i = 0; i < adjacentCells.length; i++){
                if (this.isOccupied(adjacentCells[i]))
                    continue;
                if (min > board[adjacentCells[i]].distance && board[adjacentCells[i]].distance !== null) {
                    min = board[adjacentCells[i]].distance;
                    index = adjacentCells[i];
                    
                }
            }
           
            path.push(index);
            currentIndex = index;
            test++;
            if(test > 100000)
            {
                console.log("wat");
            }
        }

        return path;


        function getAdjacentCells(id){
            let cells = [];
            if( id >= Board.getSize())
                cells.push(id - Board.getSize());

            if (id % Board.getSize() !== 0)
                cells.push(id-1);

            if ((id + 1) % Board.getSize() !== 0 && id < Board.getSize() * Board.getSize())
                 cells.push(id+1);

             if( id < Board.getSize() * ( Board.getSize() -1))
                cells.push(id + Board.getSize());

            return cells;
        }
    }

    colorPath(x1,y1,x2,y2){
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

    initNight(zombieController) {
        $.each(this.blocks, function (i, block) {
            if (block && typeof block.startNight === 'function') {
                block.startNight(zombieController);
            }
        }.bind(this))
    }

    activateDefences() {
        $.each(this.blocks, function (i, block) {
            if (block)
                block.update();
        }.bind(this));
    }

}

Board.TILE_SIZE = 20;


// IDToCoord(id){
//     let y = parseInt(id / this.size);
//     let x = parseInt(id % this.size);
//     return {x:x, y:y}
// }
