/**
 * Provides gulp bower tasks.
 *
 * @param {object} gulp - The gulp object.
 * @param {object} config - The configuration object.
*/

module.exports = function(gulp, config) {
  var
    bower = require('gulp-bower'),
    path = require('path');

  gulp.task('bower', function() {
    var bowerDirectory = path.join(config.build.generated, config.build.bowerDirectory);

    return bower(bowerDirectory)
      .pipe(gulp.dest(bowerDirectory));
  });
};
