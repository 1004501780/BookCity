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
            console.log(res.item.fiction_id)
            render({ isSearch: false, title: res.item.title }, $('#header-tpl'), $('#render-header'));
            render(res, $('#detailD'), $('.wrap'));
            $('.none').show();
            $('.icon-back').on('click', function() {
                history.go(-1);
            })
            $('.icon-home').on('click', function() {
                window.location.href = 'http://localhost:8000/'
            });
            //点击开始阅读
            $('.book-dash-text').on('click', function() {
                window.location.href = `../../page/artical.html?id=${Id.fiction_id}`;
            })
        },
        error: function(err) {
            console.warn(err);
        }
    });
});