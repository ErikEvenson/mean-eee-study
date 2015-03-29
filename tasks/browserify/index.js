/**
 * Provides gulp build tasks.
 *
 * @param {object} gulp - The gulp object.
 * @param {object} config - The configuration object.
*/

module.exports = function(gulp, config) {
  var
    del = require('del'),
    jade = require('gulp-jade'),
    path = require('path'),
    rename = require('gulp-rename'),
    templateCache = require('gulp-angular-templatecache'),
    transform = require('vinyl-transform');

  gulp.task('browserify', ['bower', 'browserify:templates', 'generate:client:moveFiles'], function() {
    // transform regular node stream to gulp (buffered vinyl) stream
    var browserified = transform(function(filename) {
      var browserify = require('browserify');
      var b = browserify(filename);
      return b.bundle();
    });

    // Any file that has a basename ending in '_' should be browserified.
    return gulp.src(path.join(config.build.basepath, 'generated/public/js/**/*_.js'))
      .pipe(browserified)
      // .pipe(sourcemaps.init({loadMaps: true}))
      //     // Add transformation tasks to the pipeline here.
      //     .pipe(uglify())
      // .pipe(sourcemaps.write('./'))
      .pipe(rename(function(path) {
        path.basename = path.basename.slice(0, -1);
      }))
      .pipe(gulp.dest('./generated/public/js/'));
  });

  // Clean templates.
  gulp.task('browserify:cleanTemplates', [], function(cb) {
    del(['./generated/public/js/templates'], cb);
  });

  // Build templates
  gulp.task('browserify:templates', ['browserify:cleanTemplates', 'generate:client:moveFiles'], function() {
    gulp.src(config.build.templateFiles, {
      base: path.join(config.build.basepath, 'generated')
    })
      .pipe(jade())
      .pipe(templateCache('templates.js', {
        base: path.join(config.build.basepath, 'generated/public'),
        moduleSystem: 'Browserify',
        standalone: true
      }))
      .pipe(gulp.dest('./generated/public/js/templates'));
  });
};
