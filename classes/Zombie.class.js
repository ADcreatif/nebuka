class Zombie {
	 constructor(board){
        this.x = 0;
        this.y = 0;
        this.currentx = 0;
        this.currenty = 0;
         this.id = Zombie.COUNT;
         Zombie.COUNT++;

         this.dom = null;

         this.tilePerSecond = .5;

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

        this.currentx = this.x * Board.TILE_SIZE;
        this.currenty = this.y * Board.TILE_SIZE;

    	// necessary adjusment for margins
    	if(this.x > 5)
    		this.currentx ++;
    	if(this.y > 5)
    		this.currenty ++;

        this.dom.css("left", this.currentx + "px");
        this.dom.css("top", this.currenty + "px");
    }

    showEpicDeadth() {
        this.dom.addClass('dead').fadeOut(3000, function () {
            this.remove()
        })
    }

    smoothPosition(){
        /*this.currentx = Math.round(this.currentx / Board.TILE_SIZE) * Board.TILE_SIZE + 2;
        this.currenty = Math.round(this.currenty / Board.TILE_SIZE) * Board.TILE_SIZE + 2;
         this.currentx = Math.round(this.currentx / Board.TILE_SIZE) * Board.TILE_SIZE + 2;
         this.currenty = Math.round(this.currenty / Board.TILE_SIZE) * Board.TILE_SIZE + 2;*/
    	this.appendToBoard();
    }

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
        this.dom.css("top", this.currenty + "px")
            .removeClass("bottomright bottomleft topright topleft top right left bottom")
            .addClass('bottom');
    	this.currenty += this.speed ;
    	this.updatePosition();
    }

    moveTop(){
        this.dom.css("top", this.currenty + "px")
            .removeClass("bottomright bottomleft topright topleft top right left bottom")
            .addClass('top');
    	this.currenty -= this.speed ;
    	this.updatePosition();
    }

    moveRight(){
        this.dom.css("left", this.currentx + "px")
            .removeClass("bottomright bottomleft topright topleft top right left bottom")
            .addClass('right');
    	this.currentx += this.speed ;
    	this.updatePosition();
    }

    moveLeft(){
        this.dom.css("left", this.currentx + "px")
            .removeClass("bottomright bottomleft topright topleft top right left bottom")
            .addClass('left');
    	this.currentx -= this.speed ;
    	this.updatePosition();
    }

    moveTopLeft() {
        this.dom.css("left", this.currentx + "px")
            .css("top", this.currenty + "px")
            .removeClass("bottomright bottomleft topright topleft top right left bottom")
            .addClass('topleft');
        this.currentx -= this.speed;
        this.currenty -= this.speed;
        this.updatePosition();
    }

    moveTopRight() {
        this.dom.css("left", this.currentx + "px")
            .css("top", this.currenty + "px")
            .removeClass("bottomright bottomleft topright topleft top right left bottom")
            .addClass('topright');
        this.currentx += this.speed;
        this.currenty -= this.speed;
        this.updatePosition();
    }

    moveBottomLeft() {
        this.dom.css("left", this.currentx + "px")
            .css("top", this.currenty + "px")
            .removeClass("bottomright bottomleft topright topleft top right left bottom")
            .addClass('bottomleft');
        this.currentx -= this.speed;
        this.currenty += this.speed;
        this.updatePosition();
    }

    moveBottomRight() {
        this.dom.css("left", this.currentx + "px")
            .css("top", this.currenty + "px")
            .removeClass("bottomright bottomleft topright topleft top right left bottom")
            .addClass('bottomright');
        this.currentx += this.speed;
        this.currenty += this.speed;
        this.updatePosition();
    }

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
        // board.colorPath(path);
    	this.createMoves(path);
    }

    createMoves( path ){
        let currentIndex = Board.getIdFromCoord(this.x, this.y);
    	for( let i =  path.length-1 ; i >= 0  ; i-- ) {

            let next = Board.getIdFromCoord(path[i][0], path[i][1]);

            switch (next) {
                case currentIndex + 1 :
                    this.moves.push(this.moveRight);
                    break;
                case currentIndex + Board.TILE_QUANTITY  :
                    this.moves.push(this.moveBottom);
                    break;
                case currentIndex - 1 :
                    this.moves.push(this.moveLeft);
                    break;
                case currentIndex - Board.TILE_QUANTITY:
                    this.moves.push(this.moveTop);
                    break;
                case currentIndex - Board.TILE_QUANTITY - 1:
                    this.moves.push(this.moveTopLeft);
                    break;
                case currentIndex - Board.TILE_QUANTITY + 1:
                    this.moves.push(this.moveTopRight);
                    break;
                case currentIndex + Board.TILE_QUANTITY - 1:
                    this.moves.push(this.moveBottomLeft);
                    break;
                case currentIndex + Board.TILE_QUANTITY + 1:
                    this.moves.push(this.moveBottomRight);
                    break;

            }

    		currentIndex = next;
    	}
        console.log(this.moves);
    }

    updatePosition(){
    	this.x = Math.round(this.currentx / Board.TILE_SIZE);
    	this.y = Math.round(this.currenty / Board.TILE_SIZE);
    }
}

Zombie.COUNT = 0;