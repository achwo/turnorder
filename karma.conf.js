module.exports = function(config) {
  config.set({
    frameworks: ['jasmine'],
    files: [
      'data/*.js',
      'js/*.js'
    ]
  });
};
