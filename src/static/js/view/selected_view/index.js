const { elt } = require('../../../../utils');

const selectedTable = require('./selected_table');
const clearPatientButton = require('./clear_patient_button');

const styles = require('./styles');

/**
 * selectedView
 *
 * Render independent view with patient data
 * @param  {Object} model
 * @param  {Function} update - main update function
 * @return {String} - html string
 */
module.exports = (model, update) => {
  // Add back button
  const main = elt('div', { class: styles.main });
  main.appendChild(selectedTable(model));
  main.appendChild(clearPatientButton(update));
  return main;
};
