const fullView = require('./full_view');
const selectedView = require('./selected_view');

/**
 * view
 *
 * Main view function.
 * Switch between views if a selected
 * is selected in model
 *
 * @param  {Object} model - main model
 * @param  {Function} update - main update function
 * @return {Node} - DOM node
 */
module.exports = (model, update) => {
  // 1. Display table of patients
  if (!model.selectedPatient) {
    return fullView(model, update);
    // 2. Display selected patient
  } else {
    return selectedView(model, update);
  }
};
