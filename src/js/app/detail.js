require(['jquery', 'render', 'text!header', 'getRequest'], function($, render, HEader, getRequest) {
    $("body").append(HEader);
    var Id = getRequest();

    $.ajax({
        url: "/api/detailNum",
        data: {
            id: Id.fiction_id,
        },
        dataType: "json",
        success: function(res) {
            render({ isSearch: false, title: res.item.title }, $('#header-tpl'), $('#render-header'));
            render(res, $('#detailD'), $('.wrap'));
            $('.icon-back').on('click', function() {
                history.go(-1);
            })

        },
        error: function(err) {
            console.warn(err);
        }
    });
});