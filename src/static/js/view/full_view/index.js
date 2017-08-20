const { elt } = require('../../../../utils');

const header = require('./header');
const searchPanel = require('./search_panel');
const loading = require('./loading');
const patientTable = require('./patient_table');
const pagination = require('./pagination');

const styles = require('./styles');
/**
 * fullView
 *
 * Render header, search controls, table view & pagination
 * controls
 * @param  {Object} model
 * @param  {Function} update - main update function
 * @return {Node} - DOM node
 */
module.exports = (model, update) => {
  // Assign container
  const main = elt('div', { class: styles.main });
  // Add header
  main.appendChild(header());
  // Add search panel
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
