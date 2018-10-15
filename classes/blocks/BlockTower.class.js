"use strict";

class WoodTower extends Block {

    constructor() {
        super();

        this.damages = 5;
        this.health = 130;
        this.range = 6;
        this.aim = new Aim(500);
    }

    get_target_distance(x, y) {
        return get_distance(this.centerX * Board.TILE_SIZE, this.centerY * Board.TILE_SIZE, x, y);
    }

    get_target_angle(x, y) {
        return get_angle(this.centerX * Board.TILE_SIZE, this.centerY * Board.TILE_SIZE, x, y)
    }

    find_enemy() {
        let distance, closest, zombie;
        closest = null;
        for (let i = 0; i < this.zombieController.zombies.length; i++) {
            zombie = this.zombieController.zombies[i];
            distance = this.get_target_distance(zombie.currentx, zombie.currenty);
            if (closest === null || (
                distance <= this.range * Board.TILE_SIZE &&
                distance < this.get_target_distance(closest.currentx, closest.currenty))) {
                closest = zombie;
            }
        }
        this.aim.target = closest;
    }

    target_enemy() {
        //todo il te manque une case....
        let x = this.aim.target.currentx + Board.TILE_SIZE;
        let y = this.aim.target.currenty + Board.TILE_SIZE;
        this.aim.angle = this.get_target_angle(x, y);
        this.aim.distance = this.get_target_distance(x, y);

        if (this.aim.target.health <= 0 || this.aim.distance > this.range * Board.TILE_SIZE) {
            this.aim.line.hide();
            this.aim.target = null;
            return;
        }

        this.aim.target.get_damage(this.damages);
        this.aim.update_line();
    }

    startNight(zombieController) {
        this.zombieController = zombieController;

        let x = this.centerX * Board.TILE_SIZE - Board.TILE_SIZE / 2;
        let y = this.centerY * Board.TILE_SIZE - Board.TILE_SIZE / 2;
        this.aim.draw_line(x, y);
    }

    update() {
        if (this.aim.target === null) {
            this.find_enemy();
        }
        // move is finished : reset status
        if (this.aim.counter >= this.aim.rateIOfFire * Game.TICK_PER_SECOND / 1000) {
            if (typeof this.aim.target === "object") {
                this.target_enemy();
            }
            this.aim.counter = 0;
        } else {
            this.aim.counter++;
        }
    }

    /**************************************
     *          COMMONS METHODS           *
     **************************************/

    static getType() {
        return Block.WOOD_TOWER;
    }

    getShape() {
        return [
            [1, 1, 1],
            [1, 1, 1],
            [1, 1, 1]
        ];
    }

    static getClass() {
        return "tower wood_tower";
    }

    static getCost() {
        return new Cost(1, 1, 1);
    }

}