var gulp = require('gulp'),
    server = require('gulp-webserver'),
    mock = require('./src/mock/index');

gulp.task('default', function() {
    gulp.src('src')
        .pipe(server({
            open: true,
            post: 8080,
            middleware: function(req, res, next) {
                if (/\/api/g.test(req.url)) {
                    var data = mock(req.url);
                    res.end(JSON.stringify(data))
                }
                next()
            }
        }))
})