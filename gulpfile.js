var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('sass', function() {
    return gulp.src('client/scss/*.scss')
        .pipe(sass({ style: 'compressed' }))
        .pipe(gulp.dest('client/css'));
});

gulp.task('watch', function() {
    gulp.watch('client/scss/*.scss', ['sass']);
});

gulp.task('default', ['sass', 'watch']);
