require.config({
    baseUrl: '/js/',
    paths: {
        //引用的库
        'jquery': 'lib/jquery-3.3.1.min',
        'handlebars': 'lib/handlebars-v4.0.11',
        'swiper': 'lib/swiper.min',
        'bscroll': 'lib/bscroll.min',
        'text': 'lib/text',

        //编写的库
        'render': 'common/render',
        'getRequest': 'common/getRequest',
        'GetSlideDirection': 'common/slider-common',

        //app
        'index': 'app/index',
        'search': 'app/search',

        //模板
        "bookLr": '../page/tpl/book-l-r-list.html',
        "bookLb": '../page/tpl/book-list.html',
        "header": '../page/tpl/hander.html',
        "bookLs": '../page/tpl/book-search.html',
    }
});