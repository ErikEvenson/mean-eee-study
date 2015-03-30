/**
 * Provides gulp client templates tasks.
 *
 * @param {object} gulp - The gulp object.
 * @param {object} config - The configuration object.
*/

module.exports = function(gulp, config) {
  var
    _ = require('underscore'),
    del = require('del'),
    jade = require('gulp-jade'),
    newer = require('gulp-newer'),
    path = require('path'),
    templateCache = require('gulp-angular-templatecache');

  // Clean templates.
  gulp.task('templates:cleanTemplates', [], function(cb) {
    var files = path.join(config.build.generated, 'public/js/templates{/,**}');
    del([files], cb);
  });

  // Build templates
  gulp.task('templates', ['generate:client:moveFiles'], function() {
    var files = [];

    _.each(config.build.templateFiles, function(file) {
      files.push(path.join(config.build.generated, file));
    });

    gulp.src(files, {
      base: path.join(config.build.generated)
    })
      .pipe(newer(path.join(config.build.generated, 'public/js/templates/templates.js')))
      .pipe(jade())
      .pipe(templateCache('templates.js', {
        base: path.join(config.build.generated, 'public'),
        moduleSystem: 'Browserify',
        standalone: true
      }))
      .pipe(gulp.dest(path.join(config.build.generated, 'public/js/templates')));
  });
};
