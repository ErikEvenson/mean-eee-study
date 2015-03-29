/**
 * Provides gulp bower tasks.
 *
 * @param {object} gulp - The gulp object.
 * @param {object} config - The configuration object.
*/

module.exports = function(gulp, config) {
  var
    bower = require('gulp-bower');

  gulp.task('bower', function() {
    return bower(config.build.bowerDirectory)
      .pipe(gulp.dest(config.build.bowerDirectory));
  });
};
