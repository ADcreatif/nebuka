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
                break
            default:
                console.log(type +' is not a block type')
        }

        if (display == true)
            return block.drawBlock(quantity);

        return block;
    }
}
