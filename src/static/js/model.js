/**
 * constants (used for update)
 * @type {String}
 */

exports.SET_BASE_URL = 'SET_BASE_URL';
exports.SET_SEARCH_QUERY = 'SET_SEARCH_QUERY';
exports.CLEAR_SEARCH = 'CLEAR_SEARCH';
exports.GET_DATA_REQUEST = 'GET_DATA_REQUEST';
exports.GET_DATA_SUCCESS = 'GET_DATA_SUCCESS';
exports.GET_DATA_FAILURE = 'GET_DATA_FAILURE';
exports.SELECT_PATIENT = 'SELECT_PATIENT';
exports.CLEAR_SELECTED_PATIENT = 'CLEAR_SELECTED_PATIENT';
exports.NO_OP = 'NO_OP';

/**
 * inputOptions
 * @type {Object}
 */
exports.inputOptions = {
  firstName: {
    label: 'First Name',
    value: ''
  },
  lastName: {
    label: 'Last Name',
    value: ''
  },
  zipCode: {
    label: 'Zip Code',
    value: ''
  }
};

/**
 * selectOptions
 * @type {Object}
 */
exports.selectOptions = {
  sort: {
    value: '',
    options: [
      {
        label: 'First Name (Ascending)',
        value: 'firstName%20ASC'
      },
      {
        label: 'First Name (Descending)',
        value: 'firstName%20DESC'
      },
      {
        label: 'Last Name (Ascending)',
        value: 'lastName%20ASC'
      },
      {
        label: 'Last Name (Descending)',
        value: 'lastName%20DESC'
      },
      {
        label: 'Date of Birth (Ascending)',
        value: 'dateOfBirth%20ASC'
      },
      {
        label: 'Date of Birth (Descending)',
        value: 'dateOfBirth%20DESC'
      }
    ]
  }
};

/**
 * initialModel
 */

exports.initialModel = {
  flashMessages: null,
  data: null,
  searchFilters: {
    inputs: exports.inputOptions,
    selects: exports.selectOptions,
    lastModified: 'firstName',
    page: 0
  },
  baseUrl: 'https://api.interview.healthforge.io:443/api/patient',
  selectedPatient: null
};
