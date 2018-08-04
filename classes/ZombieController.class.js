class ZombieController {
    constructor(board, renderboard) {
        //this.board = board;
        this.renderboard = renderboard;
        this.zombies = [];
        this.destx = 0;
        this.desty = 0;
    }

    spawnZombies() {
        this.zombiesCount = 5;
        for (let i = 0; i < this.zombiesCount; i++) {
            this.spawnRandomZombie();
        }
    }

    /** removes the zombie from board, from zombies stack, addclass dead
     * @params zombie_id {int}
     * **/
    killZombie(zombie_id) {
        let zombie_index = this.findZombie(zombie_id);
        let zombie = this.zombies[zombie_index];

        zombie.showEpicDeadth();
        this.zombies.splice(zombie_index, 1);
    }

    /** @returns {int} the index of zombie in this zombie stack, -1 if not found **/
    findZombie(zombie_id) {
        for (let index = 0; index < this.zombies.length; index++)
            if (zombie_id === this.zombies[index].id)
                return parseInt(index);
        return -1;
    }

    spawnRandomZombie() {
        let zombie = new Zombie(this.renderboard);
        let cell_id = this.renderboard.getRandomCell(true);

        zombie.setPosition(Board.getXFromIndex(cell_id), Board.getYFromIndex(cell_id));
        this.zombies.push(zombie);
        zombie.appendToBoard();
    }

    setDestination(x, y) {
        this.destx = x;
        this.desty = y;
    }

    initNight() {
        this.spawnZombies();
        this.setDestination(18, 7);
        this.setZombiesDestination();
    }

    setZombiesDestination() {
        for (let i = 0; i < this.zombies.length; i++) {
            this.zombies[i].setDestination(this.renderboard, this.destx, this.desty);
        }
    }

    moveZombies() {
        for (let i = 0; i < this.zombies.length; i++) {
            this.zombies[i].move();
        }
    }

}