var gulp = require('gulp');
var sass = require('gulp-sass');
var inject = require('gulp-inject');
var watch = require('gulp-watch');
var minifyCss = require('gulp-minify-css');
var sassGlob = require('gulp-sass-glob');
var rename = require("gulp-rename");

var paths = {
    sass: ['./sass/**/*.scss'],
    js: ['./js/**/*.js']
};

gulp.task('default', ['sass', 'index']);

gulp.task('sass', function (done) {
    gulp.src('./sass/app.scss')
        .pipe(sassGlob())
        .pipe(sass({
            errLogToConsole: true
        }))
        .pipe(minifyCss({
            keepSpecialComments: 0
        }))
        .pipe(gulp.dest('./css/'))
        .on('end', done);
});

gulp.task('index', function () {
    return gulp.src('./index.template.html')
        .pipe(inject(gulp.src(paths.js, {read: false}), {relative: true}))
        .pipe(rename("index.html"))
        .pipe(gulp.dest('.'));
});

gulp.task('watch', function () {
    gulp.start('index');
    gulp.start('sass');

    gulp.src(paths.sass)
        .pipe(watch(paths.sass, function () {
            gulp.start('sass');
        }));

    gulp.src(paths.js)
        .pipe(watch(paths.js, function () {
            gulp.start('index');
        }));
});