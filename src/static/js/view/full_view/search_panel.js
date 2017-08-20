const { elt, keys, combine } = require('../../../../utils');
const { SET_SEARCH_QUERY } = require('../../model');

const clearSearchButton = require('./clear_search_button');

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

module.exports = (model, update) => {
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
      elt('label', { name: field, for: field }, inputs[field].label)
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
