define(['jquery', 'handlebars'], function($, handlebars) {
    var render = function(modules, data) {
        var listTpl = modules.html();
        var template = handlebars.compile(listTpl);
        handlebars.registerHelper('addIndex', function(index) {
            return index + 1
        })
        var html = template(data);
        return html
    }
    return {
        render: render
    }
});