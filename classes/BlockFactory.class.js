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

    static getBlockDisplay(type, quantity, level){
        switch (type){
            case Block.WOOD:
                return WoodBlock.drawBlock(quantity, level);
                break;
            case Block.STONE:
                return StoneBlock.drawBlock(quantity, level);
                break;
            case Block.STEEL:
                return SteelBlock.drawBlock(quantity, level);
                break;
            case Block.TOWER:
                return TowerBlock.drawBlock(quantity, level);
                break
        }
        return null;
    }
}
