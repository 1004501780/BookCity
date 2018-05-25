require(['jquery', 'render', 'storage', 'getRequest', 'base64', 'jsonp'], function($, render, storage, getRequest, base64, jsonp) {
    //缓存多次使用的节点
    var _acticalCon = $('.artical-con');

    var Id = getRequest(); //请求id

    var chapter_id = storage.get('chapter_id') || 1; //小标
    $('.cur-chapter').html(chapter_id);

    //白天黑夜的记录
    var islight = true,
        nightBg = '#0f1410';
    var chooseBg = storage.get('bg') || '#f7eee5'; //记录背景色
    if (storage.get('isLight') && storage.get('isLight') != '黑夜') {
        islight = false;
        _acticalCon.css('background', nightBg);
    }
    if (islight) {
        _acticalCon.css('background', chooseBg);
    }
    $('.set-bg-btns li').eq(storage.get('bgNum')).addClass('active').siblings().removeClass('active');


    //请求章节数
    $.ajax({
        url: "/api/sectionNum",
        data: {
            id: Id.id
        },
        dataType: "json",
        success: function(res) {
            $('.total-chapter').html(res.item.toc.length)
        },
        error: function(error) {
            console.warn(error)
        }
    });

    getArtical();
    //请求当前章节内容
    function getArtical() {
        $.ajax({
            url: "/api/articals",
            dataType: "json",
            data: {
                fiction_id: Id.id,
                chapter_id: chapter_id
            },
            success: function(res) {
                jsonp({
                    url: res.url,
                    callback: 'duokan_fiction_chapter',
                    cache: true,
                    success: function(data) {
                        var articalCon = JSON.parse($.base64.atob(data, true));
                        render(articalCon, $('#artical'), $('.artical-con'), true);
                        $('.artical-con').scrollTop(0)
                    }
                })
            },
            error: function(error) {
                console.warn(error)
            }
        });
    }


    //上一章
    $('.pre-btn').on('click', function() {
        if (chapter_id > 1) {
            chapter_id -= 1;
            $('.cur-chapter').html(chapter_id);
            getArtical();
            storage.set('chapter_id', chapter_id);
        } else {
            alert('顶部')
        }
    });
    //下一章
    $('.next-btn').on('click', function() {
        if (chapter_id < 4) {
            chapter_id += 1;
            $('.cur-chapter').html(chapter_id);
            getArtical();
            storage.set('chapter_id', chapter_id);
        } else {
            alert('底部')
        }
    })


    //点击内容
    _acticalCon.on('click', function() {
        $('.set-wrap').show()
        $(this).css('overflow', 'hidden')
    })


    //点击mask
    $('.mask').on('click', function() {
        $('.set-wrap').hide()
        $('.set-panel').hide()
        $('.size').removeClass('active')
        _acticalCon.css('overflow', 'scroll')
    });


    //点击返回
    $('.icon-circle-back').on('click', function() {
        history.go(-1);
    });


    //点击目录
    $('.chapter-btn').on('click', function() {
        window.location.href = `../../page/section.html?fiction_id=${Id.id}&chapter_id=${chapter_id}`;
    })


    //点击day
    $('.day').on('click', function() {
        $(this).toggleClass('light');
        if (islight) {
            $(this).find("dd").text('白天');
            _acticalCon.css('background', nightBg);
        } else {
            $(this).find("dd").text('黑夜');
            _acticalCon.css('background', chooseBg);
        }
        islight = !islight;
        var tag = islight ? '黑夜' : '白天';
        storage.set('isLight', tag);
    });


    //点击字体
    var initSize = storage.get('fz') || 14, //初始字体
        maxSize = 24, //最大字体
        minSize = 12; //最小字体
    //本地存储初始字体
    $('.artical-con p').css('font-size', initSize / 37.5 + 'rem');
    $('.size').on('click', function() {
        $('.set-panel').toggle()
        $(this).toggleClass('active')
    });
    //点击大按钮
    $('.large-btn').on('click', function() {
        if (initSize < maxSize) {
            initSize += 2;
            storage.set('fz', initSize);
            $('.artical-con p').css('font-size', initSize / 37.5 + 'rem');
        }
    });
    //点击小按钮
    $('.samll-btn').on('click', function() {
        if (initSize > minSize) {
            initSize -= 2;
            storage.set('fz', initSize);
            $('.artical-con p').css('font-size', initSize / 37.5 + 'rem');
        }
    });


    //切换背景
    $('.set-bg-btns').on('click', 'li', function() {
        $(this).addClass('active').siblings().removeClass('active');
        var bgNum = $(this).index();
        storage.set('bgNum', bgNum);
        chooseBg = $(this).attr('bg-color');
        storage.set('bg', chooseBg);
        if (islight) {
            _acticalCon.css('background', chooseBg);
        }
    })
});