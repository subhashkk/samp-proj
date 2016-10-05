var gulp = require('gulp');
var paths = require('../paths');
var browserSync = require('browser-sync');

// outputs changes to files to the console
function reportChange(event) {
    console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
}

// this task wil watch for changes
// to js, html, and css files and call the
// reportChange method. Also, by depending on the
// serve task, it will instantiate a browserSync session
gulp.task('watch', function() {
    gulp.watch(paths.js, ['watch-js']).on('change', reportChange);
    gulp.watch(paths.html, ['watch-html']).on('change', reportChange);
    gulp.watch('./index.html', ['watch-index']).on('change', reportChange);
    gulp.watch(paths.scss, ['watch-sass']).on('change', reportChange);
    /*gulp.watch(paths.style, function() {
        return gulp.src(paths.style)
            .pipe(browserSync.stream());
    }).on('change', reportChange);*/
});

gulp.task('watch-index', ['index:dev'], browserSync.reload);
gulp.task('watch-html', [], browserSync.reload);
gulp.task('watch-sass', ['sass'], browserSync.reload);
gulp.task('watch-js', ['lint'], browserSync.reload);