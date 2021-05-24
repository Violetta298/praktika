const gulp = require('gulp')
const sass = require('gulp-sass')
const concat = require('gulp-concat')

gulp.task('sass', function() {
    return gulp.src('./assets/scss/*.scss')
    .pipe(sass())
    .pipe(concat('style.css'))
    .pipe(gulp.dest('./assets/css/'))
})

gulp.task('sass:w', function() {
    gulp.watch('./assets/scss/*.scss', gulp.parallel('sass'))
})

