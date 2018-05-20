require(['jquery', 'render', 'swiper', 'bscroll'], function($, render, swiper, BScroll) {

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
    var cityScroll = new BScroll('.city-scroll', {
        probeType: 2,
        click: true
    });
    var _parent = $('.load-in');
    var htmlFz = $('html').css('fontSize');
    var realSize = parseFloat(htmlFz) * 44 / 37.5;
    cityScroll.on('scroll', function() {
        if (this.y < this.maxScrollY - realSize) {
            _parent.attr('up', '释放加载...');
        } else if (this.y < this.maxScrollY - realSize / 2) {
            _parent.attr('up', '上拉加载...');
        } else if (this.y > realSize) {
            _parent.attr('down', '释放刷新...');
        } else if (this.y > realSize / 2 && this.y < realSize) {
            _parent.attr('down', '下拉刷新...');
        }
    })
    cityScroll.on('scrollEnd', function() {
        _parent.attr('up', '上拉加载...')
        _parent.attr('down', '下拉刷新...')
    })
    cityScroll.on('touchEnd', function() {
        if (_parent.attr('up') === '释放刷新...') {} else if (_parent.attr('down') === '释放加载...') {}
    })

});