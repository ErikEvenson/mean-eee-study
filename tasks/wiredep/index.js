/**
 * Provides gulp build tasks.
 *
 * @param {object} gulp - The gulp object.
 * @param {object} config - The configuration object.
*/

module.exports = function(gulp, config) {
  var
    _ = require('underscore'),
    jade = require('gulp-jade'),
    rename = require("gulp-rename");

  /*
   * Wire up bower dependencies.
   */
  gulp.task('wiredep', ['bower'], function(cb) {
    var LOCALS = {};
    var wiredep = require('wiredep').stream;

    var files = []

    _.each(config.build.wiredepFiles, function(file) {
      files.push(path.join(config.build.source ,file));
    });

    return gulp.src(files, {base: './source'})
      .pipe(wiredep({
        bowerJson: require(path.join(config.build.basepath, './bower.json')),
        directory: path.join(config.build.generated, config.build.bowerDirectory),
        ignorePath: /(\.\.\/)*generated\/public/
      }))
      .pipe(jade({locals: LOCALS, pretty: true}))
      .pipe(gulp.dest(config.build.generated));
  });
};
