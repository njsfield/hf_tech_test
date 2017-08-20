const { elt } = require('../../../../utils');
const { SELECT_PATIENT } = require('../../model');

// Initialise log ready for when patient selected
let { log } = require('../../../../utils');
log = log('PATIENT TABLE');

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
module.exports = (model, update) => {
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
