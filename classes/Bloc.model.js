/**
 * Created by Alan on 07/10/2017.
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