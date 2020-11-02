const sass = require('rollup-plugin-sass');

module.exports = {
  // This function will run for each entry/format/env combination
  rollup(config, options) {
    config.plugins.push(sass({ insert: true }));
    return config; // always return a config.
  },
};