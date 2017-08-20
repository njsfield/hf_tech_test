const { elt } = require('../../../../utils');
const { CLEAR_SELECTED_PATIENT } = require('../../model');
/**
 * clearButtonView
 *
 * Render a button component for
 * user to go back.
 *
 * Allow event listener for click
 * to trigger clear patient in model
 * @param  {Function} update - main update function
 * @return {Node} - button element
 */
module.exports = update => {
  const button = elt('button', null, 'Back');
  button.addEventListener('click', e => {
    e.preventDefault();
    update({ type: CLEAR_SELECTED_PATIENT });
  });
  return button;
};
