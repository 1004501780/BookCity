require(['jquery', 'handlebars', 'swiper', 'bscroll'], function($, handlebars, Swiper, BScroll) {

    $.ajax({
        url: "/api/index",
        dataType: "json",
        success: function(res) {
            console.log(res)
        },
        error: function(error) {
            console.warn(error)
        }
    });

});