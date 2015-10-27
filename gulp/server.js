'use strict';

var gulp = require('gulp'),
    gls = require('gulp-live-server');


gulp.task('server', function() {
    var sources = [
        './src/main/webapp/**/index.html',
        './src/main/webapp/**/dist/styles.css'
    ];

    var server = gls.static('./src/main/webapp/',3001);
    server.start();

    //use gulp.watch to trigger server actions(notify, start or stop)
    return gulp.watch(sources, function (file) {
        server.notify.apply(server, [file]);
    });
});


gulp.task('serve', ['watch:cpms','server']);