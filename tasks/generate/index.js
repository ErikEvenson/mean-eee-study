/**
 * Provides gulp generating tasks.
 *
 * @param {object} gulp - The gulp object.
 * @param {object} config - The configuration object.
*/
module.exports = function(gulp, config) {
  var
    del = require('del'),
    newer = require('gulp-newer');

  gulp.task('generate', ['generate:client', 'generate:server'], function() {

  });

  gulp.task('generate:clean', [], function(cb) {
    del([
      config.build.generated + '*'
    ], cb);
  });

  gulp.task('generate:client', ['browserify'], function() {

  });

  gulp.task('generate:client:moveFiles', function() {
    return gulp.src(config.build.generateClientMoveFiles, {base: config.build.source})
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

