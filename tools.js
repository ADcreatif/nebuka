"use strict";

function getBiggestArraySize(array) {

    let lengths = array.map(function (a) {
        return a.length;
    });

    // lengths.indexOf(Math.max.apply(Math, lengths));
    return Math.max.apply(Math, lengths);
}

function get_distance(x, y, targetx, targety) {
    return Math.sqrt(Math.pow(targetx - x, 2) + Math.pow(targety - y, 2));
}

function get_target_angle(x, y, targetx, targety) {
    return Math.atan2(targety - y, targetx - x) * 180 / Math.PI;
}

function getRoll100() {
    return getRandom(0, 100);
}

function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function save_local_storage(key, data) {
    window.localStorage.setItem(key, JSON.stringify(data));
}
function get_local_storage(key) {
    return JSON.parse(window.localStorage.getItem(key)) || [];
}


// jQuery Extentions
jQuery.fn.extend({
    // blinking a DOMElement
    blink: function (css_class) {
        if (css_class) {
            $(this).addClass(css_class);
            setTimeout(function () {
                $(this).removeClass(css_class)
            }.bind(this), 100);
        } else {
            $(this).fadeOut(100).fadeIn(100);
        }
        return this;
    }
});
