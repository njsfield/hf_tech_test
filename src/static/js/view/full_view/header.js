const { elt } = require('../../../../utils');
/**
 * Header
 *
 * Simple header component.
 * Composed of title & sub element
 * @return {Node}
 */
module.exports = () => {
  const main = elt('div');
  const titleText = 'Patient Lookup';
  const subText =
    'Please use the search fields to look up patient records. Click on a patient to see more info';
  const title = elt('h1', null, titleText);
  const sub = elt('h2', null, subText);
  main.appendChild(title);
  main.appendChild(sub);
  return main;
};
