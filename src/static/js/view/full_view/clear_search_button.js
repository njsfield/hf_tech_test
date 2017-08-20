const { elt } = require('../../../../utils');
const { CLEAR_SEARCH } = require('../../model');

const styles = require('./styles');
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
  const buttonContainer = elt('div', {
    class: styles.clearSearchButtonContainer
  });
  const button = elt('button', { class: styles.clearSearchButton }, 'Clear');
  button.addEventListener('click', e => {
    e.preventDefault();
    update({ type: CLEAR_SEARCH });
  });
  buttonContainer.appendChild(button);
  return buttonContainer;
};
