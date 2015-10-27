var gulp = require('gulp');

require('require-dir')('./gulp');


//gulp.task('default',['watch']);
gulp.task('build:cpms', ['sass:cpms','compileJS:cpms']);



//gulp.task('build:all', ['build:cpms']);