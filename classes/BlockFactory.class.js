class BlockFactory
{
	static createBlock(type) {
   		switch (type){
   			case BlockFactory.WOOD:
   				return new WoodBlock();
   			break;
   			case BlockFactory.STONE:
   				return new StoneBlock();
   			break
   		}
   		return null;
  	}

  	static getBlockDisplay(type, quantity, level){
  		switch (type){
   			case Block.WOOD:
   				return WoodBlock.drawBlock(quantity, level);
   			break;
   			case Block.STONE:
   				return StoneBlock.drawBlock(quantity, level);
   			break
   			case Block.STEEL:
   				return SteelBlock.drawBlock(quantity, level);
   			break
   			case Block.TOWER:
   				return TowerBlock.drawBlock(quantity, level);
   			break
   		}
   		return null;
  	}
}

