require.config({
    baseUrl: '/js/',
    paths: {
        //引用的库
        'jquery': 'lib/jquery-3.3.1.min',
        'handlebars': 'lib/handlebars-v4.0.11',
        'swiper': 'lib/swiper.min',
        'bscroll': 'lib/bscroll.min',
        'text': 'lib/text',
        'base64': 'lib/jquery.base64',
        'jsonp': 'lib/jquery.jsonp',

        //编写的库
        'render': 'common/render',
        'getRequest': 'common/getRequest',
        'GetSlideDirection': 'common/slider-common',
        'storage': 'common/storage',

        //app
        'index': 'app/index',
        'search': 'app/search',
        'detail': 'app/detail',
        'bookhot': 'app/bookhot',
        'section': 'app/section',
        'artical': 'app/artical',
        'login': 'app/login',

        //模板
        "bookLr": '../page/tpl/book-l-r-list.html',
        "bookLb": '../page/tpl/book-list.html',
        "header": '../page/tpl/hander.html',
        "bookLs": '../page/tpl/book-search.html',
    },
    shim: {
        'base64': {
            deps: ['jquery']
        }
    }
});