/**
 * Created by Alan on 07/10/2017.
 */
class Bloc{

    constructor(type, level, quantity){
        this.type = type;
        this.level = level;
        this.quantity = quantity || 1;
        this.blocID = null;

    }

    getClass(){
        let visual = {
            wall:['wall_wood', 'wall_steel'],
            tower:['tower_wood', 'tower_steel']
        };

        return 'bloc '+ this.type+' '+visual[this.type][this.level];
    }

    addBoardInfos(blocID){
        this.blocID = parseInt(blocID);
    }
    drawBlock(){
        let quantity = $('<span>').text(this.quantity);
        let bloc = $('<div>')
            .addClass(this.getClass())
            .attr('draggable','')
            .append(quantity);

        if(this.blocID){
            bloc.attr('id', 'blocID_' + this.blocID)
                .data('blocID', this.blocID);
        }
        return bloc;
    }
}