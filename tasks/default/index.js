/**
 * Provides gulp default tasks.
 *
 * @param {object} gulp - The gulp object.
 * @param {object} config - The configuration object.
*/
module.exports = function(gulp, config) {
  var
    debug = require('debug')(__filename),
    del = require('del'),
    path = require('path'),
    server = require('gulp-develop-server');

  // var
  //   app = path.join(config.build.basepath, 'bin/www');

  // Show project information
  debug(config.pkg.name + ' ' + config.pkg.version);

  // Clean.
  gulp.task('clean', ['generate:clean'], function(cb) {
    del([
      config.build.build + '*'
    ], cb);
  });

  gulp.task('default', ['server:start'],
    function() {
      var watcher = gulp.watch(
        [path.join(config.build.source, '**/*')],
        ['generate', 'server:restart']
      );

      function notify(e) {
        console.log('File ' + e.path + ' was ' + e.type + ', running tasks...');
      }

      watcher.on('change', function(e) { notify(e); });
    }
  );

  return gulp;
};
