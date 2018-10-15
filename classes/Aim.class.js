"use strict";

class Aim {

    constructor(rateOfFire) {
        this.distance = 0;
        this.angle = 0;
        this.target = null;
        this.line = $();
        this.rateIOfFire = rateOfFire; // milleseconds
        this.counter = 0;
    }

    update_line() {
        this.line
            .show()
            .css({
                'width': Math.floor(this.distance) + 'px',
                'transform': 'rotate(' + Math.floor(this.angle) + 'deg)'
            });
    }

    draw_line(x, y) {
        let lineID, line, renderBoard;
        // todo: récupérer le vrai millieu de la pièce

        lineID = Date.now();
        line = $('<div>')
            .addClass('line')
            .attr('id', 'line' + lineID)
            .css({'top': y + 'px', 'left': x + 'px'});

        renderBoard = $('#render-board');
        renderBoard.append(line);
        this.line = renderBoard.find('#line' + lineID);
    }

}