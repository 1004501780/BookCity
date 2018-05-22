var gulp = require('gulp'),
    server = require('gulp-webserver'),
    sass = require('gulp-sass'),
    mock = require('./src/mock/index');


gulp.task('sass', function() {
    return gulp.src('src/sass/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('src/css'));
});

gulp.task('watch', function() {
    gulp.watch('src/sass/*.scss', ['sass']);
});


gulp.task('server', ['sass'], function() {
    gulp.src('src')
        .pipe(server({
            open: true,
            post: 8080,
            middleware: function(req, res, next) {
                req.url = decodeURI(req.url);
                if (/\/api/g.test(req.url)) {
                    res.setHeader("content-type", "text/json;charset=utf-8");
                    var data = mock(req.url);
                    res.end(JSON.stringify(data))
                }
                next()
            }
        }))
})


gulp.task('default', ['server', 'watch'])