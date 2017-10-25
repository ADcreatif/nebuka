class Game{
	 constructor( ){
	 	this.characters = [new Character("alan"), new Character("dany")];
	 	this.actionDiv = $("#actions");
	 	this.dataDiv = $("#data");
	 	this.charactersDiv = $("#character");
	 	this.researchPoints = 0;
	 	this.turn = 0;
	 	this.inventory = new Inventory;
	 	this.resources = new ResourceStock($("#resources"));

	 }

	 start(){
	 	this.displayGameActions();
	 	this.nextTurn();
	 }

	 displayGameData(){
	 	this.dataDiv.empty();

	 	this.dataDiv.append($("<p> Turn " + this.turn + "</p>"));
	 	this.dataDiv.append($("<p> Research points " + this.researchPoints + "</p>"));
	 }

	 displayGameActions(){
	 	this.actionDiv.empty();

	 	let nextTurn = $("<button>Next Turn</button>").click(function()
	 	{
	 		this.nextTurn();
	 	}.bind(this));
	 	this.actionDiv.append(nextTurn);
	 }

	 nextTurn(){
	 	this.turn ++;
	 	this.calculateResearchPoints()
	 	this.executeTurnActions();
	 	this.updateDisplay();
	 }

	 updateDisplay(){
	 	this.displayGameData();
	 	this.displayCharactersStats();
	 }

	 executeTurnActions(){
	 	for(let i = 0; i < this.characters.length; i++)
	 	{
	 		 this.characters[i].newTurnAction();
	 	}
	 }

	 calculateResearchPoints(){
	 	let points = 0;
	 	for(let i = 0; i < this.characters.length; i++)
	 	{
	 		points += this.characters[i].researchPointPerTurn;
	 	}

	 	this.researchPoints += points;
	 }

	 displayCharactersStats(){
	 	this.charactersDiv.empty()
	 	for(let i = 0; i < this.characters.length; i++)
	 	{
	 		this.charactersDiv.append($("<hr />"));
	 		

	 		this.displayCharacterSkill( this.characters[i]);
	 	}
	 }

	 displayCharacterSkill(character){
	 	this.charactersDiv.append(character.getStatsDisplay());
	 }

	 getCharacterById(id){
	 	for(let i = 0; i < this.characters.length; i++)
	 	{
	 		if(this.characters[i].id == id)
	 			return this.characters[i];
	 	}
	 	return null;
	 }

	 learnSkill(characterId, skillId){
	 	let char = this.getCharacterById(characterId);
	 	if( char != null){
	 		console.log(char.name + " is learning skill " + skillId)
	 		char.learnSkill(skillId);
	 	}
	 }

	 doExploration(characterId){
	 	let char = this.getCharacterById(characterId);

	 	if( char.currentActionPoints < 2){
	 		console.log("not enough action points");
	 		return;
	 	}

	 	var roll = this.getRoll100();
	 	if( roll < char.explorationSuccess){
	 		var resourceCount = 2;
	 		for( let i = 0; i< resourceCount; i++)
	 			this.getRandomResource();

	 		for( let i = 0; i< char.explorationResourceBonus; i++){
	 			console.log( char.name + " found extra resources ")
	 			this.getRandomResource();
	 		}
	 		
	 		this.resources.displayResources();	
	 	}
	 	else{
	 		console.log("exploration failed");
	 	}

	 	char.currentActionPoints -= 2;
	 }

	 getRandomResource(){
	 	var roll = this.getRoll100();

	 	if( roll <= 33){
	 		console.log("found Wood");
	 		this.resources.addWood(1);
	 	}
	 	else if( roll <= 66){
	 		console.log("found Stone");
	 		this.resources.addStone(1);
	 	}
	 	else{
	 		console.log("found Steel");
	 		this.resources.addSteel(1);
	 	}
	 }

	 getRoll100(){
	 	return this.getRandomNumber(0,100);
	 }

	 getRandomNumber(min,max){
	 	return Math.floor(Math.random() * (max - min +1)) + min;
	 }
}