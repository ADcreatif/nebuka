/**
 * Created by Alan on 06/10/2017.
 */

"use strict";



class Board {

    constructor() {
        /**
         * the DOM element containing <table> and cells
         * @type {*}
         */
        this.board = $('#edit-board');

        /**
         * the cell list by instance
         * @type {Array}
         */

        this.blocks = [];

        this.drawBoard();
        this.initBoard();
    }

    static getSize() {
        return 22;
    }

    static getIdFromCoord(x, y) {
        return y * Board.getSize() + x;
    }

    static getXFromIndex(index){
        return index % Board.getSize();
    }

    static getYFromIndex(index){
        return Math.floor(index / Board.getSize() ) ;
    }


    getBlock(cellID) {
        return this.board.find("#"+cellID);
    }

    isObstacle(id){
        return this.getBlock(id).find("div").length > 0;
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

        this.blocks[block.getCellId()] = block;

        $('#' + block.getCellId()).append(
            block.constructor.drawBlock(0)
        );
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
        block.setPosition(newX, newY);
        this.blocks[blockID] = null;
        this.blocks[block.getCellId()]  = block;
    }

    /**
     * fill board with tiles at init
     */
    initBoard() {
        for (let i in inBoard) {
            if (inBoard.hasOwnProperty(i)) {
                this.addBlock(inBoard[i].type, inBoard[i].x, inBoard[i].y);
            }
        }
    }

    /**
     * build board and cells at init()
     */
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
        this.board.append(table);
    };




    // path finding algorithm using lee algorithm

    getPath(x1,y1,x2,y2){
        let b = [];
        for(let i = 0 ; i < Board.getSize() * Board.getSize(); i++ ){
            b[i] = { distance : null, visited : false};
        }
        let source =  Board.getIdFromCoord(x1, y1);
        let dest = Board.getIdFromCoord(x2, y2);
        let currentIndex = source

        b[currentIndex].distance = 0;
        let visit = [];
        var test = 0;
        while(currentIndex != dest){
            let adjacentCells = getAdjacentCells(currentIndex);

        
            for(let i = 0; i < adjacentCells.length; i++){
                let cell = b[adjacentCells[i]];
                if(cell == null)
                {
                    console.log("rofl" +adjacentCells[i]);
                    continue;
                }
                if(this.isObstacle(adjacentCells[i]))
                    continue;

                if(!cell.visited){
                   if(cell.distance == null || cell.distance >  b[currentIndex].distance +1 ) {
                     cell.distance = b[currentIndex].distance + 1;
                     
                     visit.push(adjacentCells[i]);
                   }
                   
                }
            }
            b[currentIndex].visited = true;
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
        while(currentIndex != source){
            let adjacentCells = getAdjacentCells(currentIndex);

            let min = 100000;
            let index = -1;
            for(let i = 0; i < adjacentCells.length; i++){
                 if(this.isObstacle(adjacentCells[i]))
                    continue;
                if( min > b[adjacentCells[i]].distance &&  b[adjacentCells[i]].distance != null){
                    min =  b[adjacentCells[i]].distance;
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

            if( id %  Board.getSize() != 0 )
                cells.push(id-1);

            if( (id+1) %  Board.getSize() != 0 && id < Board.getSize()*Board.getSize())
                 cells.push(id+1);

             if( id < Board.getSize() * ( Board.getSize() -1))
                cells.push(id + Board.getSize());

            return cells;
        }
    }


    colorPath(x1,y1,x2,y2){
        let path = this.getPath(x1,y1,x2,y2)
        for(let i = 0; i < path.length; i++){
             this.getBlock(path[i]).addClass("path");
        }

    }
}

Board.TILE_SIZE = 20;


// IDToCoord(id){
//     let y = parseInt(id / this.size);
//     let x = parseInt(id % this.size);
//     return {x:x, y:y}
// }
