class Character{
    constructor(name){
        this.name = name;
        this.skillTree = new SkillTree(this);
        this.researchPointPerTurn = 2;
        this.actionPointsPerTurn = 2;
        this.skillPoint = 0;
        this.currentActionPoints = 0;
        this.id = Character.COUNT;
        Character.COUNT++;

        // exploration

        this.explorationSuccess = 50;
        this.explorationResourceBonus = 0;
    }

    learnSkill(skillId){
        let skill = this.skillTree.learnAndGetSkill(skillId);
        skill.applyEffect(this);
    }

    newTurnAction(){
        this.currentActionPoints = this.actionPointsPerTurn;
    }


    getStatsDisplay(){
        let content = $("<div>").addClass("characterStats");
        content.append($('<p> Character Name : ' + this.name + "</p>"));
        content.append($('<p> Action points : ' + this.currentActionPoints + "</p>"));
        content.append(this.getActionDisplay());
        content.append(this.skillTree.getDisplay());
        return content;
    }

    // TODO implement proper actions
    getActionDisplay(){
        let content =  $("<div>").addClass("character_actions");

        content.append(  $("<button class='explore' data-char_id='"+this.id+"'>Exploration</button>"));
        return content;
    }

}

Character.COUNT = 0;

