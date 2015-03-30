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
      path.join(config.build.generated, '*')
    ], cb);
  });

  gulp.task('generate:client', ['browserify'], function() {
  });

  gulp.task('generate:client:moveFiles', function() {
    var browserifyFiles = [];

    _.each(config.build.browserifyFiles, function(file) {
      browserifyFiles.push(path.join(config.build.source, file));
    });

    var condition = function(file) {
      if (_.contains(browserifyFiles, file.path)) { return true; }
      else { return false; }
    };

    var files = []

    _.each(config.build.clientMoveFiles, function(file) {
      files.push(path.join(config.build.source, file));
    });

    return gulp.src(files, {base: config.build.source})
      // Rename any files to be browserified by postpending a '_'.
      .pipe(gulpif(condition, rename(function(path) {
        path.basename += '_';
      })))
      .pipe(newer(config.build.generated))
      .pipe(gulp.dest(config.build.generated));
  });

  gulp.task('generate:server:moveFiles', ['wiredep'], function() {
    var files = []

    _.each(config.build.serverMoveFiles, function(file) {
      files.push(path.join(config.build.source, file));
    });

    // _.each(config.build.miscFiles, function(file) {
    //   files.push(path.join(config.build.source, '..', file));
    // });

    return gulp.src(files, {base: config.build.source})
      .pipe(newer(config.build.generated))
      .pipe(gulp.dest(config.build.generated));
  });

  gulp.task('generate:server', ['generate:server:moveFiles'], function() {

  });
};

