const util = require('util');
/**
 * obj
 *
 * Helper function to format object
 * for console output.
 * @param  {Object} object
 * @return {Object} (formatted)
 */
exports.logObj = object =>
  util.inspect(object, { showHidden: false, depth: null, colors: true });
