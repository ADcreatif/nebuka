/**
 * Created by Alan on 12/10/2017.
 */


class RenderBoard {

    constructor(){
        this.updateBoard();
    }

    startRender(){
        this.updateBoard();
        for(let index in inBoard){
            if(inBoard.hasOwnProperty(index)){
                let block = inBoard[index];
                let cellID = Board.coordToID(block.x, block.y);console.log(block);
                $('#cellID_'+cellID).css('background-image', 'url(img/wall/'+ this.getImage(block.x, block.y) +'.png)');
            }
        }
        $('#board').addClass('render');
    }

    static stopRender(){
        $('#board').removeClass('render');
    }

    updateBoard(){
        this.board = new Array(Math.pow(Board.getSize(),2));
        for(let index in inBoard){
            if(inBoard.hasOwnProperty(index)){
                this.board[Board.coordToID(inBoard[index].x, inBoard[index].y)] = inBoard[index];
            }
        }
    }

    exportBoard(){
        this.updateBoard();
        console.log(JSON.stringify(this.board));
    }

    getImage(x, y){
        let surrounding = [
            this.board[Board.coordToID(x,y-1)] ? 'top':'',
            this.board[Board.coordToID(x+1,y)] ? 'right':'',
            this.board[Board.coordToID(x,y+1)] ? 'bottom':'',
            this.board[Board.coordToID(x-1,y)] ? 'left':''
        ];
        console.log(this.board[Board.coordToID(x,y-1)]);
        let blockBackground = surrounding.join('-').replace(/(-){2,}/, '-').replace(/^(-)+/, '').replace(/(-)+$/, '');


        /*if(blockBackground == '')
         blockBackground = 'alone';
         */
        return blockBackground;
    }
}