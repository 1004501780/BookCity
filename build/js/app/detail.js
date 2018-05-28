require(['jquery', 'render', 'text!header', 'getRequest', 'storage'], function($, render, HEader, getRequest, storage) {
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
                isLogin()
            })

            function isLogin() {
                var username = storage.get('username') || '';
                if (!username) {
                    location.href = "../../page/login.html";
                } else {
                    $.ajax({
                        url: '/isLogin',
                        dataType: 'json',
                        type: 'post',
                        data: {
                            username: username
                        },
                        success: function(res) {
                            console.log(res)
                            if (res.code == 1 && res.result) {
                                window.location.href = `../../page/artical.html?id=${Id.fiction_id}`;
                            } else if ((res.code == 1 && !res.result) || res.code == 2) {
                                location.href = `../../page/login.html`;
                            }
                        },
                        error: function(error) {
                            console.warn(error);
                        }
                    })
                }
            }
        },
        error: function(err) {
            console.warn(err);
        }
    });
});