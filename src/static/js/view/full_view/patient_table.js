const { elt } = require('../../../../utils');
const { SELECT_PATIENT } = require('../../model');

// Initialise log ready for when patient selected
let { log } = require('../../../../utils');
log = log('PATIENT TABLE');

const styles = require('./styles');

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
  const table = elt('table', { class: styles.table });
  // Build head html
  table.innerHTML = `
    <tr class="ba">
      <th class="${styles.tableHead}">First name</th>
      <th class="${styles.tableHead}">Last name</th>
      <th class="${styles.tableHead}">Date of Birth</th>
    </tr>
    `;
  // Use each record to build a row
  model.data.content.forEach(rec => {
    // Initialise tr container
    const row = elt('tr', { class: styles.tableRow });
    // Set data in each row
    row.innerHTML = `
      <td class="${styles.tableCell}">${rec.firstName}</td>
      <td class="${styles.tableCell}">${rec.lastName}</td>
      <td class="${styles.tableCell}">${rec.dateOfBirth.split('T')[0]}</td>
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
