module.exports = function(gulp, config) {
  require('./bower')(gulp, config);
  require('./browserify')(gulp, config);
  require('./build')(gulp, config);
  require('./default')(gulp, config);
  require('./generate')(gulp, config);
  require('./lint')(gulp, config);
  require('./server')(gulp, config);
  require('./templates')(gulp, config);
  require('./wiredep')(gulp, config);
  return gulp;
};
