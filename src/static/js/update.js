const {
  SET_BASE_URL,
  SET_SEARCH_QUERY,
  CLEAR_SEARCH,
  GET_DATA_REQUEST,
  GET_DATA_SUCCESS,
  GET_DATA_FAILURE,
  SELECT_PATIENT,
  CLEAR_SELECTED_PATIENT,
  NO_OP,
  initialModel
} = require('./model');

const { combine, getJson, keys, hasTruthyValues } = require('../../utils');

// Initialise view log
let { log } = require('../../utils');
log = log('UPDATE');

/**
 * flattenSearchFilters
 *
 * Normalise searchFilter object
 * into flattened value
 * @param  {Object} searchFilters
 * @return {Object}
 */
const flattenSearchFilters = searchFilters => {
  return {
    firstName: searchFilters.inputs.firstName.value,
    lastName: searchFilters.inputs.lastName.value,
    zipCode: searchFilters.inputs.zipCode.value,
    sort: searchFilters.selects.sort.value,
    page: searchFilters.page
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
        (acc, cur) => (params[cur] ? `${acc}${cur}=${params[cur]}&` : acc),
        '?'
      )
      .replace(/&$/, '');
  log('BASE URL WITH QUERY USED:', fullUrl);
  return fullUrl;
};

/**
 * update
 *
 * Promise based update function,
 * Takes message and model and resolves
 * with two item array;
 *
 * 0 - new msg (if any)
 * 1 - new model
 *
 * @param  {Object} msg - containing type & (optional) payload
 * @return {Promise}
 */
module.exports = (msg = { type: NO_OP }, model) =>
  new Promise(res => {
    // Toggle between message type
    switch (msg.type) {
      case SET_BASE_URL: {
        // Set base URL in model
        res([null, combine(model, { baseUrl: msg.payload })]);
        break;
      }

      case SET_SEARCH_QUERY: {
        // Alter searchFilters object, then fire get request
        res([
          { type: GET_DATA_REQUEST },
          combine(model, {
            searchFilters: combine(model.searchFilters, msg.payload)
          })
        ]);
        break;
      }

      case CLEAR_SEARCH: {
        // Reset searchFilters object, then fire get request
        res([
          { type: GET_DATA_REQUEST },
          combine(model, {
            searchFilters: combine({}, initialModel.searchFilters)
          })
        ]);
        break;
      }

      case GET_DATA_REQUEST: {
        // 1. Use build url to compose search query url
        // & Attempt to retrieve data
        getJson({
          url: buildUrl(
            model.baseUrl,
            flattenSearchFilters(model.searchFilters)
          )
        })
          .then(data => {
            // Resolve
            res([{ type: GET_DATA_SUCCESS, payload: data }, model]);
          })
          .catch(e => {
            // Resolve
            res([{ type: GET_DATA_FAILURE, payload: e }, model]);
          });
        break;
      }
      case GET_DATA_SUCCESS: {
        // Set data key in model
        res([null, combine(model, { data: msg.payload })]);
        break;
      }
      case GET_DATA_FAILURE: {
        // Set flash message notifying user of failure
        res([
          null,
          combine(model, {
            flashMessages: { type: 'error', message: msg.payload }
          })
        ]);
        break;
      }
      case SELECT_PATIENT: {
        // Set selectedPatient key
        res([null, combine(model, { selectedPatient: msg.payload })]);
        break;
      }
      case CLEAR_SELECTED_PATIENT: {
        // Set selectedPatient key
        res([null, combine(model, { selectedPatient: null })]);
        break;
      }
      case NO_OP: {
        // Default
        res([null, model]);
      }
    }
  });
