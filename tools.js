"use strict";

function getBiggestArraySize(array) {

    let lengths = array.map(function (a) {
        return a.length;
    });

    // lengths.indexOf(Math.max.apply(Math, lengths));
    return Math.max.apply(Math, lengths);
}

/** returns a distance in pixels, between two points **/
function get_distance(originX, originY, targetX, targetY) {
    return Math.sqrt(Math.pow(targetX - originX, 2) + Math.pow(targetY - originY, 2));
}

/** returns an angle from origin in degree **/
function get_angle(originX, originY, targetX, targetY) {
    return Math.atan2(targetY - originY, targetX - originX) * 180 / Math.PI;
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
