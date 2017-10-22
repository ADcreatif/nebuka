"use strict";

(function($){
    $.fn.collapse = function(){

        return this.each(function() {
            let content = $(this);
            let cover = $('<div>').addClass('cover');
            let wrapper = $('<div>').addClass('warper');

            wrapper
                .mouseenter(openBar)
                .mouseout(closeBar)
                .addClass('collapsed')
                .data('width', this.width);

            content.append(cover)
                .wrap(wrapper);
        });


        function openBar(){
            let width = $(this).data('width');
           /* $(this).animate(
                {width: "inherit", marginLeft: "inherit"},
                {duration : 1000, queue:false, easing :'swing'});*/
            $(this).removeClass('collapsed');
        }

        function closeBar(){
            let width = $(this).data('width');
          /*  console.log(width);
            $(this).animate({width:'20px', marginLeft: width+'px'},
            {duration : 1000, queue : false, easing :'swing'});*/
            $(this).addClass('collapsed');
        }
    }
}( jQuery ));

/*
$(function(){
    $('.collapse').collapse();
});*/
