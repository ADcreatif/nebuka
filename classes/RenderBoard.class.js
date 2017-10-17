/**
 * Created by Alan on 12/10/2017.
 */


class RenderBoard {

    constructor(){
        this.board = [];
    }

    startRender(){
        this.updateBoard();
        for(let index in board.blocks){
            if(board.blocks.hasOwnProperty(index)){
                let block = board.blocks[index];
                let cellID = Board.coordToID(block.x, block.y);
                $('#cellID_'+cellID).css('background-image', this.getImage(block.x, block.y));
            }
        }
        $('#board').addClass('render');
    }

    static stopRender(){
        $('#board').removeClass('render')
            .children('td').css('background-image', 'none')
    }

    updateBoard(){
        this.board = new Array(Math.pow(Board.getSize(),2));
        for(let index in board.blocks){
            if(board.blocks.hasOwnProperty(index)){
                let bloc= board.blocks[index];

                this.board[Board.coordToID(bloc.x, bloc.y)] = {
                    type: bloc.type, x:bloc.x, y: bloc.y
                };
            }
        }
    }

    exportBoard(json){
        this.updateBoard();
        let board = $.grep(this.board, function(n, i){
            return n !== undefined && n!==null ;
        });

        if(json === true){
            board = JSON.stringify(board)
        }

        console.log(board);
    }

    getImage(x, y){
        let surrounding = [
            this.board[Board.coordToID(x,y-1)] ? 'top':'',
            this.board[Board.coordToID(x+1,y)] ? 'right':'',
            this.board[Board.coordToID(x,y+1)] ? 'bottom':'',
            this.board[Board.coordToID(x-1,y)] ? 'left':''
        ];

        let blockBackground = surrounding.join('-').replace(/(-){2,}/, '-').replace(/^(-)+/, '').replace(/(-)+$/, '');

        if(blockBackground === '')
            blockBackground = 'alone';

        return 'url(img/wall/'+ blockBackground + '.png)';
    }
}