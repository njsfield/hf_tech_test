const { elt } = require('../../../../utils');

const styles = require('./styles');
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
    'Please use the search fields to look up patient records. Click on a patient field to see more info';
  const title = elt('h1', { class: styles.title }, titleText);
  const sub = elt('h2', { class: styles.sub }, subText);
  main.appendChild(title);
  main.appendChild(sub);
  return main;
};
