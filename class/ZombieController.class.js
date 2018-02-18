class ZombieController{
	constructor(board) {
		this.board = board;
		this.zombies = [];
		this.destx = 0;
		this.desty = 0;
	}

	spawnZombies(){
		this.zombiesCount = 5;
        for (let i = 0; i < this.zombiesCount; i++)
        {
           this.spawnRandomZombie();
        }
	}

	spawnRandomZombie(){
		let zombie = new Zombie(this.board);
        let index;
        do{
            index = getRandom(0, Board.getSize() * Board.getSize() - 1)
        } while (this.board.isObstacle(index) === true);
     
        zombie.setPosition(Board.getXFromIndex(index), Board.getYFromIndex(index));
        this.zombies.push(zombie);
        zombie.appendToBoard();
	}

    killZombie(zombie_id) {
        let zombie = this.findZombie(zombie_id);
        console.log(zombie);
        zombie.removeFromBoard();
        zombie = null;
	}

    findZombie(zombie_id) {
        let the_one;
        $.each(this.zombies, function (i, z) {
            if (z.id = zombie_id) {
                the_one = z;
                return false;
            }
        }.bind(this));
        return the_one || null;
    }


	setDestination(x, y){
		this.destx = x;
		this.desty = y;
	}

	startNight(){
		this.spawnZombies();
		this.moveZombies();
        gameLoop.addAction(this);
	}

    update(delta) {
        $(this.zombies).each((i, zombie) => zombie.update(delta))
    }

	moveZombies()
	{
		for( let i = 0; i < this.zombies.length ; i++)
        {
        	this.zombies[i].setDestination(this.board, this.destx, this.desty);
        }
	}

}