class BlockFactory {

    static getBlock(type, display, quantity) {
        let block;

        switch (type) {
            case Block.WOOD_WALL :
                block = new WallWood();
                break;
            case Block.STONE_WALL :
                block = new WallStone();
                break;
            case Block.STEEL_WALL :
                block = new WallSteel();
                break;
            case Block.WOOD_TOWER:
                block = new TowerBlock();
                break;
            default:
                console.log(type +' is not a block type')
        }

        if (display == true)
            return Block.drawBlock(quantity);

        return block;
    }

    static getBlockDisplay(type, quantity){
        switch (parseInt(type)){
            case Block.WOOD_WALL:
                return WallWood.drawBlock(quantity);
                break;
            case Block.STONE_WALL:
                return WallStone.drawBlock(quantity);
                break;
            case Block.STEEL_WALL:
                return WallSteel.drawBlock(quantity);
                break;
            case Block.WOOD_TOWER:
                return TowerBlock.drawBlock(quantity);
                break
        }
        return null;
    }
}
