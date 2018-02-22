class Game {
    constructor() {
        this.characters = [new Character("alan"), new Character("dany")];

        this.actionDiv = $("#actions");
        this.dataDiv = $("#data");
        this.charactersDiv = $("#character");
        this.researchPoints = 0;
        this.turn = 0;

        this.inventory = new Inventory;
        this.board = new Board();
        this.renderBoard = new RenderBoard(this.board);
        this.resources = new ResourceStock();
        this.zombieController = new ZombieController(this.board);
       

     
        //this.interval = null;

    }

    setCharacterPosition(characterId, position){
        let c = this.characters[characterId];
        c.position = position;
       this.displayCharactersOnBoard();

    }

    start() {

        this.displayCharactersOnBoard();

        this.setCharacterPosition(0,50);
        this.displayGameActions();

        // todo : removehere
        this.resources.addWood(7);
        this.resources.addStone(8);
        this.resources.addSteel(9);

        this.resources.displayResources();
        this.inventory.displayInventory();

        this.nextTurn();
    }

    displayGameData() {
        this.dataDiv.empty();

        this.dataDiv.append($("<p> Turn " + this.turn + "</p>"));
        this.dataDiv.append($("<p> Research points " + this.researchPoints + "</p>"));
    }

    displayGameActions() {
        this.actionDiv.empty();

        let nextTurn = $("<button>Next Turn</button>").click(function () {
            this.nextTurn();
        }.bind(this));
        this.actionDiv.append(nextTurn);
    }




    /**
     * TODO : move relatives functions to player's class
     */
    nextTurn() {
        this.turn++;
        this.calculateResearchPoints();
        this.executeTurnActions();
        this.updateDisplay();
    }

    startNight()
    {
        this.board.colorPath(0, 0, 18, 7);

        this.zombieController.initNight();
        Game.FUNCTIONS.push(this.zombieController.moveZombies.bind(this.zombieController));
    }

    startInterval()
    {
        setInterval(function()
        {
            for( let i = 0; i < Game.FUNCTIONS.length; i++)
            {
                Game.FUNCTIONS[i].call();
            }
        }.bind(this)
        , Game.TICK_PER_SECOND);
    }


    findTarget(board,character,zombies){
        
    }

  
   

    updateDisplay() {
        this.displayGameData();
        this.displayCharactersStats();

    }
    executeTurnActions() {
        for (let i = 0; i < this.characters.length; i++) {
            this.characters[i].newTurnAction();
        }
    }
    calculateResearchPoints() {
        let points = 0;
        for (let i = 0; i < this.characters.length; i++) {
            points += this.characters[i].researchPointPerTurn;
        }

        this.researchPoints += points;
    }
    displayCharactersStats() {
        this.charactersDiv.empty();
        for (let i = 0; i < this.characters.length; i++) {
            this.displayCharacterSkill(this.characters[i]);
        }
    }
    displayCharactersOnBoard(){

         for (let i = 0; i < this.characters.length; i++) {
            console.log(this.board.board.find("#player_"+this.characters[i].id));
            this.board.board.find("#player_"+this.characters[i].id).remove();
            this.board.board.append(this.characters[i].getBoardDisplay());
        }
    }

    displayCharacterSkill(character) {
        this.charactersDiv.append(character.getStatsDisplay());
    }
    getCharacterById(id) {
        for (let i = 0; i < this.characters.length; i++) {
            if (this.characters[i].id === id)
                return this.characters[i];
        }
        return null;
    }
    learnSkill(characterId, skillId) {
        let char = this.getCharacterById(characterId);
        if (char !== null) {
            console.log(char.name + " is learning skill " + skillId);
            char.learnSkill(skillId);
        }
    }
    doExploration(characterId) {
        let char = this.getCharacterById(characterId);

        if (char.currentActionPoints < 2) {
            console.log("not enough action points");
            return;
        }

        let roll = getRoll100();
        if (roll < char.explorationSuccess) {
            let resourceCount = 2;
            for (let i = 0; i < resourceCount; i++)
                this.getRandomResource();

            for (let i = 0; i < char.explorationResourceBonus; i++) {
                console.log(char.name + " found extra resources ");
                this.getRandomResource();
            }

            this.resources.displayResources();
        }
        else {
            console.log("exploration failed");
        }

        char.currentActionPoints -= 2;
    }
    getRandomResource() {
        let roll = getRoll100();

        if (roll <= 33) {
            console.log("found Wood");
            this.resources.addWood(1);
        }
        else if (roll <= 66) {
            console.log("found Stone");
            this.resources.addStone(1);
        }
        else {
            console.log("found Steel");
            this.resources.addSteel(1);
        }
    }


}

Game.TICK_PER_SECOND = 1000/60;
Game.FUNCTIONS = [];