/**
 * Provides gulp build tasks.
 *
 * @param {object} gulp - The gulp object.
 * @param {object} config - The configuration object.
*/

module.exports = function(gulp, config) {
  var
    jade = require('gulp-jade');

  /*
   * Wire up bower dependencies.
   */
  gulp.task('wiredep', ['bower'], function(cb) {
    var LOCALS = {};
    var wiredep = require('wiredep').stream;

    return gulp.src(config.build.wiredepFiles, {base: './source'})
      .pipe(wiredep({
        bowerJson: require(path.join(config.build.basepath, './bower.json')),
        directory: path.join(config.build.generated, 'public/bower_components/'),
        ignorePath: /(\.\.\/)*generated\/public/
      }))
      .pipe(jade({locals: LOCALS, pretty: true}))
      .pipe(gulp.dest(config.build.generated));
  });
};
