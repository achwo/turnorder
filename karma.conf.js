module.exports = function(config) {
  config.set({
    browsers: ['FirefoxHeadless'],
    customLaunchers: {
      FirefoxHeadless: {
        base: 'Firefox',
        flags: ['-headless']
      }
    },
    frameworks: ['jasmine'],
    files: ['data/*.js', 'js/*.js']
  });
};
