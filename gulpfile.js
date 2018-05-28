var gulp = require('gulp'),
    server = require('gulp-webserver'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    mock = require('./src/mock/index'),
    minCss = require('gulp-clean-css'),
    querystring = require('querystring'),
    uglify = require('gulp-uglify'),
    rev = require('gulp-rev'),
    revCollector = require('gulp-rev-collector'),
    sequence = require('gulp-sequence'),
    clean = require('gulp-clean'),
    userList = [{
        username: '123',
        pwd: '123',
        isLogin: false
    }];

gulp.task('sass', function() {
    return gulp.src('src/sass/*.scss')
        .pipe(sass())
        .pipe(autoprefixer({
            browsers: ['last 2 versions', 'Android >= 4.0'],
        }))
        .pipe(minCss())
        .pipe(gulp.dest('src/css'))
});

gulp.task('watch', function() {
    gulp.watch('src/sass/*.scss', ['sass']);
});


gulp.task('server', ['sass'], function() {
    gulp.src('build')
        .pipe(server({
            post: 8080,
            middleware: function(req, res, next) {
                req.url = decodeURI(req.url);
                if (req.url === '/login') {
                    var chunkArr = [];
                    req.on('data', function(chunk) {
                        chunkArr.push(chunk)
                    })

                    req.on('end', function(chunk) {
                        var params = querystring.parse(Buffer.concat(chunkArr).toString());
                        var mask = false
                        userList.forEach(function(item, index) {
                            if (item.username == params.username && item.pwd === params.pwd) {
                                item.isLogin = true;
                                mask = true;
                                res.end(JSON.stringify({ code: 1, msg: '登陆成功' }))
                            }
                        })
                        if (!mask) {
                            res.end(JSON.stringify({ code: 2, msg: '登录失败' }))
                        }
                        next()
                    })
                    return false
                } else if (req.url === '/isLogin') {
                    var chunkArr = [];
                    req.on('data', function(chunk) {
                        chunkArr.push(chunk)
                    })
                    req.on('end', function(chunk) {
                        var params = querystring.parse(Buffer.concat(chunkArr).toString());
                        var mask = false;
                        userList.forEach(function(item, index) {
                            if (item.username == params.username) {
                                res.end(JSON.stringify({ code: 1, result: item.isLogin }));
                            }
                        })
                        if (!mask) {
                            res.end(JSON.stringify({ code: 2, msg: '请登录' }))
                        }
                        next()
                    })
                    return false
                }


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

gulp.task("clean", function() {
    gulp.src('bulid')
        .pipe(clean())
})

gulp.task('buildCss', function() {
    return gulp.src('src/sass/*.scss')
        .pipe(sass())
        .pipe(autoprefixer({
            browsers: ['last 2 versions', 'Android >= 4.0'],
        }))
        .pipe(minCss())
        .pipe(rev())
        .pipe(gulp.dest('build/css'))
        .pipe(rev.manifest())
        .pipe(gulp.dest('build/rev/css'))
})

gulp.task('copyOwnJs', function() {
    return gulp.src('src/js/{app,common}/*.js')
        .pipe(gulp.dest('build/js'))
})

gulp.task('copyLibs', function() {
    return gulp.src(['src/js/**/*.js', '!src/js/{app,common}/*.js'])
        .pipe(gulp.dest('build/js'))
})

gulp.task('copyImg', function() {
    return gulp.src('src/imgs/*')
        .pipe(gulp.dest('build/imgs'))
})

gulp.task('copyHtml', function() {
    return gulp.src(['build/rev/css/*json', 'src/**/*.html'])
        .pipe(revCollector({
            replaceReved: true
        }))
        .pipe(gulp.dest('build'))
})

gulp.task('build', function(cb) {
    sequence('clean', ['buildCss', 'copyOwnJs', 'copyLibs', 'copyImg'], 'copyHtml', 'server', cb)
})