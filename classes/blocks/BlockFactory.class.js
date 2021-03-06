class BlockFactory {

    static getBlock(type) {
        let block;

        switch (type) {
            case Block.WOOD_WALL :
                block = new WoodWall();
                break;
            case Block.STONE_WALL :
                block = new StoneWall();
                break;
            case Block.STEEL_WALL :
                block = new SteelWall();
                break;
            case Block.WOOD_TOWER:
                block = new WoodTower();
                break;
            default:
                console.log(type + ' is not a block type')
        }

        return block;
    }

    static getBlockDisplay(type, quantity) {
        switch (parseInt(type)) {
            case Block.WOOD_WALL:
                return WoodWall.drawBlock(quantity);
                break;
            case Block.STONE_WALL:
                return StoneWall.drawBlock(quantity);
                break;
            case Block.STEEL_WALL:
                return SteelWall.drawBlock(quantity);
                break;
            case Block.WOOD_TOWER:
                return WoodTower.drawBlock(quantity);
                break
        }
        return null;
    }
}
