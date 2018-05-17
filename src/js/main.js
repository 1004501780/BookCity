require.config({
    baseUrl: '/js/',
    paths: {
        //引用的库
        'jquery': 'lib/jquery-3.3.1.min',
        'handlebars': 'lib/handlebars-v4.0.11',
        'swiper': 'lib/swiper.min',
        'bscroll': 'lib/bscroll.min',

        //编写的库
        'handlebars': 'common/handlebars',
        'getRequest': 'common/getRequest',

        //app
        'index': 'app/index'
    }
});