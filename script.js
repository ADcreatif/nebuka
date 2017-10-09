/**
 * Created by Alan on 06/10/2017.
 */
"use strict";

let inStorage = [
    {type:'wall', level : 0, quantity:10},
    {type:'wall', level : 1, quantity:4},
    {type:'tower', level : 5, quantity:5},
];

let inBoard = {
    6: {type: 'wall', level: 1, x: 2, y: 3, blocID: 6},
    3: {type: 'wall', level: 1, x: 4, y: 9, blocID: 3},
    1: {type: 'wall', level: 0, x: 21, y: 5, blocID: 1}
};

let board;
let toolbox;

$(function(){
    board =  new Board();

    toolbox =  new Toolbox();
    toolbox.refreshToolBox();

    $('[draggable]').draggable();

});