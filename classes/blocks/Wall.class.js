class Wall extends Block {

    static getClass() {
        return "block wall";
    }

    static getCost() {
        return new Cost(1, 0, 0);
    }

}

class WoodWall extends Wall {
    static getType() {
        return Block.WOOD_WALL;
    }

    static getClass() {
        return "block wall wood_wall";
    }

    static getCost() {
        return new Cost(0, 1, 0);
    }
}

class StoneWall extends Wall {
    static getType() {
        return Block.STONE_WALL;
    }

    static getClass() {
        return "block wall stone_wall";
    }

    static getCost() {
        return new Cost(0, 0, 1);
    }
}

class SteelWall extends Wall {
    static getType() {
        return Block.STEEL_WALL;
    }

    static getClass() {
        return "block wall steel_wall";
    }

    static getCost() {
        return new Cost(1, 0, 0);
    }
}