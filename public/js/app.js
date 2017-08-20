/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


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
exports.log = function (setting) {
  return (
    // Use setting as prefix before main call
    function () {
      var _console;

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      (_console = console).log.apply(_console, [setting + ': '].concat(args));
    }
  );
};

/** Utils **/

/**
   * combine
   *
   * Alias for Object.assign
   * @param  {Objects} args - object(s)
   * @return {Object} - final object
   */
exports.combine = function () {
  for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    args[_key2] = arguments[_key2];
  }

  return Object.assign.apply(Object, [{}].concat(args));
};

/**
   * keys
   * alias for Object.keys
   */
exports.keys = Object.keys;

/**
   * countArr
   *
   * generate incremental array from integer
   * e.g. countArr(3) => [0,1,2]
   * @param  {num} num - increment amount (last item = num-1)
   * @return {Array} - integer array
   */
exports.countArr = function (num) {
  return Array.from(Array(num).keys());
};

/**
   * elt (Browser)
   *
   * Create a DOM element,
   * (optional) allow attributes to be set
   * (optional) allow text content to be set
   * @param  {String} type - e.g. div/span/h1
   * @param  {Object} attributes - e.g {class: 'small'}
   * @param  {Object} textContent - e,g, 'Hello world'
   * @return {Node} - Dom Node
   */
exports.elt = function (type, attributes, textContent) {
  var _elt = document.createElement(type);
  // Set each key as attr
  if (attributes) {
    exports.keys(attributes).forEach(function (key) {
      _elt.setAttribute(key, attributes[key]);
    });
  }
  // Allow text content
  if (textContent) {
    _elt.textContent = textContent;
  }
  return _elt;
};

/* getJson
 *
 * performs JSON fetch request
 * @param  {Object} options ...
 *
 * url     - base url (String)
 * method  - (optional: defaults to get) get/post (String)
 * payload - (optional: JSON payload) (String)
 *
 * @return {Promise} - return promise
 */
exports.getJson = function (options) {
  return new Promise(function (res, rej) {
    fetch(options.url, {
      method: 'get',
      mode: 'cors',
      headers: {
        Accept: 'application/json'
      }
    }).then(function (response) {
      return response.json();
    }).then(function (response) {
      res(response);
    }).catch(function (e) {
      return rej(e);
    });
  });
};

/**
 * hasTruthyValues
 *
 * Run through all object values
 * to check if any are truthy
 * @param  {Object} obj
 * @return {Boolean}
 */
exports.hasTruthyValues = function (obj) {
  return exports.keys(obj).some(function (x) {
    return obj[x];
  });
};

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


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
    options: [{
      label: 'First Name (Ascending)',
      value: 'firstName%20ASC'
    }, {
      label: 'First Name (Descending)',
      value: 'firstName%20DESC'
    }, {
      label: 'Last Name (Ascending)',
      value: 'lastName%20ASC'
    }, {
      label: 'Last Name (Descending)',
      value: 'lastName%20DESC'
    }, {
      label: 'Date of Birth (Ascending)',
      value: 'dateOfBirth%20ASC'
    }, {
      label: 'Date of Birth (Descending)',
      value: 'dateOfBirth%20DESC'
    }]
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

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _require = __webpack_require__(0),
    combine = _require.combine;

// Model imports


var _require2 = __webpack_require__(1),
    NO_OP = _require2.NO_OP,
    GET_DATA_REQUEST = _require2.GET_DATA_REQUEST,
    initialModel = _require2.initialModel;

// Main update


var update = __webpack_require__(3);
// Main view
var view = __webpack_require__(4);

// Initialise view log

var _require3 = __webpack_require__(0),
    log = _require3.log;

log = log('APP');
/**
 * Main DOM Node
 */
var GLOBAL_DOM_HOOK = document.getElementById('main');
log('GLOBAL DOM HOOK: ', GLOBAL_DOM_HOOK);

/**
  * Hold global model
  */
var GLOBAL_MODEL = combine({}, initialModel);

/**
 * Main Update
 *
 * Call main update function then use
 * newMsg & newModel to set global model
 *
 * @param  {Object} msg - containing type & (optional) payload
 * @return {Promise}
 */
var mainUpdate = function mainUpdate() {
  var _msg = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { type: NO_OP };

  // Run Promise
  return new Promise(function (res) {
    // Fire update
    update(_msg, GLOBAL_MODEL)
    // Continue with (optional newMsg & newModel)
    .then(function (_ref) {
      var _ref2 = _slicedToArray(_ref, 2),
          newMsg = _ref2[0],
          newModel = _ref2[1];

      log('MSG PROCESSED: ', _msg, 'NEWMODEL: ', newModel);
      // UPDATE GLOBAL_MODEL
      GLOBAL_MODEL = newModel;
      // Apply new model to view
      // Pass update function for control
      render(view(newModel, mainUpdate));
      // If a message is returned
      // Re-call update function
      if (newMsg) {
        mainUpdate(newMsg);
      } else {
        // Resolve
        res();
      }
    });
  });
};

/**
 * render
 *
 * Allow main dom element to be injected
 * with view
 *
 * @param {Node} viewNode - node returned by view function
 */
var render = function render(viewNode) {
  // Reset
  GLOBAL_DOM_HOOK.innerHTML = '';
  // Build
  GLOBAL_DOM_HOOK.appendChild(viewNode);
};

/**
 * init
 *
 * Fire update to render app on page load
 */
var init = function init() {
  // Start by making request on page load
  mainUpdate({ type: GET_DATA_REQUEST });
};

// Initialise
init();

module.exports = mainUpdate;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _require = __webpack_require__(1),
    SET_BASE_URL = _require.SET_BASE_URL,
    SET_SEARCH_QUERY = _require.SET_SEARCH_QUERY,
    CLEAR_SEARCH = _require.CLEAR_SEARCH,
    GET_DATA_REQUEST = _require.GET_DATA_REQUEST,
    GET_DATA_SUCCESS = _require.GET_DATA_SUCCESS,
    GET_DATA_FAILURE = _require.GET_DATA_FAILURE,
    SELECT_PATIENT = _require.SELECT_PATIENT,
    CLEAR_SELECTED_PATIENT = _require.CLEAR_SELECTED_PATIENT,
    NO_OP = _require.NO_OP,
    initialModel = _require.initialModel;

var _require2 = __webpack_require__(0),
    combine = _require2.combine,
    getJson = _require2.getJson,
    keys = _require2.keys,
    hasTruthyValues = _require2.hasTruthyValues;

// Initialise view log


var _require3 = __webpack_require__(0),
    log = _require3.log;

log = log('UPDATE');

/**
 * flattenSearchFilters
 *
 * Normalise searchFilter object
 * into flattened value
 * @param  {Object} searchFilters
 * @return {Object}
 */
var flattenSearchFilters = function flattenSearchFilters(searchFilters) {
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
var buildUrl = function buildUrl(baseUrl, params) {
  // If no params or all param values are empty
  // Return base url
  if (!params || hasTruthyValues(params) === false) {
    log('BASE URL USED:', baseUrl);
    return baseUrl;
  }

  // build full query
  var fullUrl = baseUrl + keys(params).reduce(function (acc, cur) {
    return params[cur] ? '' + acc + cur + '=' + params[cur] + '&' : acc;
  }, '?').replace(/&$/, '');
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
module.exports = function () {
  var msg = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { type: NO_OP };
  var model = arguments[1];
  return new Promise(function (res) {
    // Toggle between message type
    switch (msg.type) {
      case SET_BASE_URL:
        {
          // Set base URL in model
          res([null, combine(model, { baseUrl: msg.payload })]);
          break;
        }

      case SET_SEARCH_QUERY:
        {
          // Alter searchFilters object, then fire get request
          res([{ type: GET_DATA_REQUEST }, combine(model, {
            searchFilters: combine(model.searchFilters, msg.payload)
          })]);
          break;
        }

      case CLEAR_SEARCH:
        {
          // Reset searchFilters object, then fire get request
          res([{ type: GET_DATA_REQUEST }, combine(model, {
            searchFilters: combine({}, initialModel.searchFilters)
          })]);
          break;
        }

      case GET_DATA_REQUEST:
        {
          // 1. Use build url to compose search query url
          // & Attempt to retrieve data
          getJson({
            url: buildUrl(model.baseUrl, flattenSearchFilters(model.searchFilters))
          }).then(function (data) {
            // Resolve
            res([{ type: GET_DATA_SUCCESS, payload: data }, model]);
          }).catch(function (e) {
            // Resolve
            res([{ type: GET_DATA_FAILURE, payload: e }, model]);
          });
          break;
        }
      case GET_DATA_SUCCESS:
        {
          // Set data key in model
          res([null, combine(model, { data: msg.payload })]);
          break;
        }
      case GET_DATA_FAILURE:
        {
          // Set flash message notifying user of failure
          res([null, combine(model, {
            flashMessages: { type: 'error', message: msg.payload }
          })]);
          break;
        }
      case SELECT_PATIENT:
        {
          // Set selectedPatient key
          res([null, combine(model, { selectedPatient: msg.payload })]);
          break;
        }
      case CLEAR_SELECTED_PATIENT:
        {
          // Set selectedPatient key
          res([null, combine(model, { selectedPatient: null })]);
          break;
        }
      case NO_OP:
        {
          // Default
          res([null, model]);
        }
    }
  });
};

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _require = __webpack_require__(1),
    SET_SEARCH_QUERY = _require.SET_SEARCH_QUERY,
    CLEAR_SEARCH = _require.CLEAR_SEARCH,
    SELECT_PATIENT = _require.SELECT_PATIENT,
    CLEAR_SELECTED_PATIENT = _require.CLEAR_SELECTED_PATIENT;

var _require2 = __webpack_require__(0),
    elt = _require2.elt,
    keys = _require2.keys,
    combine = _require2.combine,
    countArr = _require2.countArr;

// Initialise view log


var _require3 = __webpack_require__(0),
    log = _require3.log;

log = log('VIEW');

/**
 * styles
 *
 * - Hold style strings (for tachyon classes)
 * @type {Object}
 */
var styles = {
  main: 'mw8 ma0 w-100 h-100 pa2'
};

/**
 * view
 *
 * Render main tree from model
 * Generate content depending on
 * whether selectedPatient prop exists
 * in model
 *
 * @param  {Object} model - main model
 * @param  {Function} update - main update function
 * @return {Node} - DOM node
 */
module.exports = function (model, update) {
  // View 1. For main view
  if (!model.selectedPatient) {
    return fullView(model, update);
  } else {
    // View 2. For selected patient
    return selectedView(model, update);
  }
};

/**
 * fullView
 *
 * Render search controls, table view & pagination
 * controls
 * @param  {Object} model
 * @param  {Function} update - main update function
 * @return {Node} - DOM node
 */
var fullView = function fullView(model, update) {
  // Assign container
  var main = elt('div', { class: styles.main });
  main.appendChild(searchPanel(model, update));

  // Do not continue if data still loading!
  if (!model.data) {
    main.appendChild(loading());
    return main;
  } else {
    // Display table view & pagination
    main.appendChild(patientTable(model, update));
    main.appendChild(pagination(model, update));
    return main;
  }
};

/**
 * patientTable
 *
 * Builds a table of patient records
 * Each with on click handler to
 * fire select patient msg
 * @param  {Object} model
 * @param  {Function} update - main update function
 * @return {Node}
 */
var patientTable = function patientTable(model, update) {
  // Build table view
  var table = elt('table');
  // Build head html
  table.innerHTML = '\n    <tr>\n      <th>Last name</th>\n      <th>First name</th>\n      <th>Date of Birth</th>\n    </tr>\n    ';
  // Use each record to build a row
  model.data.content.forEach(function (rec) {
    // Initialise tr container
    var row = elt('tr', { class: 'pointer' });
    // Set data in each row
    row.innerHTML = '\n      <td>' + rec.lastName + '</td>\n      <td>' + rec.firstName + '</td>\n      <td>' + rec.dateOfBirth.split('T')[0] + '</td>\n    ';
    // Bind click to SELECT_PATIENT msg
    row.addEventListener('click', function () {
      log('SELECTED: ', rec.firstName, rec.lastName);
      update({ type: SELECT_PATIENT, payload: rec });
    });
    // Add each row
    table.appendChild(row);
  });
  return table;
};

/**
 * selectedPatientView
 *
 * Render independent view with patient data
 * @param  {Object} model
 * @param  {Function} update - main update function
 * @return {String} - html string
 */
var selectedView = function selectedView(model, update) {
  // Hold temp
  var s = model.selectedPatient;
  // Create Container
  var main = elt('div');
  // Prepare fields used
  var data = [{
    label: 'Prefix',
    value: s.prefix
  }, {
    label: 'First name',
    value: s.firstName
  }, {
    label: 'Last name',
    value: s.lastName
  }, {
    label: 'Active?',
    value: s.active ? 'true' : 'false'
  }, {
    label: 'DOB',
    value: s.dateOfBirth.split('T')[0]
  }, {
    label: 'Address Line 1',
    value: s.addresses[0].line1
  }, {
    label: 'Country',
    value: s.addresses[0].country
  }, {
    label: 'Zip Code',
    value: s.addresses[0].zipCode
  }, {
    label: 'Phone',
    value: s.telecoms[0].value
  }];
  // Map data into table cells
  main.innerHTML = '\n    <div>\n      <table>\n      ' + data.map(function (item) {
    return '\n        <tr>\n          <th>' + item.label + '</th>\n          <td>' + item.value + '</td>\n        </tr>\n        ';
  }).join('') + '\n      </table>\n    ';
  // Add back button
  main.appendChild(clearPatientButton(update));
  return main;
};

/**
 * loading
 *
 * standard loading component
 * @return {Node}
 */
var loading = function loading() {
  var spinner = elt('span', null, 'Loading...');
  spinner.innerHTML = 'Loading...';
  return spinner;
};

/**
 * clearSearchButton
 *
 * Render a 'clear' button component.
 * Allow event listener for click
 * to trigger clear search query
 * @param  {Function} update - main update function
 * @return {Node} - dom node
 */
var clearSearchButton = function clearSearchButton(update) {
  var button = elt('button', null, 'Clear');
  button.addEventListener('click', function (e) {
    e.preventDefault();
    update({ type: CLEAR_SEARCH });
  });
  return button;
};

/**
 * clearButtonView
 *
 * Render a 'clear' button component.
 * Allow event listener for click
 * to trigger clear patient in model
 * @param  {Function} update - main update function
 * @return {Node} - dom node
 */
var clearPatientButton = function clearPatientButton(update) {
  var button = elt('button');
  button.innerHTML = 'Back';
  button.addEventListener('click', function (e) {
    e.preventDefault();
    update({ type: CLEAR_SELECTED_PATIENT });
  });
  return button;
};

/**
 * searchPanel
 *
 * Render all of the input
 * field & select components
 * Bind event listeners to
 * set search query
 * @param  {Function} update - main update function
 * @return {Node} - dom node
 */

var searchPanel = function searchPanel(model, update) {
  var main = elt('div');

  // 1. Extract inputs and build each
  var inputs = model.searchFilters.inputs;

  keys(inputs).forEach(function (field) {
    // Define container
    var inputContainer = elt('div');
    var input = elt('input', { class: 'outline-0' });
    input.name = field;
    input.id = field;
    input.value = inputs[field].value;
    input.addEventListener('keyup', function (e) {
      // Call update with updated searchFilters object
      // Assign the corresponding input field the new value
      // Update the lastModified key to indicate this is the
      // latest control key that has been altered
      update({
        type: SET_SEARCH_QUERY,
        payload: combine(model.searchFilters, {
          inputs: combine(inputs, _defineProperty({}, field, {
            value: e.target.value,
            label: inputs[field].label
          })),
          lastModified: field,
          page: 0
        })
      });
    });
    if (model.searchFilters.lastModified === field) {
      // Initialise timeout to focus input
      // Allow focus of input elemnt immediately after
      // user has begun typing
      setTimeout(function () {
        input.focus();
      }, 0);
    }
    // Add label & input
    inputContainer.appendChild(elt('label', { name: field, for: field }, field));
    inputContainer.appendChild(input);
    main.appendChild(inputContainer);
  });

  // 2. Extract selects & build each
  var selects = model.searchFilters.selects;

  keys(selects).forEach(function (field) {
    var selectContainer = elt('div');
    var select = elt('select', { class: 'outline-0' });
    select.name = field;
    selects[field].options.forEach(function (option) {
      // Add options
      // Set value to label option
      // Use 'selected' key on an option that matches
      // associated value in model
      select.appendChild(elt('option', selects[field].value === option.value ? { selected: true } : null, option.label));
    });
    // Allow empty option, select it if nothing selected in model
    select.appendChild(elt('option', selects[field].value ? null : { selected: true }, 'Choose an option...'));
    select.addEventListener('change', function (e) {
      // Find value from label by searching model
      var valueFromLabel = selects[field].options.find(function (x) {
        return x.label === e.target.value;
      });

      // Don't run any query if user selects empty option
      if (!valueFromLabel) return;
      // search query requires a modified searchFilters object
      update({
        type: SET_SEARCH_QUERY,
        payload: combine(model.searchFilters, {
          selects: _defineProperty({}, field, {
            value: valueFromLabel.value,
            options: selects[field].options
          }),
          lastModified: field,
          page: 0
        })
      });
    });
    // Add additional label
    selectContainer.appendChild(elt('label', { name: field, for: field }, field));
    selectContainer.appendChild(select);
    // Render
    main.appendChild(selectContainer);
  });
  // Add clear search button
  main.appendChild(clearSearchButton(update));
  return main;
};

/**
 * pagination
 *
 * A simple select menu creator for page
 * selection
 * @param  {Function} update - main update function
 * @return {Node}  - dom node
 */
var pagination = function pagination(model, update) {
  var main = elt('div');
  // Extract total pages
  var _model$data = model.data,
      totalPages = _model$data.totalPages,
      number = _model$data.number;


  var selectContainer = elt('div');
  var select = elt('select', { class: 'outline-0' });
  countArr(totalPages).forEach(function (num) {
    // Add options
    // Set selected if num equal to number in model
    select.appendChild(elt('option', number === num ? { selected: true } : null, num.toString()));
  });
  select.addEventListener('change', function (e) {
    // Modify searchFilters with newly selected page
    update({
      type: SET_SEARCH_QUERY,
      payload: combine(model.searchFilters, { page: e.target.value })
    });
  });
  // Add a label
  selectContainer.appendChild(elt('label', null, 'Page'));
  selectContainer.appendChild(select);
  // Render
  main.appendChild(selectContainer);
  return main;
};

/***/ })
/******/ ]);
//# sourceMappingURL=app.js.map