var gulp = require('gulp');
var pug = require('gulp-pug');
var data = require('gulp-data');
var stylus = require('gulp-stylus');

gulp.task('html', function(){
  return gulp.src('raw/*.pug')
    .pipe(pug())
    .pipe(gulp.dest('public/'))
});

gulp.task('css', function(){
  return gulp.src('raw/*.styl')
    .pipe(stylus())
    .pipe(gulp.dest('public/'));
});

gulp.task('default', [ 'html', 'css' ]);