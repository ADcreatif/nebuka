class SkillTree{
	constructor(character){
		this.roots = [];
		this.nodes = [];
		this.character = character;
        let explorerNode = this.createSkillNode(new ExplorerSkill);
		explorerNode.addChildNode(  this.createSkillNode(new LuckySkill));

		this.addRootNode(explorerNode);
		this.addRootNode(this.createSkillNode(new ResearchSkill));
		this.addRootNode(this.createSkillNode(new EnduranceSkill));
	}

	createSkillNode(skill){
		return new TreeNode(skill, this.character);
	}

	addRootNode(node){
		this.nodes.push(node);
		this.roots.push(node);
	}

	learnAndGetSkill(skillId){
        let node = this.findNode(skillId);
        if (node !== null)
		{
			node.learned = true;
			return node.skill;
		}
		return null;
	}

	findNode(skillId){
        this.resetVisitedNodes();
        for (let i = 0; i < this.nodes.length; i++)
		{
            let node = this.nodes[i];
            if (node.getSkillId() === skillId) {
				return node
			}
			else
			{
				
				let skillNode = node.findSkill(skillId);
                if (skillNode !== null)
					return skillNode;

			}
		}

		return null;
	}

	resetVisitedNodes(){
        for (let i = 0; i < this.nodes.length; i++)
		{
			this.nodes[i].resetVisited();
		}
	}

	getDisplay(){
		let contents = $('<div>');
        for (let i = 0; i < this.roots.length; i++) {
            contents.append(this.roots[i].getDisplay());
        }
        return contents.children();
	}
}

class TreeNode{
	constructor(skill, character){
       this.skill = skill;
       this.learned = false;
       this.requirements = [];
       this.childs = [];
       this.character = character;

       // property used for search algorithm
       this.visited = false;
    }

    resetVisited(){
    	if(this.visited){
    		this.visited = false;
	    	for (let i = 0; i < this.childs.length; i++) {
	    		
	    		this.childs[i].resetVisited();
	    	}
    	}
    	
    }

    addChildNode(node)
    {
    	this.childs.push(node);
    	node.addRequirement(this);
    }

    addRequirement(node)
    {
    	this.requirements.push(node);
    }

    getSkillId(){
    	return this.skill.getSkillId();
    }

    getDisplay(){
    	let contents = $('<div>');
    	contents.append(this.drawSkill());
    	for (let i = 0; i < this.childs.length; i++) {
    		contents.append(this.childs[i].getDisplay());
    	}
    	return contents;
    }

    findSkill(skillId){
    	if(!this.visited){
    		this.visited = true;
	    	for(let i = 0; i < this.childs.length; i++){

                if (this.childs[i].skill.getSkillId() === skillId)
	    		{
	    			return this.childs[i]
	    		}
	    		else{
	    			let node  = this.childs[i].findSkill(skillId);
                    if (node !== null)
	    				return node;
	    		}
	    	}
    	}

    	return null;
    	
    }

    drawSkill(){
    	let contents = $('<div>').addClass("skill");
        let content = $('<p><strong>' + this.skill.name + "</strong><br><em> " + this.skill.description + "</em></p>");
    	contents.append(content);
    	if ( this.learned ){
    		contents.append($("<p> learned</p>"));
    	}
    	else{
            let learnButton = $("<button class='learn' data-skill_id='" + this.skill.getSkillId() + "' data-char_id='" + this.character.id + "'>Learn Skill</button> ");
    		contents.append($("<p> not learned  </p>").append(learnButton));
    		
    	}
    	return contents;
    }
}