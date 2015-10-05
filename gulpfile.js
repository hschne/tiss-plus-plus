var gulp = require('gulp'),
    clean = require('gulp-clean'),
    uglify  = require('gulp-uglify'),
    concat  = require('gulp-concat'),
    sourcemaps = require('gulp-sourcemaps'),
    karmaServer = require('karma').Server,
    zip = require('gulp-zip');


//clean build directory
gulp.task('clean', function() {
    return gulp.src(['build/*', 'dist/*'], {read: false})
        .pipe(clean());
});

gulp.task('copy', ['clean'], function() {
    gulp.src('src/icons/**')
        .pipe(gulp.dest('build/icons'));
    gulp.src('src/resources/**')
        .pipe(gulp.dest('build/resources'));
    gulp.src('src/templates/**')
        .pipe(gulp.dest('build/templates'));
    gulp.src('src/css/**')
        .pipe(gulp.dest('build/css'));
    return gulp.src('src/manifest.json')
        .pipe(gulp.dest('build'));
});

gulp.task("test", function (done) {
    new karmaServer({
        configFile: __dirname+ '/karma.conf.js',
        singleRun: true
    }, done).start();
});

gulp.task('compile', ['copy'], function() {
    gulp.src([ "src/lib/jquery/dist/jquery.js",
        "src/lib/mustache.js/mustache.js",
        "src/js/courses.js",
        "src/js/rooms.js",
        "src/js/templating.js",
        "src/js/requests.js",
        "src/js/templating.js",
        "src/js/calendar.js",
        "src/js/identity.js",
        "src/js/background/background.js"])
        .pipe(sourcemaps.init())
            .pipe(concat('background.js'))
            .pipe(uglify())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('build'));
    return gulp.src([ "src/lib/jquery/dist/jquery.js",
        "src/lib/tablesorter/jquery.tablesorter.js" ,
        "src/lib/notifyjs/dist/notify.js",
        "src/lib/notifyjs/dist/styles/bootstrap/notify-bootstrap.js",
        "src/js/requests.js",
        "src/js/widgets/reminder.js",
        "src/js/widgets/maps.js",
        "src/js/widgets/courseHistory.js",
        "src/js/content-scripts/content-script.js"])
        .pipe(sourcemaps.init())
            .pipe(concat('content.js'))
            .pipe(uglify())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('build'))

});

gulp.task('debug', ['compile'], function(){
    gulp.src('build/**/*.js.map')
        .pipe(gulp.dest('dist/debug'));
    return gulp.src(['build/**', '!build/**/*.map'])
        .pipe(gulp.dest('dist/debug'));
});

gulp.task('release', ['compile', 'test'], function() {
    var manifest = require('./src/manifest'),
        distFileName = manifest.name + ' v' + manifest.version + '.zip',
        mapFileName = manifest.name + ' v' + manifest.version + '-maps.zip';
    //collect all source maps
    gulp.src('build/**/*.js.map')
        .pipe(zip(mapFileName))
        .pipe(gulp.dest('dist/release'));
    //build distributable extension
    return gulp.src(['build/**', '!build/**/*.map'])
        .pipe(zip(distFileName))
        .pipe(gulp.dest('dist/release'));
});

gulp.task('default', ['clean'], function() {
    gulp.start('debug');
});

