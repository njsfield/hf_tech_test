const { keys, hasTruthyValues } = require('../../../utils');

// Initialise log when url built
let { log } = require('../../../utils');
log = log('BUILD URL');
/**
 * buildUrl
 *
 * Takes a base url & (optional)
 * params object to build query
 *
 * @param  {String} baseUrl - initial URL
 * @param  {Object} options - options
 * @return {String} - final url
 */
module.exports = (baseUrl, params) => {
  // If no params or all param values are empty
  // Return base url
  if (!params || hasTruthyValues(params) === false) {
    log('BASE URL USED:', baseUrl);
    return baseUrl;
  }

  // build full query
  const fullUrl =
    baseUrl +
    keys(params)
      .reduce(
        (acc, cur) =>
          params[cur]
            ? `${acc}${cur}=${params[cur].toString().toLowerCase()}&`
            : acc,
        '?'
      )
      .replace(/&$/, '');
  log('BASE URL WITH QUERY USED:', fullUrl);
  return fullUrl;
};
