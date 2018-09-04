class ZombieController {
    constructor(renderboard) {
        this.renderboard = renderboard;
        this.zombiesCount = 5;
        this.zombies = [];
        this.destx = 0;
        this.desty = 0;
    }

    spawnZombies() {
        for (let i = 0; i < this.zombiesCount; i++) {
            this.spawnRandomZombie();
        }
    }

    /** removes the zombie from board, from zombies stack, addclass dead
     * @params zombie_id {int}
     * **/
    killZombie(zombie_id) {
        let zombie_index;
        zombie_index = this.findZombie(zombie_id);
        if (zombie_index > -1) {
            let zombie = this.zombies[zombie_index];
            zombie.showEpicDeath();
            this.zombies.splice(zombie_index, 1);
        }
    }

    /** @returns {int} the index of zombie in this zombie stack, -1 if not found **/
    findZombie(zombie_id) {
        for (let index = 0; index < this.zombies.length; index++)
            if (zombie_id === this.zombies[index].id)
                return index;
        return -1;
    }

    spawnRandomZombie() {
        let zombie = new Zombie(this.renderboard);
        let cellID = this.renderboard.getRandomCell(true);

        zombie.setPosition(Board.getXFromIndex(cellID), Board.getYFromIndex(cellID));
        this.zombies.push(zombie);
        zombie.appendToBoard();
    }

    setDestination(x, y) {
        this.destx = x;
        this.desty = y;
    }

    initNight() {
        this.spawnZombies();
        this.setDestination(5, 3);
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