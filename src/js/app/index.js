require(['jquery', 'render', 'swiper', 'bscroll', 'text!bookLr', 'text!bookLb', 'GetSlideDirection'], function($, render, swiper, BScroll, bookLr, bookLb, GetSlideDirection) {
    $("body").append(bookLr);
    $("body").append(bookLb);

    $.ajax({
        url: "/api/index",
        dataType: "json",
        success: function(res) {
            //渲染首页轮播
            var bannerDat = res.items[0].data;
            render(bannerDat, $('#slide-tpl'), $('.home-scroll .swiper-wrapper'));
            var citySwiper = new swiper('.home-scroll', {
                autoplay: true,
                loop: true
            });

            //渲染本周热门
            var liDat = res.items[1].data;
            render(liDat, $('#slide-li'), $('.main-card .book-table'));

            //渲染重磅推荐
            var recommendData = res.items[2].data.data;
            recommendData[0].isShowNum = true;
            var firstData = [recommendData[0]];
            render(firstData, $("#l-r-tpl"), $("#channel_list"));
            render(recommendData.slice(1), $("#recommed-list-tpl"), $("#channel_list"));

        },
        error: function(error) {
            console.warn(error)
        }
    });


    //页面tab切换
    var citySwiper = new swiper('.city-swiper', {
        on: {
            slideChangeTransitionStart: function() {
                var index = this.activeIndex;
                if (index == 1) {
                    $('.line').addClass('move');
                } else {
                    $('.line').removeClass('move');
                }
                $('.tab-item').eq(index).addClass('active').siblings().removeClass('active');
            }
        }
    });
    $(".tab-item").on('click', function() {
        var index = $(this).index();
        citySwiper.slideTo(index);
        if (index == 1) {
            $('.line').addClass('move');
        } else {
            $('.line').removeClass('move');
        }
        $(this).addClass('active').siblings().removeClass('active');
    })



    //上拉刷新和下拉加载
    var startX, startY;
    document.addEventListener('touchstart', function(ev) {
        startX = ev.touches[0].pageX;
        startY = ev.touches[0].pageY;
    }, false);
    document.addEventListener('touchend', function(ev) {
        var endX, endY;
        endX = ev.changedTouches[0].pageX;
        endY = ev.changedTouches[0].pageY;
        var direction = GetSlideDirection(startX, startY, endX, endY);
        switch (direction) {
            case 3:
                citySwiper.slideTo(1);
                break;
            case 4:
                citySwiper.slideTo(0);
                break;
            default:
        }
    }, false);

    var cityScroll = new BScroll('.city-scroll', {
        probeType: 2,
        click: true
    });
    var _parent = $('.load-in');
    var htmlFz = $('html').css('fontSize');
    var realSize = parseFloat(htmlFz) * 44 / 37.5;

    //上拉加载分页
    var pageNum = 1, //默认加载第一页
        total, //总页数
        count = 10; //每页数据的条数

    cityScroll.on('scroll', function() {
        if (this.y < this.maxScrollY - realSize) {
            if (pageNum > total) {
                _parent.attr('up', '-----我是有底线的------')
            } else {
                _parent.attr('up', '释放加载...');
            }
        } else if (this.y < this.maxScrollY - realSize / 2) {
            if (pageNum > total) {
                _parent.attr('up', '-----我是有底线的------')
            } else {
                _parent.attr('up', '上拉加载...');
            }
        } else if (this.y > realSize) {
            _parent.attr('down', '释放刷新...');
        } else if (this.y > realSize / 2 && this.y < realSize) {
            _parent.attr('down', '下拉刷新...');
        }
    })

    cityScroll.on('scrollEnd', function() {
        if (pageNum > total) {
            _parent.attr('up', '-----我是有底线的------')
        } else {
            _parent.attr('up', '上拉加载...');
        }
        _parent.attr('down', '下拉刷新...')
    })

    cityScroll.on('touchEnd', function() {
        if (_parent.attr('up') === '释放加载...') {
            if (pageNum > total) {
                return false
            } else {
                loadMore(pageNum);
                pageNum++;
            }
        } else if (_parent.attr('down') === '释放刷新...') {
            window.location.reload();
        }
    })

    function loadMore(pageNum) {
        $.ajax({
            url: '/api/recommend',
            dataType: 'json',
            data: {
                pageNum: pageNum,
                count: count
            },
            success: function(res) {
                total = res.total / count;
                render(res.items, $("#l-r-tpl"), $("#channel_list_main"));
                cityScroll.refresh();
            },
            error: function(error) {
                console.warn(error)
            }
        })
    }



    //分页渲染
    $.ajax({
        url: "/api/bookmains",
        dataType: "json",
        success: function(res) {
            var bookliDat = res.items;
            render(bookliDat, $('#book-list'), $('#book-list_b'));
            $('.shelf_switch').on('click', function() {
                $('#book-list_b').toggleClass('book-list_row');
                if ($('#book-list_b')[0].className === 'book-list') {
                    $(this).css('background', "url(http://image.read.duokan.com/mfsv2/download/fdsc3/p01yLF3fEj8l/b7UfAdlfufQKML.png) no-repeat center")
                } else {
                    $(this).css('background', "url(http://image.read.duokan.com/mfsv2/download/fdsc3/p014nDc0lHYW/lDeZ3lL4nmgnmf.png) no-repeat center")
                }
            })
        },
        error: function(error) {
            console.warn(error)
        }
    });
});