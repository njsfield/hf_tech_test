const { keys, hasTruthyValues, getJson } = require('../../../utils');
const { flattenSearchFilters } = require('../model');

// Initialise log when url built
let { log } = require('../../../utils');
log = log('GET_DATA');

/**
 * secure headers
 *
 * Return secure headers via keycloak token
 */
const secureHeaders = () => {
  return {
    Accept: 'application/json',
    Authorization: 'Bearer ' + window.keycloak.token
  };
};
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
const buildUrl = (baseUrl, params) => {
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

/**
 * getData
 *
 * Build request from base url in
 * model, searchFilter params
 * and fire fetch request
 * @param  {Object} model
 * @return {Promise}
 */
module.exports = model => {
  // Initialise url
  const url = buildUrl(
    model.baseUrl,
    flattenSearchFilters(model.searchFilters)
  );
  // Initialise headers
  const headers = secureHeaders();
  // Return promise
  return getJson({ url, headers });
};
