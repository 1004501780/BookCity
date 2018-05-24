var homeJson = require("./data/home.json");
var BookMain = require("./data/BookMain.json");
var recommendData1 = require("./data/recommend/recommend1.json");
var recommendData2 = require("./data/recommend/recommend2.json");
var recommendData3 = require("./data/recommend/recommend3.json");
//搜素数据
var searchJson_tian = require('./data/searchs/search_tian.json');
var searchJson_zhu = require('./data/searchs/search_zhu.json');
//详情页数据
var detail352876 = require('./data/details/352876.json');
var detail306643 = require('./data/details/306643.json');
var detail301342 = require('./data/details/301342.json');
var detail42318 = require('./data/details/42318.json');
var detail30047 = require('./data/details/30047.json');
var detail315972 = require('./data/details/315972.json');
//目录数据
var section352876 = require('./data/sections/s352876.json');
var section306643 = require('./data/sections/s306643.json');
var section42318 = require('./data/sections/s42318.json');
var section315972 = require('./data/sections/s315972.json');
//获取页面数据
var artical_1 = require('./data/artical/data1.json');
var artical_2 = require('./data/artical/data2.json');
var artical_3 = require('./data/artical/data3.json');
var artical_4 = require('./data/artical/data4.json');

var jsonObj = {
    "/api/index": homeJson,
    "/api/bookmains": BookMain,
    '/api/recommend?pageNum=1&count=10': recommendData1,
    '/api/recommend?pageNum=2&count=10': recommendData2,
    '/api/recommend?pageNum=3&count=10': recommendData3,
    //搜素数据
    '/api/searchNum?key=择天记': searchJson_tian,
    '/api/searchNum?key=诛仙': searchJson_zhu,
    //详情页数据
    '/api/detailNum?id=352876': detail352876,
    '/api/detailNum?id=306643': detail306643,
    '/api/detailNum?id=301342': detail301342,
    '/api/detailNum?id=42318': detail42318,
    '/api/detailNum?id=30047': detail30047,
    '/api/detailNum?id=315972': detail315972,
    //目录数据
    '/api/sectionNum?id=352876': section352876,
    '/api/sectionNum?id=306643': section306643,
    '/api/sectionNum?id=42318': section42318,
    '/api/sectionNum?id=315972': section315972,
    //单章渲染
    '/api/articals?fiction_id=352876&chapter_id=1': artical_1,
    '/api/articals?fiction_id=352876&chapter_id=2': artical_2,
    '/api/articals?fiction_id=352876&chapter_id=3': artical_3,
    '/api/articals?fiction_id=352876&chapter_id=4': artical_4
}
module.exports = function(url) {
    if (jsonObj[url]) {
        return jsonObj[url]
    } else {
        return null
    }

}