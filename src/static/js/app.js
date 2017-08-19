/** Utils **/

/**
 * combine
 *
 * Alias for Object.assign
 * @param  {Objects} args - object(s)
 * @return {Object} - final object
 */
const combine = (...args) => Object.assign({}, ...args);

/**
 * keys
 * alias for Object.keys
 */
const keys = Object.keys;

/**
 * log
 *
 * Alias for console.log
 * @param  {string} args - any args
 */
const log = (...args) => console.log(...args);

/**
 * countArr
 *
 * generate incremental array from integer
 * e.g. countArr(3) => [0,1,2]
 * @param  {num} num - increment amount (last item = num-1)
 * @return {Array} - integer array
 */
const countArr = (num) => Array.from(Array(num).keys());

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
const elt = (type, attributes, textContent) => {
  const _elt = document.createElement(type);
  // Set each key as attr
  if (attributes) {
    keys(attributes).forEach(key => {
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
const GLOBAL_DOM_HOOK = document.getElementById('main');
log('GLOBAL DOM HOOK: ', GLOBAL_DOM_HOOK);

/**
 * Msg Constants (for update function)
 */

const SET_BASE_URL = 'SET_BASE_URL';
const SET_SEARCH_QUERY = 'SET_SEARCH_QUERY';
const CLEAR_SEARCH = 'CLEAR_SEARCH';
const GET_DATA_REQUEST = 'GET_DATA_REQUEST';
const GET_DATA_SUCCESS = 'GET_DATA_SUCCESS';
const GET_DATA_FAILURE = 'GET_DATA_FAILURE';
const SELECT_PATIENT = 'SELECT_PATIENT';
const CLEAR_SELECTED_PATIENT = 'CLEAR_SELECTED_PATIENT';
const NO_OP = 'NO_OP';

// Available input options
const inputOptions = {
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
const selectOptions = {
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
      },
    ]
  }
};

/**
 * initialModel
 */

const initialModel = {
  flashMessages: null,
  data: null,
  searchQuery: {
    inputs: inputOptions,
    selects: selectOptions,
    lastModified: 'firstName',
    page: 0
  },
  baseUrl: 'https://api.interview.healthforge.io:443/api/patient',
  selectedPatient: null,
};

/**
 * Hold global model
 */
let GLOBAL_MODEL = combine({}, initialModel);

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
const getData = (options) =>
  new Promise((res,rej) => {
    fetch(options.url, {
      method: options.method || 'get',
      mode: 'cors',
      headers: new Headers(options.headers || {
        'Accept': 'application/json'
      })
    })
      .then(response => {
        return response.json();
      })
      .then(response => {
        res(response);
      })
      .catch(e => rej(e));
  });

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
const buildUrl = (baseUrl, options) => {
  if (!options) return baseUrl;
  // Create a flattened record
  const flattened = {
    firstName: options.inputs.firstName.value,
    lastName: options.inputs.lastName.value,
    zipCode: options.inputs.zipCode.value,
    sort: options.selects.sort.value,
    page: options.page
  };

  if (keys(flattened).some(x => flattened[x]) === false) {
    log('USING BASE URL FOR QUERY', baseUrl);
    return baseUrl;
  }

  const fullQuery = baseUrl + keys(flattened)
    .reduce((acc,cur) => flattened[cur] ? `${acc}${cur}=${flattened[cur]}&` : acc, '?')
    .replace(/&$/, '');
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
const view = (model) => {
  // View 1. For main view
  if (!model.selectedPatient) {
    return fullView(model);
  }
  // View 2. For selected patient
  else {
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
const fullView = (model) => {
  // Assign container
  const main = elt('div');
  // Build top search view
  const searchView = elt('div');
  searchView.appendChild(searchControls(model));
  searchView.appendChild(clearSearchButton());
  main.appendChild(searchView);

  // Do not continue if data still loading!
  if (!model.data) {
    main.appendChild(loadingSpinner());
    return main;
  }

  // Build table view
  const tableView = elt('table');
  // Build table html
  tableView.innerHTML = `
    <tr>
      <th>Last name</th>
      <th>First name</th>
      <th>Date of Birth</th>
    </tr>
    `;
  // Use each record to build a row
  model.data.content.forEach(rec => {
    // Initialise tr container
    const row = elt('tr', {class: 'pointer'});
    // Set data in each row
    row.innerHTML = `
      <td>${rec.lastName}</td>
      <td>${rec.firstName}</td>
      <td>${rec.dateOfBirth.split('T')[0]}</td>
    `;
    // Bind click to SELECT_PATIENT msg
    row.addEventListener('click', () => {
      log('SELECTED: ', rec.firstName, rec.lastName);
      update({type: SELECT_PATIENT, payload: rec});
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
const selectedView = (model) => {
  // Hold temp
  const s = model.selectedPatient;
  // Create Container
  const main = elt('div');
  // Set main html
  main.innerHTML = `
    <div>
      <table>
        <tr>
          <th>Prefix</th>
          <td>${s.prefix}</td>
        </tr>
        <tr>
          <th>First name</th>
          <td>${s.firstName}</td>
        </tr>
        <tr>
          <th>First name</th>
          <td>${s.lastName}</td>
        </tr>
        <tr>
          <th>Active?</th>
          <td>${s.active ? 'true' : 'false'}</td>
        </tr>
        <tr>
          <th>DOB</th>
          <td>${s.dateOfBirth.split('T')[0]}</td>
        </tr>
        <tr>
          <th>Address Line 1</th>
          <td>${s.addresses[0].line1}</td>
        </tr>
        <tr>
          <th>Country</th>
          <td>${s.addresses[0].country}</td>
        </tr>
        <tr>
          <th>Zip Code</th>
          <td>${s.addresses[0].zipCode}</td>
        </tr>
        <tr>
          <th>Phone</th>
          <td>${s.telecoms[0].value}</td>
        </tr>
      </table>
    `;
  // Set child (back button)
  main.appendChild(clearPatientButton());
  return main;
};

/** View Components **/

const loadingSpinner = () => {
  const spinner = elt('span', null, 'Loading...');
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
const clearSearchButton = () => {
  const button = elt('button', null, 'Clear');
  button.addEventListener('click', e => {
    e.preventDefault();
    update({type: CLEAR_SEARCH});
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
const clearPatientButton = () => {
  const button = elt('button');
  button.innerHTML = 'Back';
  button.addEventListener('click', (e) => {
    e.preventDefault();
    update({type: CLEAR_SELECTED_PATIENT});
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

const searchControls = (model) => {
  const main = elt('div');

  // 1. Extract inputs and build each
  const { inputs } = model.searchQuery;
  keys(inputs).forEach(field => {
    // Define container
    const inputContainer = elt('div');
    const input = elt('input', {class: 'outline-0'});
    input.name = field;
    input.id = field;
    input.value = inputs[field].value;
    input.addEventListener('keyup', e => {
      // Call update with updated searchQuery object
      // Assign the corresponding input field the new value
      // Update the lastModified key to indicate this is the
      // latest control key that has been altered
      update({type: SET_SEARCH_QUERY, payload: combine(model.searchQuery,
        {
          inputs: combine(inputs, {
            [field]: {
              value: e.target.value,
              label: inputs[field].label
            }
          }),
          lastModified: field,
          page: 0
        })
      });
    });
    if (model.searchQuery.lastModified === field) {
      // Initialise timeout to focus input
      // Allow focus of input elemnt immediately after
      // user has begun typing
      setTimeout(() => {
        input.focus();
      },0);
    }
    // Add label & input
    inputContainer.appendChild(elt('label', {name: field, for: field}, field));
    inputContainer.appendChild(input);
    main.appendChild(inputContainer);
  });

  // 2. Extract selects & build each
  const { selects } = model.searchQuery;
  keys(selects).forEach(field => {
    const selectContainer = elt('div');
    const select = elt('select', {class: 'outline-0'});
    select.name = field;
    selects[field].options.forEach(option => {
      // Add options
      // Set value to label option
      // Use 'selected' key on an option that matches
      // associated value in model
      select.appendChild(elt('option', selects[field].value === option.value ? { selected: true } : null, option.label));
    });
    // Allow empty option, select it if nothing selected in model
    select.appendChild(elt('option', selects[field].value ? null : { selected: true }, 'Choose an option...'));
    select.addEventListener('change', e => {
      // Find value from label by searching model
      const valueFromLabel = selects[field].options.find(x => x.label === e.target.value);

      // Don't run any query if user selects empty option
      if (!valueFromLabel) return;
      // search query requires a modified searchQuery object
      update({type: SET_SEARCH_QUERY, payload: combine(model.searchQuery,
        {
          selects: {
            [field]: {
              value: valueFromLabel.value,
              options: selects[field].options
            }
          },
          lastModified: field,
          page: 0
        })
      });
    });
    // Add additional label
    selectContainer.appendChild(elt('label', {name: field, for: field}, field));
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
const pagination = (model) => {
  const main = elt('div');
  // Extract total pages
  const { totalPages, number } = model.data;

  const selectContainer = elt('div');
  const select = elt('select', {class: 'outline-0'});
  countArr(totalPages).forEach(num => {
    // Add options
    // Set selected if num equal to number in model
    select.appendChild(elt('option', number === num ? { selected: true } : null, num.toString() ));
  });
  select.addEventListener('change', (e) => {
    // Modify searchQuery with newly selected page
    update({type: SET_SEARCH_QUERY, payload: combine(model.searchQuery, {page: e.target.value})});
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
const update = (_msg = {type: NO_OP}) => {
  /**
   * Internal
   */
  const _update = (msg, model) =>
    new Promise((res) => {

      // Toggle between message type
      switch (msg.type) {

      case SET_BASE_URL: {
        // Set base URL in model
        res([null, combine(model, {baseUrl: msg.payload })]);
        break;
      }

      case SET_SEARCH_QUERY: {
        // Alter searchQuery object, then fire get request
        res([{type: GET_DATA_REQUEST }, combine(model, {searchQuery: combine(model.searchQuery, msg.payload)})]);
        break;
      }

      case CLEAR_SEARCH: {
        // Reset searchQuery object, then fire get request
        res([{ type: GET_DATA_REQUEST }, combine(model, {searchQuery: combine({}, initialModel.searchQuery) })]);
        break;
      }

      case GET_DATA_REQUEST: {
        // 1. Use build url to compose search query url
        // & Attempt to retrieve data
        getData({url: buildUrl(model.baseUrl, model.searchQuery)})
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
        res([null, combine(model, {data: msg.payload})]);
        break;
      }
      case GET_DATA_FAILURE: {
        // Set flash message notifying user of failure
        res([null, combine(model, {flashMessages: { type: 'error', message: msg.payload }})]);
        break;
      }
      case SELECT_PATIENT: {
        // Set selectedPatient key
        res([null, combine(model, {selectedPatient: msg.payload })]);
        break;
      }
      case CLEAR_SELECTED_PATIENT: {
        // Set selectedPatient key
        res([null, combine(model, {selectedPatient: null })]);
        break;
      }
      case NO_OP: {
        // Default
        res([null, model]);
      }
      }
    });

  // Run Promise
  return new Promise(res => {
    // Fire update
    _update(_msg, GLOBAL_MODEL)
      // Continue with (optional newMsg & newModel)
      .then(([newMsg, newModel]) => {
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
const render = (viewNode) => {
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
const init = () => {
  // Start by making request on page load
  update({type: GET_DATA_REQUEST});
};

// Initialise
init();
