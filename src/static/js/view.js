const {
  SET_SEARCH_QUERY,
  CLEAR_SEARCH,
  SELECT_PATIENT,
  CLEAR_SELECTED_PATIENT
} = require('./model');

const { elt, keys, combine, countArr } = require('../../utils');

// Initialise view log
let { log } = require('../../utils');
log = log('VIEW');

/**
 * styles
 *
 * - Hold style strings (for tachyon classes)
 * @type {Object}
 */
const styles = {
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
module.exports = (model, update) => {
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
const fullView = (model, update) => {
  // Assign container
  const main = elt('div', { class: styles.main });
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
const patientTable = (model, update) => {
  // Build table view
  const table = elt('table');
  // Build head html
  table.innerHTML = `
    <tr>
      <th>Last name</th>
      <th>First name</th>
      <th>Date of Birth</th>
    </tr>
    `;
  // Use each record to build a row
  model.data.content.forEach(rec => {
    // Initialise tr container
    const row = elt('tr', { class: 'pointer' });
    // Set data in each row
    row.innerHTML = `
      <td>${rec.lastName}</td>
      <td>${rec.firstName}</td>
      <td>${rec.dateOfBirth.split('T')[0]}</td>
    `;
    // Bind click to SELECT_PATIENT msg
    row.addEventListener('click', () => {
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
const selectedView = (model, update) => {
  // Hold temp
  const s = model.selectedPatient;
  // Create Container
  const main = elt('div');
  // Prepare fields used
  const data = [
    {
      label: 'Prefix',
      value: s.prefix
    },
    {
      label: 'First name',
      value: s.firstName
    },
    {
      label: 'Last name',
      value: s.lastName
    },
    {
      label: 'Active?',
      value: s.active ? 'true' : 'false'
    },
    {
      label: 'DOB',
      value: s.dateOfBirth.split('T')[0]
    },
    {
      label: 'Address Line 1',
      value: s.addresses[0].line1
    },
    {
      label: 'Country',
      value: s.addresses[0].country
    },
    {
      label: 'Zip Code',
      value: s.addresses[0].zipCode
    },
    {
      label: 'Phone',
      value: s.telecoms[0].value
    }
  ];
  // Map data into table cells
  main.innerHTML = `
    <div>
      <table>
      ${data
        .map(
          item => `
        <tr>
          <th>${item.label}</th>
          <td>${item.value}</td>
        </tr>
        `
        )
        .join('')}
      </table>
    `;
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
const loading = () => {
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
 * @param  {Function} update - main update function
 * @return {Node} - dom node
 */
const clearSearchButton = update => {
  const button = elt('button', null, 'Clear');
  button.addEventListener('click', e => {
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
const clearPatientButton = update => {
  const button = elt('button');
  button.innerHTML = 'Back';
  button.addEventListener('click', e => {
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

const searchPanel = (model, update) => {
  const main = elt('div');

  // 1. Extract inputs and build each
  const { inputs } = model.searchFilters;
  keys(inputs).forEach(field => {
    // Define container
    const inputContainer = elt('div');
    const input = elt('input', { class: 'outline-0' });
    input.name = field;
    input.id = field;
    input.value = inputs[field].value;
    input.addEventListener('keyup', e => {
      // Call update with updated searchFilters object
      // Assign the corresponding input field the new value
      // Update the lastModified key to indicate this is the
      // latest control key that has been altered
      update({
        type: SET_SEARCH_QUERY,
        payload: combine(model.searchFilters, {
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
    if (model.searchFilters.lastModified === field) {
      // Initialise timeout to focus input
      // Allow focus of input elemnt immediately after
      // user has begun typing
      setTimeout(() => {
        input.focus();
      }, 0);
    }
    // Add label & input
    inputContainer.appendChild(
      elt('label', { name: field, for: field }, field)
    );
    inputContainer.appendChild(input);
    main.appendChild(inputContainer);
  });

  // 2. Extract selects & build each
  const { selects } = model.searchFilters;
  keys(selects).forEach(field => {
    const selectContainer = elt('div');
    const select = elt('select', { class: 'outline-0' });
    select.name = field;
    selects[field].options.forEach(option => {
      // Add options
      // Set value to label option
      // Use 'selected' key on an option that matches
      // associated value in model
      select.appendChild(
        elt(
          'option',
          selects[field].value === option.value ? { selected: true } : null,
          option.label
        )
      );
    });
    // Allow empty option, select it if nothing selected in model
    select.appendChild(
      elt(
        'option',
        selects[field].value ? null : { selected: true },
        'Choose an option...'
      )
    );
    select.addEventListener('change', e => {
      // Find value from label by searching model
      const valueFromLabel = selects[field].options.find(
        x => x.label === e.target.value
      );

      // Don't run any query if user selects empty option
      if (!valueFromLabel) return;
      // search query requires a modified searchFilters object
      update({
        type: SET_SEARCH_QUERY,
        payload: combine(model.searchFilters, {
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
    selectContainer.appendChild(
      elt('label', { name: field, for: field }, field)
    );
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
const pagination = (model, update) => {
  const main = elt('div');
  // Extract total pages
  const { totalPages, number } = model.data;

  const selectContainer = elt('div');
  const select = elt('select', { class: 'outline-0' });
  countArr(totalPages).forEach(num => {
    // Add options
    // Set selected if num equal to number in model
    select.appendChild(
      elt('option', number === num ? { selected: true } : null, num.toString())
    );
  });
  select.addEventListener('change', e => {
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
