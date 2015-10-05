var gulp = require('gulp');
var gutil = require('gulp-util');
var karmaServer = require('karma').Server;

// create a default task and just log a message


gulp.task('debug', function () {
    return gutil.log('Gulp is running!')
});

gulp.task("test", function (done) {
    new karmaServer({
        configFile: __dirname+ "/karma.conf.js",
        singleRun: true
    }, done).start();
});

//clean build directory
gulp.task('clean', function() {
    return gulp.src('build/*', {read: false})
        .pipe(clean());
});

//copy static folders to build directory
gulp.task('copy', function() {
    gulp.src('src/fonts/**')
        .pipe(gulp.dest('build/fonts'));
    gulp.src('src/icons/**')
        .pipe(gulp.dest('build/icons'));
    gulp.src('src/_locales/**')
        .pipe(gulp.dest('build/_locales'));
    return gulp.src('manifest.json')
        .pipe(gulp.dest('build'));
});