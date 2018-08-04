class Wall extends Block {

    static getTypeClass() {
        return "wall";
    }

    static getCost() {
        return new Cost(1, 0, 0);
    }

}

class WoodWall extends Wall {
    static getType() {
        return Block.WOOD_WALL;
    }

    static getTypeClass() {
        return "wall wood_wall";
    }

    static getCost() {
        return new Cost(0, 1, 0);
    }
}

class StoneWall extends Wall {
    static getType() {
        return Block.STONE_WALL;
    }

    static getTypeClass() {
        return "wall stone_wall";
    }

    static getCost() {
        return new Cost(0, 0, 1);
    }
}

class SteelWall extends Wall {
    static getType() {
        return Block.STEEL_WALL;
    }

    static getTypeClass() {
        return "wall steel_wall";
    }

    static getCost() {
        return new Cost(1, 0, 0);
    }
}