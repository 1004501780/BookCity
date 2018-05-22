var homeJson = require("./data/home.json");
var BookMain = require("./data/BookMain.json");
var recommendData1 = require("./data/recommend/recommend1.json");
var recommendData2 = require("./data/recommend/recommend2.json");
var recommendData3 = require("./data/recommend/recommend3.json");
var searchJson_tian = require('./data/searchs/search_tian.json');
var searchJson_zhu = require('./data/searchs/search_zhu.json');

console.log(searchJson_tian, homeJson)

var jsonObj = {
    "/api/index": homeJson,
    "/api/bookmains": BookMain,
    '/api/recommend?pageNum=1&count=10': recommendData1,
    '/api/recommend?pageNum=2&count=10': recommendData2,
    '/api/recommend?pageNum=3&count=10': recommendData3,
    '/api/searchNum?key=择天记': searchJson_tian,
    '/api/searchNum?key=诛仙': searchJson_zhu,
}
module.exports = function(url) {
    if (jsonObj[url]) {
        return jsonObj[url]
    } else {
        return null
    }

}