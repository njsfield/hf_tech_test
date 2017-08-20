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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/** Utils **/

/**
 * combine
 *
 * Alias for Object.assign
 * @param  {Objects} args - object(s)
 * @return {Object} - final object
 */
var combine = function combine() {
  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return Object.assign.apply(Object, [{}].concat(args));
};

/**
 * keys
 * alias for Object.keys
 */
var keys = Object.keys;

/**
 * log
 *
 * Alias for console.log
 * @param  {string} args - any args
 */
var log = function log() {
  var _console;

  return (_console = console).log.apply(_console, arguments);
};

/**
 * countArr
 *
 * generate incremental array from integer
 * e.g. countArr(3) => [0,1,2]
 * @param  {num} num - increment amount (last item = num-1)
 * @return {Array} - integer array
 */
var countArr = function countArr(num) {
  return Array.from(Array(num).keys());
};

/**
 * elt
 *
 * Create a DOM element,
 * (optional) allow attributes to be set
 * (optional) allow text content to be set
 * @param  {String} type - e.g. div/span/h1
 * @param  {Object} attributes - e.g {class: 'small'}
 * @param  {Object} textContent - e,g, 'Hello world'
 * @return {Node} - Dom Node
 */
var elt = function elt(type, attributes, textContent) {
  var _elt = document.createElement(type);
  // Set each key as attr
  if (attributes) {
    keys(attributes).forEach(function (key) {
      _elt.setAttribute(key, attributes[key]);
    });
  }
  // Allow text content
  if (textContent) {
    _elt.textContent = textContent;
  }
  return _elt;
};

/**
 * Main DOM Node
 */
var GLOBAL_DOM_HOOK = document.getElementById('main');
log('GLOBAL DOM HOOK: ', GLOBAL_DOM_HOOK);

/**
 * Msg Constants (for update function)
 */

var SET_BASE_URL = 'SET_BASE_URL';
var SET_SEARCH_QUERY = 'SET_SEARCH_QUERY';
var CLEAR_SEARCH = 'CLEAR_SEARCH';
var GET_DATA_REQUEST = 'GET_DATA_REQUEST';
var GET_DATA_SUCCESS = 'GET_DATA_SUCCESS';
var GET_DATA_FAILURE = 'GET_DATA_FAILURE';
var SELECT_PATIENT = 'SELECT_PATIENT';
var CLEAR_SELECTED_PATIENT = 'CLEAR_SELECTED_PATIENT';
var NO_OP = 'NO_OP';

// Available input options
var inputOptions = {
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

// Available sorting options
var selectOptions = {
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

var initialModel = {
  flashMessages: null,
  data: null,
  searchQuery: {
    inputs: inputOptions,
    selects: selectOptions,
    lastModified: 'firstName',
    page: 0
  },
  baseUrl: 'https://api.interview.healthforge.io:443/api/patient',
  selectedPatient: null
};

/**
 * Hold global model
 */
var GLOBAL_MODEL = combine({}, initialModel);

/**
 * getData
 *
 * performs fetch request
 * @param  {Object} options ...
 *
 * url     - base url (String)
 * method  - (optional: defaults to get) get/post (String)
 * payload - (optional: JSON payload) (String)
 *
 * @return {Promise} - return promise
 */
var getData = function getData(options) {
  return new Promise(function (res, rej) {
    fetch(options.url, {
      method: options.method || 'get',
      mode: 'cors',
      headers: new Headers(options.headers || {
        Accept: 'application/json'
      })
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
 * buildUrl
 *
 * Takes a base url, searchQuery object,
 * and serialises options into query string
 * to be appended to base url.
 *
 * @param  {String} baseUrl - initial URL
 * @param  {Object} options - options object (searchQuery)
 * @return {String} - final url
 */
var buildUrl = function buildUrl(baseUrl, options) {
  if (!options) return baseUrl;
  // Create a flattened record
  var flattened = {
    firstName: options.inputs.firstName.value,
    lastName: options.inputs.lastName.value,
    zipCode: options.inputs.zipCode.value,
    sort: options.selects.sort.value,
    page: options.page
  };

  if (keys(flattened).some(function (x) {
    return flattened[x];
  }) === false) {
    log('USING BASE URL FOR QUERY', baseUrl);
    return baseUrl;
  }

  var fullQuery = baseUrl + keys(flattened).reduce(function (acc, cur) {
    return flattened[cur] ? '' + acc + cur + '=' + flattened[cur] + '&' : acc;
  }, '?').replace(/&$/, '');
  log('USING ENHANCED QUERY', fullQuery);
  return fullQuery;
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
 * @return {Node} - DOM node
 */
var view = function view(model) {
  // View 1. For main view
  if (!model.selectedPatient) {
    return fullView(model);
  } else {
    // View 2. For selected patient
    return selectedView(model);
  }
};

/**
 * fullView
 *
 * Render search controls, table view & pagination
 * controls
 * @param  {Object} model
 * @return {Node} - DOM node
 */
var fullView = function fullView(model) {
  // Assign container
  var main = elt('div');
  // Build top search view
  var searchView = elt('div');
  searchView.appendChild(searchControls(model));
  searchView.appendChild(clearSearchButton());
  main.appendChild(searchView);

  // Do not continue if data still loading!
  if (!model.data) {
    main.appendChild(loadingSpinner());
    return main;
  }

  // Build table view
  var tableView = elt('table');
  // Build table html
  tableView.innerHTML = '\n    <tr>\n      <th>Last name</th>\n      <th>First name</th>\n      <th>Date of Birth</th>\n    </tr>\n    ';
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
    tableView.appendChild(row);
  });
  // Combine
  main.appendChild(tableView);
  main.appendChild(pagination(model));
  return main;
};

/**
 * selectedPatientView
 *
 * Render independent view with patient data
 * @param  {Object} model
 * @return {String} - html string
 */
var selectedView = function selectedView(model) {
  // Hold temp
  var s = model.selectedPatient;
  // Create Container
  var main = elt('div');
  // Set main html
  main.innerHTML = '\n    <div>\n      <table>\n        <tr>\n          <th>Prefix</th>\n          <td>' + s.prefix + '</td>\n        </tr>\n        <tr>\n          <th>First name</th>\n          <td>' + s.firstName + '</td>\n        </tr>\n        <tr>\n          <th>First name</th>\n          <td>' + s.lastName + '</td>\n        </tr>\n        <tr>\n          <th>Active?</th>\n          <td>' + (s.active ? 'true' : 'false') + '</td>\n        </tr>\n        <tr>\n          <th>DOB</th>\n          <td>' + s.dateOfBirth.split('T')[0] + '</td>\n        </tr>\n        <tr>\n          <th>Address Line 1</th>\n          <td>' + s.addresses[0].line1 + '</td>\n        </tr>\n        <tr>\n          <th>Country</th>\n          <td>' + s.addresses[0].country + '</td>\n        </tr>\n        <tr>\n          <th>Zip Code</th>\n          <td>' + s.addresses[0].zipCode + '</td>\n        </tr>\n        <tr>\n          <th>Phone</th>\n          <td>' + s.telecoms[0].value + '</td>\n        </tr>\n      </table>\n    ';
  // Set child (back button)
  main.appendChild(clearPatientButton());
  return main;
};

/** View Components **/

var loadingSpinner = function loadingSpinner() {
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
 * @return {Node} - dom node
 */
var clearSearchButton = function clearSearchButton() {
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
 * @return {Node} - dom node
 */
var clearPatientButton = function clearPatientButton() {
  var button = elt('button');
  button.innerHTML = 'Back';
  button.addEventListener('click', function (e) {
    e.preventDefault();
    update({ type: CLEAR_SELECTED_PATIENT });
  });
  return button;
};

/**
 * searchControls
 *
 * Render all of the input
 * field & select components
 * Bind event listeners to
 * set search query
 * @return {Node} - dom node
 */

var searchControls = function searchControls(model) {
  var main = elt('div');

  // 1. Extract inputs and build each
  var inputs = model.searchQuery.inputs;

  keys(inputs).forEach(function (field) {
    // Define container
    var inputContainer = elt('div');
    var input = elt('input', { class: 'outline-0' });
    input.name = field;
    input.id = field;
    input.value = inputs[field].value;
    input.addEventListener('keyup', function (e) {
      // Call update with updated searchQuery object
      // Assign the corresponding input field the new value
      // Update the lastModified key to indicate this is the
      // latest control key that has been altered
      update({
        type: SET_SEARCH_QUERY,
        payload: combine(model.searchQuery, {
          inputs: combine(inputs, _defineProperty({}, field, {
            value: e.target.value,
            label: inputs[field].label
          })),
          lastModified: field,
          page: 0
        })
      });
    });
    if (model.searchQuery.lastModified === field) {
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
  var selects = model.searchQuery.selects;

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
      // search query requires a modified searchQuery object
      update({
        type: SET_SEARCH_QUERY,
        payload: combine(model.searchQuery, {
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
  return main;
};

/**
 * pagination
 *
 * A simple select menu creator for page
 * selection
 * @return {Node}  - dom node
 */
var pagination = function pagination(model) {
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
    // Modify searchQuery with newly selected page
    update({
      type: SET_SEARCH_QUERY,
      payload: combine(model.searchQuery, { page: e.target.value })
    });
  });
  // Add a label
  selectContainer.appendChild(elt('label', null, 'Page'));
  selectContainer.appendChild(select);
  // Render
  main.appendChild(selectContainer);
  return main;
};

/**
 * update
 *
 * Takes msg object,
 * Calls internal function with global model.
 * This sesolves with two-item array -
 *
 * 0 - new msg (if any)
 * 1 - new model
 *
 * Which is then used to set GLOBAL_MODEL to new model &
 * call view function
 *
 * @param  {Object} msg - containing type & (optional) payload
 * @return {Promise}
 */
var update = function update() {
  var _msg = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { type: NO_OP };

  /**
   * Internal
   */
  var _update = function _update(msg, model) {
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
            // Alter searchQuery object, then fire get request
            res([{ type: GET_DATA_REQUEST }, combine(model, {
              searchQuery: combine(model.searchQuery, msg.payload)
            })]);
            break;
          }

        case CLEAR_SEARCH:
          {
            // Reset searchQuery object, then fire get request
            res([{ type: GET_DATA_REQUEST }, combine(model, {
              searchQuery: combine({}, initialModel.searchQuery)
            })]);
            break;
          }

        case GET_DATA_REQUEST:
          {
            // 1. Use build url to compose search query url
            // & Attempt to retrieve data
            getData({ url: buildUrl(model.baseUrl, model.searchQuery) }).then(function (data) {
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

  // Run Promise
  return new Promise(function (res) {
    // Fire update
    _update(_msg, GLOBAL_MODEL)
    // Continue with (optional newMsg & newModel)
    .then(function (_ref) {
      var _ref2 = _slicedToArray(_ref, 2),
          newMsg = _ref2[0],
          newModel = _ref2[1];

      log('MSG PROCESSED: ', _msg, 'NEWMODEL: ', newModel);
      // UPDATE GLOBAL_MODEL
      GLOBAL_MODEL = newModel;
      // Apply new model to view
      render(view(newModel));
      // If a message is returned
      // Re-call update function
      if (newMsg) {
        update(newMsg);
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
  update({ type: GET_DATA_REQUEST });
};

// Initialise
init();

/***/ })
/******/ ]);