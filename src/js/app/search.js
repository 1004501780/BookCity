require(['jquery', 'render', 'swiper', 'bscroll', 'text!header', 'text!bookLs'], function($, render, swiper, BScroll, HEader, bookLs) {
    $("body").append(HEader);
    $("body").append(bookLs);
    render({ isSearch: true }, $('#header-tpl'), $('#render-header'));
    $('.icon-back').on('click', function() {
        history.go(-1);
    })

    $('.search-btn').on('click', function() {
        var val = $('.ipt').val();
        Seach(val)
    })


    //input事件删除清空和li点击搜索
    $('.ipt').on('input', function() {
        var val = $(this).val();
        if (!val) {
            $('#Tags').show();
            $('#Tags2').hide();
            $('.book-list').html("");
        }
    })
    $('.u-tag').on('click', function() {
        var val = $(this).text();
        $('.ipt').val(val);
        Seach(val)
    })


    //查找列表渲染
    function search(val) {
        $.ajax({
            url: '/api/searchNum',
            dataType: "json",
            data: {
                key: val
            },
            success: function(res) {
                console.log(res)
                if (!res) {
                    $('.book-list').html(`<p class='nulls'>暂无搜索内容</p>`)
                } else {
                    var Seachdata = res.items;
                    render(Seachdata, $('#book-seach'), $('.book-list'), true);
                }
            },
            error: function(error) {
                console.log(this.url)
                console.warn(error)
            }
        });
    }


    function Seach(val) {
        $('#Tags').hide();
        $('#Tags2').show();
        if (!val) {
            $('.book-list').html(`<p class='nulls'>输入内容为空</p>`)
        } else {
            search(val);
        }
    }
});