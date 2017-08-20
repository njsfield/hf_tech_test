/**
 * flattenSearchFilters
 *
 * Normalise searchFilter object
 * into flattened value
 * @param  {Object} searchFilters
 * @return {Object}
 */
module.exports = searchFilters => {
  return {
    firstName: searchFilters.inputs.firstName.value,
    lastName: searchFilters.inputs.lastName.value,
    zipCode: searchFilters.inputs.zipCode.value,
    sort: searchFilters.selects.sort.value,
    page: searchFilters.page
  };
};
