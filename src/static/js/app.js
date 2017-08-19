/** Utils **/

const combine = (...args) => Object.assign({}, ...args);
const log = (...args) => console.log(...args);
const classyElt = (type, classString) => {
  const elt = document.createElement(type);
  elt.className = classString;
  return elt;
};

/** Main DOM Node **/
const GLOBAL_DOM_HOOK = document.getElementById('main');
log('GLOBAL DOM HOOK: ', GLOBAL_DOM_HOOK);

/** Msg constants **/

const SET_BASE_URL = 'SET_BASE_URL';
const SET_SEARCH_TERM = 'SET_SEARCH_TERM';
const CLEAR_SEARCH_TERM = 'CLEAR_SEARCH_TERM';
const GET_DATA_REQUEST = 'GET_DATA_REQUEST';
const GET_DATA_SUCCESS = 'GET_DATA_SUCCESS';
const GET_DATA_FAILURE = 'GET_DATA_FAILURE';
const SELECT_PATIENT = 'SELECT_PATIENT';
const CLEAR_SELECTED_PATIENT = 'CLEAR_SELECTED_PATIENT';
const SET_LOADING = 'SET_LOADING';
const NO_OP = 'NO_OP';

/** Model **/
// flashMessages - null || { type: 'error'||'info', message: string }
// data - null || object
// searchTerm: string
// baseUrl: string
// selectedPatient: null || object
// loading: boolean

const initialModel = {
  flashMessages: null ,
  data: null,
  searchTerm: '',
  baseUrl: 'https://api.interview.healthforge.io:443/api/patient',
  selectedPatient: null,
  loading: false
};

// Hold global model
let GLOBAL_MODEL;

/** View **/

/**
 * _update (internal- called by main update)
 *
 * Takes msg object, (with msg type & payload)
 * Current model, returns array with new updates.
 *
 * @param  {Object} msg - containing type & payload
 * @param  {Object} model - current object
 * @return {Promise} - Return promise that always resolves
 * with array including;
 *
 * 0 - new msg (if any)
 * 1 - new model
 */
const _update = (msg = {type: ""}, model) =>
  new Promise((res) => {

    // Toggle between message type
    switch (msg.type) {

    case SET_BASE_URL: {
      // Set base URL in model
      res([null, combine(model, {baseUrl: msg.payload })]);
      break;
    }

    case SET_SEARCH_TERM: {
      // Set search term in model
      res([{type: GET_DATA_REQUEST, payload: {url: `${model.baseUrl}?lastName=${msg.payload}`}}, combine(model, {searchTerm: msg.payload })]);
      break;
    }

    case CLEAR_SEARCH_TERM: {
      // Clear search term in model
      res([{ type: GET_DATA_REQUEST, payload: { url: model.baseUrl }}, combine(model, {searchTerm: null })]);
      break;
    }

    case SET_LOADING: {
      // Set loading to true
      res([null, combine(model, {loading: true })]);
      break;
    }

    case GET_DATA_REQUEST: {
      // Main getData call
      getData(msg.payload)
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
      res([null, combine(model, {data: msg.payload, loading: false })]);
      break;
    }
    case GET_DATA_FAILURE: {
      // Set flash message notifying user of failure
      res([null, combine(model, {flashMessages: { type: 'error', message: msg.payload, loading: false }})]);
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

/**
 * getData
 *
 * performs fetch request
 * @param  {Object} options ...
 *
 * url     - base url (String)
 * method  - (optional: defaults to get) get/post (String)
 *
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

/** View **/

const view = (model) => {
  // View 1. For selected patient
  if (model.selectedPatient) {
    return selectedPatientView(model);
  }
  // View 2. For main app
  else {
    return mainTableView(model);
  }
};

/**
 * mainTableView
 *
 * Render view with all data (and search field)
 * @param  {Object} model
 * @return {String} - html string
 */
const mainTableView = (model) => {

  // Create Container
  const main = classyElt('div', '');
  // Build top search view
  const searchView = classyElt('div', '');
  searchView.appendChild(searchLabel());
  searchView.appendChild(searchInput(model));
  searchView.appendChild(clearSearchButton());
  main.appendChild(searchView);

  // Do not continue if still loading
  if (model.loading) {
    main.appendChild(loadingSpinner());
    return main;
  }

  // Build table view
  const tableView = classyElt('table', '');
  // Build table html
  tableView.innerHTML = `
    <tr>
      <th>Last name</th>
      <th>First name</th>
      <th>Date of Birth</th>
    </tr>
    `;
  patientRowsView(model).forEach(row => {
    tableView.appendChild(row);
  });
  // Combine
  main.appendChild(tableView);
  return main;
};

/**
 * selectedPatientView
 *
 * Render independent view with patient data
 * @param  {Object} model
 * @return {String} - html string
 */
const selectedPatientView = (model) => {
  // Hold temp
  const s = model.selectedPatient;
  // Create Container
  const main = classyElt('div', '');
  // Set main html
  main.innerHTML = `
    <div>
      <table>
        <tr>
          <th>First name</th>
          <td>${s.firstName}</td>
        </tr>
        <tr>
          <th>First name</th>
          <td>${s.lastName}</td>
        </tr>
        <tr>
          <th>DOB</th>
          <td>${s.dateOfBirth}</td>
        </tr>
      </table>
    `;
  // Set child (back button)
  main.appendChild(clearPatientButton());
};

/**
 * patientRowsView
 *
 * uses model data (if present)
 * to render table rows
 *
 * @param  {Object} model
 * @return {Nodes} - dom nodes
 */
const patientRowsView = (model) =>
  // Display loading spinner if loading
  model.data.content.map(rec => {
    const row = classyElt('tr', '');
    row.innerHTML = `
        <td>${rec.lastName}</td>
        <td>${rec.firstName}</td>
        <td>${rec.dateOfBirth.split('T')[0]}</td>
      `;
    row.addEventListener('click', () => {
      log('SELECTED: ', rec.firstName, ' '. res.lastName);
    });
    return row;
  });

/** View Components **/

const loadingSpinner = () => {
  const spinner = classyElt('span', '');
  spinner.innerHTML = 'Loading';
  return spinner;
};

/**
 * clearButtonView
 *
 * Render a 'clear' button component.
 * Allow event listener for click event
 * to trigger clear search term
 * @return {Node} - dom node
 */
const clearSearchButton = () => {
  const button = classyElt('button', '');
  button.innerHTML = 'Clear';
  button.addEventListener('click', (e) => {
    e.preventDefault();
    update({type: CLEAR_SEARCH_TERM});

  });
  return button;
};

/**
 * clearButtonView
 *
 * Render a 'clear' button component.
 * Allow event listener for click event
 * to trigger clear search term
 * @return {Node} - dom node
 */
const clearPatientButton = () => {
  const button = classyElt('button','');
  button.innerHTML = 'Back';
  button.addEventListener('click', (e) => {
    e.preventDefault();
    update({type: CLEAR_SELECTED_PATIENT});
  });
  return button;
};

/**
 * searchInputView
 *
 * Render a search input component.
 * Allow event listener for change event
 * to trigger set search term
 * @return {Node} - dom node
 */
const searchInput = (model) => {
  const input = classyElt('input', 'outline-0');
  input.name = 'search';
  input.id = 'search';
  input.value = model.searchTerm;
  input.addEventListener('keyup', (e) =>{
    update({type: SET_SEARCH_TERM, payload: e.target.value});
  });
  // Add focus to the back of event queue
  setTimeout(() => {
    input.focus();
  },0);
  return input;
};

const searchLabel = () => {
  const label = document.createElement('label');
  label.setAttribute('for', 'search');
  label.textContent = 'Search';
  return label;
};

/**
 * update
 *
 * Main app
 * @param  {Object} - A msg object
 * @return {Promise} - returns Promise
 */
const update = (msg = {type: NO_OP}) =>
  new Promise(res => {
  // First begin update,
  // use GLOBAL_MODEL
    _update(msg, GLOBAL_MODEL)
      .then(([newMsg, newModel]) => {
        log('MSG PROCESSED: ', msg, 'NEWMODEL: ', newModel);
        // UPDATE GLOBAL_MODEL
        GLOBAL_MODEL = newModel;
        // Apply new model to view
        render(view(newModel));
        // If a message is return
        // Re-call triggerUpdate
        if (newMsg) {
          update(newMsg);
        } else {
          // Log msg & continue
          res();
        }
      });
  });

/**
 * render
 *
 * Allow main dom element to be injected
 * with view
 *
 * @param {Node} elt - new node
 */
const render = (main) => {
  // Reset
  GLOBAL_DOM_HOOK.innerHTML = '';
  // Build
  GLOBAL_DOM_HOOK.appendChild(main);
};

/**
 * init
 *
 * Call to initialise view
 * with initialModel
 */
const init = () => {
  GLOBAL_MODEL = initialModel;
  // 1. Initially set loading
  update({type: SET_LOADING})
    .then(() => {
    // 2. Make call to get data
      update({type: GET_DATA_REQUEST, payload: { url: GLOBAL_MODEL.baseUrl}});
    });
};

// Init app
init();
