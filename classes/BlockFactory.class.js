class BlockFactory
{
	static createBlock(type) {
   		switch (type){
   			case BlockFactory.WOOD:
   				return new WallWood();
   			break;
   			case BlockFactory.STONE:
   				return new WallStone();
   			break
   		}
   		return null;
  	}

  	static getBlockDisplay(type, material, quantity){
  		switch (type){
   			case Block.WALL:
   				switch(material){
					case Block.WOOD :
                        return WallWood.drawBlock(quantity);
                        break;
					case Block.STONE :
                        return WallStone.drawBlock(quantity);
                        break;
					case Block.STEEL :
                        return WallSteel.drawBlock(quantity);
                        break;
				}

   			break;
   			case Block.TOWER:
                switch(material){
                    case Block.WOOD :
                        return TowerBlock.drawBlock(quantity, material);
                        break
                }
                break
   		}
   		return null;
  	}
}

