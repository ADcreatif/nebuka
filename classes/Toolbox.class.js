/**
 * Created by Alan on 06/10/2017.
 */

class Bloc{

    constructor(type, level, quantity){
        this.type = type;
        this.level = level;
        this.quantity = quantity;

    }

    getClass(){
        let visual = {
            wall:['wall_wood', 'wall_steel'],
            tower:['tower_wood', 'tower_steel']
        };

        return 'bloc '+ this.type+' '+visual[this.type][this.level];
    }

    drawBlock(){
        let quantity = $('<span>').text(this.quantity);

        return $('<div>').addClass(this.getClass()).attr('draggable','').append(quantity)
    }
}

let blocs = [
    {type:'wall', level : 0, quantity:10},
    {type:'wall', level : 1, quantity:10},
    {type:'tower', level : 5, quantity:10},
];

class Toolbox{

    constructor(){

        this.toolbox = $('#toolbox');

    }

    drawToolBox(){
        let contents = $('<div>');
        $.each(blocs,function(){
            let bloc = new Bloc(this.type, this.level, this.quantity);
            contents.append(bloc.drawBlock());
        });
        this.toolbox.append(contents);
    }
}