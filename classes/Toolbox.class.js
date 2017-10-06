/**
 * Created by Alan on 06/10/2017.
 */



let blocs = [
    {type:'wall', level : 0, quantity:10},
    {type:'wall', level : 1, quantity:4},
    {type:'tower', level : 5, quantity:5},
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