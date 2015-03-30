/**
 * Provides gulp browserify tasks.
 *
 * @param {object} gulp - The gulp object.
 * @param {object} config - The configuration object.
*/

module.exports = function(gulp, config) {
  var
    del = require('del'),
    path = require('path'),
    rename = require('gulp-rename'),
    transform = require('vinyl-transform');

  gulp.task('browserify', ['bower', 'templates', 'generate:client:moveFiles'], function() {
    // transform regular node stream to gulp (buffered vinyl) stream
    var browserified = transform(function(filename) {
      var browserify = require('browserify');
      var b = browserify(filename);
      return b.bundle();
    });

    // Any file that has a basename ending in '_' should be browserified.
    var files = path.join(config.build.generated, 'public/js/**/*_.js');

    return gulp.src(files)
      .pipe(browserified)
      // .pipe(sourcemaps.init({loadMaps: true}))
      //     // Add transformation tasks to the pipeline here.
      //     .pipe(uglify())
      // .pipe(sourcemaps.write('./'))
      .pipe(rename(function(path) {
        path.basename = path.basename.slice(0, -1);
      }))
      .pipe(gulp.dest(path.join(config.build.generated, 'public/js/')));
  });
};
