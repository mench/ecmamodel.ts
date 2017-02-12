var gulp       = require('gulp'),
    browserify = require('gulp-browserify');

gulp.task('main',function () {
    return gulp.src(['lib/test/index.js'])
        .pipe(browserify({
            debug: true
        }))
        .pipe(gulp.dest('./public/'));
});
gulp.task("watch", function() {
    gulp.watch(["lib/**/*.js"], ["main"]);
});
gulp.task('default', ['main','watch']);

