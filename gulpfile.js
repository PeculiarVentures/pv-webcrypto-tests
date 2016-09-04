var gulp = require('gulp');
var sass = require('gulp-sass');
var notify = require('gulp-notify');
var autoprefixer = require('gulp-autoprefixer');
var ts = require('gulp-typescript');

gulp.task('sass', function () {
    return gulp.src('./src/sass/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: "last 2 versions",
            cascade: true
        }))
        .pipe(gulp.dest('./built/css'))
        .pipe(notify("Success: CSS compiled"));
});

var tsProject = ts.createProject('tsconfig.json');
gulp.task('tsc', function () {
    var tsResult = tsProject.src() 
        .pipe(ts(tsProject));
    return tsResult.js
        .pipe(gulp.dest('./'))
        .pipe(notify("TypeScript compiled"));
});

gulp.task('watch', function () {
    gulp.watch('./src/sass/**/*.scss', ['sass']);
    gulp.watch(['./src/**/*.tsx', './src/**/*.ts'], ['tsc']);
});

gulp.task('default', ["watch"], function () {
})