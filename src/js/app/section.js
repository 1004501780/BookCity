require(['jquery', 'render', 'text!header', 'getRequest', 'bscroll'], function($, render, HEader, getRequest, bscroll) {
    $("body").append(HEader);
    var Id = getRequest();
    var chapter_id = Id.chapter_id;
    $.ajax({
        url: "/api/sectionNum",
        data: {
            id: Id.fiction_id,
        },
        dataType: "json",
        success: function(res) {
            render({ isSearch: false, title: "目录" }, $('#header-tpl'), $('#render-header'));
            render(res, $('#fiction_toc'), $('.fiction-toc'));
            var scroll = new bscroll('.chapter-wrap');
            var target;
            if (chapter_id) {
                target = chapter_id;
            } else {
                target = res.item.toc.length - 1;
            }
            scroll.scrollToElement($('.chapter-wrap li').eq(target)[0]);
            $('.chapter-wrap li').eq(target).addClass('colors').siblings().removeClass('colors')

            $('.icon-back').on('click', function() {
                history.go(-1);
            })
        },
        error: function(err) {
            console.warn(err);
        }
    });
});