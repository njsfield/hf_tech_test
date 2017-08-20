const { combine } = require('../../../utils');

const flattenSearchFilters = require('./flatten_search_filters');
const constants = require('./constants');
const inputOptions = require('./input_options');
const selectOptions = require('./select_options');

/**
 * initialModel
 */
const initialModel = {
  flashMessages: null,
  data: null,
  searchFilters: {
    inputs: inputOptions,
    selects: selectOptions,
    lastModified: 'firstName',
    page: 0
  },
  baseUrl: 'https://api.interview.healthforge.io:443/api/patient',
  selectedPatient: null
};

module.exports = combine(
  {
    initialModel,
    flattenSearchFilters
  },
  constants
);
