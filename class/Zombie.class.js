class Zombie {
	 constructor(board){
        this.x = 0;
        this.y = 0;
        this.currentx = 0;
        this.currenty = 0;
         this.id = Zombie.COUNT;
         Zombie.COUNT++;

         this.dom = null;

        this.tilePerSecond = 4 ;

        this.speed = ( this.tilePerSecond * Board.TILE_SIZE) / Game.TICK_PER_SECOND ;
        this.intervals = Math.floor( Game.TICK_PER_SECOND / this.tilePerSecond)+1;

        this.currentMove = null;
        this.counter = 0;
        this.moves = [];
        this.board = board;

         this.health = 100;
         this.damages = 20;

    }

    setPosition(x, y){
    	this.x = x;
    	this.y = y;
    }

    appendToBoard(){
        let display = $("<div>").addClass('zombie').attr('id', this.getId());
        this.board.dom.append(display);
        this.dom = $("#" + this.getId());

    	this.currentx = this.x * Board.TILE_SIZE + 2;
    	this.currenty = this.y * Board.TILE_SIZE + 2;

    	// necessary adjusment for margins
    	if(this.x > 5)
    		this.currentx ++;
    	if(this.y > 5)
    		this.currenty ++;

        this.dom.css("left", this.currentx + "px");
        this.dom.css("top", this.currenty + "px");
    }

    removeFromBoard() {
        this.board.dom.remove('#zombie_' + this.id);
    }

    smoothPosition(){
        this.currentx = Math.round(this.currentx / Board.TILE_SIZE) * Board.TILE_SIZE;
        this.currenty = Math.round(this.currenty / Board.TILE_SIZE) * Board.TILE_SIZE;

    	this.appendToBoard();
    }

    /*getDisplay(){
    	return this.display;
     }*/

    getId(){
    	return "zombie_"+this.id;
    }


    /************************************************************************
     *
     *                                FIGHT
     *
     ************************************************************************/

    get_damage(damages) {
        this.health -= damages;
        this.dom.blink('being_hurt');
    }

    /************************************************************************
     *
     *                                MOVES
     *
     ************************************************************************/

    moveBottom(){
        this.dom.css("top", this.currenty + "px");
    	this.currenty += this.speed ;
    	this.updatePosition();
    }

    moveTop(){
        this.dom.css("top", this.currenty + "px");
    	this.currenty -= this.speed ;
    	this.updatePosition();
    }

    moveRight(){
        this.dom.css("left", this.currentx + "px");
    	this.currentx += this.speed ;
    	this.updatePosition();
    }

    moveLeft(){
        this.dom.css("left", this.currentx + "px");
    	this.currentx -= this.speed ;
    	this.updatePosition();
    }

    next_move() {
        this.func = this.moves.shift();
    }

    update(delta) {

        if (this.counter === undefined) {
            this.counter = 0;
        }
        if (this.moves.length === 0) {
            l('remove');
            gameLoop.removeAction(this);
        }
        console.log(this.counter + '/' + this.intervals);
        if (this.counter >= this.intervals) {
            this.smoothPosition();
            this.counter = 0;
        } else {
            this.next_move();
        }
        this.counter++;
    };

    move(){

        if (this.currentMove === null && this.moves.length === 0)
            return;

        if (this.currentMove === null)
            this.currentMove = this.moves.shift();

        // move is finished : reset status
        if( this.counter >= this.intervals)
        {
             this.smoothPosition();
             this.currentMove = null;
             this.counter = 0;
        }
        else
        {
            this.counter ++;
            this.currentMove.call(this);
        }
    }

    setDestination(board, destx, desty){
        let path = board.getPath(this.x, this.y, destx, desty);
    	this.createMoves(path);
    }

    createMoves( path ){
        let currentIndex = Board.getIdFromCoord(this.x, this.y);
    	for( let i =  path.length-1 ; i >= 0  ; i-- ) {

            let next = path[i];

            if (currentIndex + 1 === next) {
    			this.moves.push(this.moveRight);
    		}
            else if (currentIndex + Board.getSize() === next) {
    			this.moves.push(this.moveBottom);
    		}
            else if (currentIndex - 1 === next) {
    			console.log("left");
    			this.moves.push(this.moveLeft);
    		}
            else if (currentIndex - Board.getSize() === next) {
    			this.moves.push(this.moveTop);
    		}

    		currentIndex = next;
    	}
    }

    updatePosition(){
    	this.x = Math.round(this.currentx / Board.TILE_SIZE);
    	this.y = Math.round(this.currenty / Board.TILE_SIZE);
    }
}

Zombie.COUNT = 0;