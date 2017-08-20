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
  flattenSearchFilters,
  initialModel
} = require('../model');

const buildUrl = require('./build_url');

const { combine, getJson } = require('../../../utils');

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
