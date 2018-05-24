require(['jquery', 'render', 'text!header', 'getRequest', 'text!bookLr'], function($, render, HEader, getRequest, bookLr) {
    $("body").append(HEader);
    $("body").append(bookLr);
    $.ajax({
        url: "/api/bookmains",
        dataType: "json",
        success: function(res) {
            render({ isSearch: false, title: "本周最火" }, $('#header-tpl'), $('#render-header'));
            $('.icon-back').on('click', function() {
                history.go(-1);
            })
            render(res.items, $("#l-r-tpl"), $("#channel_list_main"));
            $('.nones').show();
        },
        error: function(err) {
            console.warn(err);
        }
    });
});