'use strict';

var gulp = require('gulp');


gulp.task('watch:cpms', function(){
    var projectName = 'cpms';
	gulp.watch(['./src/main/webapp/base/sass/**/*.scss','./src/main/webapp/'+projectName+'/sass/**/*.scss'], ['sass:'+projectName]);
	gulp.start('browserify:'+projectName);
});