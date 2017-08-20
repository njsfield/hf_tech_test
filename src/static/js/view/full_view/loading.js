const { elt } = require('../../../../utils');
/**
 * loading
 *
 * standard loading component
 * @return {Node}
 */
module.exports = () => {
  const spinner = elt('span', null, 'Loading...');
  spinner.innerHTML = 'Loading...';
  return spinner;
};
