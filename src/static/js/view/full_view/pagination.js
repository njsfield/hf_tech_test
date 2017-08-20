const { elt, countArr, combine } = require('../../../../utils');
const { SET_SEARCH_QUERY } = require('../../model');

/**
 * pagination
 *
 * A simple select menu creator for page
 * selection
 * @param  {Function} update - main update function
 * @return {Node}  - dom node
 */
module.exports = (model, update) => {
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
