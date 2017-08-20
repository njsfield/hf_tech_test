const { elt } = require('../../../../utils');
const { CLEAR_SEARCH } = require('../../model');
/**
 * clearSearchButton
 *
 * Render a 'clear' button component.
 * Allow event listener for click
 * to trigger clear search query
 * @param  {Function} update - main update function
 * @return {Node} - dom node
 */
module.exports = update => {
  const button = elt('button', null, 'Clear');
  button.addEventListener('click', e => {
    e.preventDefault();
    update({ type: CLEAR_SEARCH });
  });
  return button;
};
