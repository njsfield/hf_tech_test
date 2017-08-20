const util = require('util');
/**
 * log
 *
 * Hybrid console.log
 *
 * Allows a module to initialise log
 * with a name prefix before a
 * log statement, e.g. 'ROUTER'
 *
 * @param  {[type]} setting [description]
 * @return {Function} - return function to call with
 * standard args
 */
const log = setting => {
  // Use setting as prefix before main call
  function main(...args) {
    console.log(`${setting}: `, ...args);
  }

  /**
   * obj
   *
   * Helper function to format object
   * output. Used as a method on main
   * log component
   * @param  {Object} object
   * @return {Object} (formatted)
   */
  const obj = object =>
    util.inspect(object, { showHidden: false, depth: null, colors: true });

  // Add as available method
  main.obj = obj;
  return main;
};

module.exports = log;
