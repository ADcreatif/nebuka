class Skill{
    constructor(name, description){
        this.name = name
        this.description = description;
        this.skillId = this.getSkillId();
    }

    getSkillId(){
    	return -1;
    }

    applyEffect(character){

    }
}

Skill.RESEARCH = 1;
Skill.EXPLORER = 2;
Skill.ENDURANCE = 3;
Skill.LUCKY = 4;

class SkillFactory{

}

class ResearchSkill extends Skill{
	constructor(){
		super("Research", "+1 Research Point per turn");
	}

	getSkillId(){
    	return Skill.RESEARCH;
    }

     applyEffect(character){
        character.researchPointPerTurn ++;
    }
}

class LuckySkill extends Skill{
	constructor(){
		super("Lucky", "+20% chance to find resources when exploring");
	}

	getSkillId(){
    	return Skill.LUCKY;
    }

    applyEffect(character){
    	character.explorationSuccess += 20;
    }
}

class EnduranceSkill extends Skill{
	constructor(){
		super("Endurance", "+1 Action per turn");
	}

	getSkillId(){
    	return Skill.ENDURANCE;
    }

	applyEffect(character){
        character.actionPointsPerTurn ++;
    }
}

class ExplorerSkill extends Skill{

	constructor(){
		super("Explorer", "+1 Resource when exploring");
	}

	getSkillId(){
    	return Skill.EXPLORER;
    }

    applyEffect(character){
    	character.explorationResourceBonus ++;
    }
}
