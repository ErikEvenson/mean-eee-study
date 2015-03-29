/**
 * Provides gulp generating tasks.
 *
 * @param {object} gulp - The gulp object.
 * @param {object} config - The configuration object.
*/
module.exports = function(gulp, config) {
  var
    _ = require('underscore'),
    del = require('del'),
    gulpif = require('gulp-if'),
    newer = require('gulp-newer'),
    rename = require("gulp-rename");

  gulp.task('generate', ['generate:client', 'generate:server'], function() {

  });

  gulp.task('generate:clean', [], function(cb) {
    del([
      config.build.generated + '*'
    ], cb);
  });

  gulp.task('generate:client', ['browserify'], function(cb) {
  });

  gulp.task('generate:client:moveFiles', function() {
    var condition = function(file) {
      if (_.contains(config.build.browserifyFiles, file.path)) { return true; }
      else { return false; }
    };

    return gulp.src(config.build.generateClientMoveFiles, {base: config.build.source})
      // Rename any files to be browserified by postpending a '_'.
      .pipe(gulpif(condition, rename(function(path) {
        path.basename += '_';
      })))
      .pipe(newer(config.build.generated))
      .pipe(gulp.dest(config.build.generated));
  });

  gulp.task('generate:server:moveFiles', ['wiredep'], function() {
    return gulp.src(config.build.generateServerMoveFiles, {base: config.build.source})
      .pipe(newer(config.build.generated))
      .pipe(gulp.dest(config.build.generated));
  });

  gulp.task('generate:server', ['generate:server:moveFiles'], function() {

  });
};

