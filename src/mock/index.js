var homeJson = require('./data/home.json');

var jsonObj = {
    "/api/index": homeJson
};

module.exports = function(url) {
    return jsonObj[url]
}