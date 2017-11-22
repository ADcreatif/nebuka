class ZombieController{
	constructor(board) {
		this.board = board;
		this.zombies = [];
		this.destx = 0;
		this.desty = 0;
	}

	spawnZombies(){
		this.zombiesCount = 5;
        for( var i = 0; i < this.zombiesCount ; i ++ )
        {
           this.spawnRandomZombie();
        }
	}

	spawnRandomZombie(){
		let zombie = new Zombie(this.board);
        let index;
        do{
        	index = this.getRandom(0,Board.getSize() * Board.getSize() -1)
        }while(this.board.isObstacle(index) == true);
     
        zombie.setPosition(Board.getXFromIndex(index), Board.getYFromIndex(index));
        this.zombies.push(zombie);
        zombie.appendToBoard();
	}

	getRandom(min, max)
	{
		return Math.floor(Math.random() * (max - min +1)) + min;
	}

	setDestination(x, y){
		this.destx = x;
		this.desty = y;
	}

	startNight(){
		this.spawnZombies();
		this.moveZombies();
	}

	moveZombies()
	{
		for( let i = 0; i < this.zombies.length ; i++)
        {
        	this.zombies[i].setDestination(this.board, this.destx, this.desty);
        	this.zombies[i].move();
        }
	}

}