var gulp = require('gulp'),
    source = require('vinyl-source-stream'),
    buffer     = require("vinyl-buffer"),
    browserify = require('browserify'),
    watchify = require('watchify'),
    reactify = require('reactify'),
    concat = require('gulp-concat'),
    babelify = require("babelify"),
    util = require('gulp-util'),
    lrload = require("livereactload");


gulp.task('compileJS:cpms', function(){
    var projectName = 'cpms';
    var bundler = createBundler('prod',projectName);
    return bundler
        .bundle()
        .pipe(source('scripts.js'))
        // This is where you add uglifying etc.
        .pipe(gulp.dest('./src/main/webapp/'+projectName+'/dist/'));
});

gulp.task('browserify:cpms', function() {
    var projectName = 'cpms';

    var bundler = createBundler('dev',projectName);
    var watcher  = watchify(bundler);
    rebundle(watcher,projectName);

    return watcher
        .on('update', function(){
            rebundle(watcher,projectName);
        })
        .on('error', function(err){
            util.log(util.colors.red(err.message));
        })
});










function createBundler(environment,projectName) {
    var isProd = (environment !== 'dev');
    var bundler = browserify({
        entries: ['./src/main/webapp/'+projectName+'/react_components/AppRouter.js'], // Only need initial file, browserify finds the deps
        transform: (isProd ? [reactify] : [babelify]), // We want to convert JSX to normal javascript
        plugin: isProd ? [] : [[lrload, {port: 3005}]],    // no additional configuration is needed
        debug: !isProd, // Gives us sourcemapping
        cache: {}, packageCache: {}, fullPaths: !isProd // Requirement of watchify,
    });

    return bundler;
}

function rebundle(watcher,projectName){// When any files update
    var updateStart = Date.now();
    util.log('Updating!');
    watcher.bundle() // Create new bundle that uses the cache for high performance
        .on('error', function(err){
            util.log(util.colors.red(err.message));
        })
        .pipe(source('scripts.js'))
        // This is where you add uglifying etc.
        .pipe(buffer())
        .pipe(gulp.dest('./src/main/webapp/'+projectName+'/dist/'));
    util.log('Updated!', util.colors.green( (Date.now() - updateStart) + 'ms\n' ));
}