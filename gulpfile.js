/* eslint-disable */
var gulp = require('gulp');
var jsdoc = require('gulp-jsdoc3');

gulp.task('doc', function (cb) {
  var config = require('./conf.json');
  gulp.src(['README.md', './src/**/*.js'], {read: false})
    .pipe(jsdoc(config, cb));
});


// The default task (called when you run `gulp` from cli)
gulp.task('default', ['doc']);

/* eslint-enable */
