"use strict";

class WoodTower extends Block {

    constructor(board) {
        super();

        this.damages = 5;
        this.health = 130;
        this.range = 6;

        this.aim = {};
    }

    get_target_distance(x, y) {
        let center = this.getCenterInPixel();
        return get_distance(center.x, center.y, x, y);
    }

    get_target_angle(x, y) {
        let center = this.getCenterInPixel();
        return get_target_angle(center.x, center.y, x, y)
    }

    draw_line() {
        // todo: récupérer le vrai millieu de la pièce
        let line = $('<div>').addClass('line').css({
            'top': '30px',
            'left': '30px'
        });
        $('#' + this.getCellID()).children('div').append(line);
        return line;
    }

    update_line() {
        this.aim.line.css({
            'width': this.aim.distance + 'px',
            'transform': 'rotate(' + this.aim.angle + 'deg)'
        });
    }

    find_enemy() {
        let distance, closest;
        closest = null;
        $.each(this.zombieController.zombies, function (index, zombie) {
            distance = this.get_target_distance(zombie.currentx, zombie.currenty);
            if (closest === null || distance <= this.range * Board.getSize() && distance < this.get_target_distance(closest.currentx, closest.currenty)) {
                closest = zombie;
            }
        }.bind(this));
        this.aim.target = closest;
    }

    target_enemy() {
        let target, x, y;

        target = this.aim.target;
        //todo il te manque une case....
        x = target.currentx + Board.getSize();
        y = target.currenty + Board.getSize();
        this.aim.angle = this.get_target_angle(x, y);
        this.aim.distance = this.get_target_distance(x, y);

        if (this.aim.distance > this.range * Board.getSize()) {
            this.aim.line.hide();
            this.aim.target = null;
            return;
        }
        if (target.health <= 0) {
            this.zombieController.killZombie(target.id);
             this.aim.line.hide();
             this.aim.target = null;
            return
        }

        this.aim.target.get_damage(this.damages);
        this.update_line();
    }

    startNight(zombieController) {
        this.zombieController = zombieController;
        this.aim.line = this.draw_line();
        this.aim.target = null;
    }

    update() {
        if (!this.aim.target) {
            this.find_enemy();
            return;
        }

        this.aim.line.show();
        this.target_enemy();
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

    static getTypeClass() {
        return "tower wood_tower";
    }

    static getCost() {
        return new Cost(1, 1, 1);
    }

}