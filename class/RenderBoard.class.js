class RenderBoard {

    constructor(board) {
        this.boardDOM = $('#render-board');
        this.cellList = [];
        this.board = board;

        this.drawBoard();
    }

    startRender() {
        this.updateBoard();
        let backgroundClass;

        for (let cell = 0; cell < this.cellList.length; cell++) {
            let block = this.cellList[cell];
            if (block !== undefined) {
                backgroundClass = this.getClass(block.x, block.y, block.type);
                this.boardDOM.find('#' + cell).addClass(block.class + ' ' + backgroundClass);
            } else {
                this.boardDOM.find('#' + cell).removeClass();
            }
        }

        this.boardDOM.fadeIn();
    }

    stopRender() {
        this.boardDOM.fadeOut();
    }

    /**
     * rebuild the whole blockList
     */
    updateBoard() {
        this.cellList = new Array(Math.pow(Board.getSize(), 2));

        for (let index in this.board.blocks) {
            if (this.board.blocks.hasOwnProperty(index) && this.board.blocks[index] !== null) {
                let bloc = this.board.blocks[index];

                this.cellList[Board.getIdFromCoord(bloc.x, bloc.y)] = {
                    type: bloc.constructor.getType(),
                    class: bloc.constructor.getTypeClass(),
                    x: bloc.x,
                    y: bloc.y
                };
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
            board = JSON.stringify(board)
        }

        console.log(board);
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
        let tCell = this.cellList[Board.getIdFromCoord(x, y - 1)];
        let rCell = this.cellList[Board.getIdFromCoord(x + 1, y)];
        let bCell = this.cellList[Board.getIdFromCoord(x, y + 1)];
        let lCell = this.cellList[Board.getIdFromCoord(x - 1, y)];

        let surrounding = [
            tCell && tCell.type === type ? 'top' : '',
            rCell && rCell.type === type ? 'right' : '',
            bCell && bCell.type === type ? 'bottom' : '',
            lCell && lCell.type === type ? 'left' : ''
        ];

        // remove useless "-"
        let backgroundClass = surrounding.join('-').replace(/(-){2,}/, '-').replace(/^(-)+/, '').replace(/(-)+$/, '');

        // if no surrounding
        if (backgroundClass === '')
            backgroundClass = 'alone';

        return backgroundClass;
    }

    /**
     * build render board on init();
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
        this.boardDOM.append(table);
    };
}