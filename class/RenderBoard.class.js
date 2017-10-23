class RenderBoard {



    constructor(){
        this.board = $('#render-board');
        this.block_dir = "asset/imgph/block/";
        this.cellList = [];

        this.drawBoard();
    }

    startRender(){
        this.updateBoard();
        let backgoundImage;

        for(let cell=0; cell < this.cellList.length ; cell++){
            let block = this.cellList[cell];
            if(block !== undefined){
                backgoundImage = this.getImage(block.x, block.y, block.type);

console.log(block.class,backgoundImage);


                this.board.find('#'+cell).addClass(block.class+' '+backgoundImage);
            } else{
                //backgoundImage = "none";
                this.board.find('#'+cell).removeClass();
            }

            //this.board.find('#'+cell).css('background-image',backgoundImage);
        }

        this.board.fadeIn();
    }

    stopRender(){
        this.board.fadeOut();
    }

    updateBoard(){
        this.cellList = new Array(Math.pow(Board.getSize(),2));
        for(let index in board.blocks){
            if(board.blocks.hasOwnProperty(index) && board.blocks[index] !== null){
                let bloc = board.blocks[index];

                this.cellList[Board.getIdFromCoord(bloc.x, bloc.y)] = {
                    type: bloc.constructor.getType(),
                    class:bloc.constructor.getMaterialClasses(),
                    x:bloc.x,
                    y: bloc.y
                };
            }
        }
    }

    exportBoard(json){
        this.updateBoard();
        let board = $.grep(this.cellList, n=>  n !== undefined && n!==null );
        /*let board = $.grep(this.cellList, function(n, i){
            return n !== undefined && n!==null ;
        });*/

        if(json === true){
            board = JSON.stringify(board)
        }

        console.log(board);
    }

    getImage(x, y, type){
        let tCell = this.cellList[Board.getIdFromCoord(x,y-1)];
        let rCell = this.cellList[Board.getIdFromCoord(x+1,y)];
        let bCell = this.cellList[Board.getIdFromCoord(x,y+1)];
        let lCell = this.cellList[Board.getIdFromCoord(x-1,y)];

        let surrounding = [
            tCell && tCell.type === type ? 'top':'',
            rCell && rCell.type === type ? 'right':'',
            bCell && bCell.type === type ? 'bottom':'',
            lCell && lCell.type === type ? 'left':''
        ];

        let blockBackground = surrounding.join('-').replace(/(-){2,}/, '-').replace(/^(-)+/, '').replace(/(-)+$/, '');

        if(blockBackground === '')
            blockBackground = 'alone';

        return blockBackground;
        //return 'url('+ this.block_dir + blockBackground + '.png)';
    }

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
}