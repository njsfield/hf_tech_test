/**
 * log
 *
 * Hybrid console.log
 *
 * Allows a module to initialise log
 * with a name prefix before a
 * log statement, e.g. 'ROUTER'
 *
 * @param  {[type]} setting [description]
 * @return {Function} - return function to call with
 * standard args
 */
exports.log = setting =>
  // Use setting as prefix before main call
  (...args) => {
    console.log(`${setting}: `, ...args);
  };

/** Utils **/

/**
   * combine
   *
   * Alias for Object.assign
   * @param  {Objects} args - object(s)
   * @return {Object} - final object
   */
exports.combine = (...args) => Object.assign({}, ...args);

/**
   * keys
   * alias for Object.keys
   */
exports.keys = Object.keys;

/**
   * countArr
   *
   * generate incremental array from integer
   * e.g. countArr(3) => [0,1,2]
   * @param  {num} num - increment amount (last item = num-1)
   * @return {Array} - integer array
   */
exports.countArr = num => Array.from(Array(num).keys());

/**
   * elt (Browser)
   *
   * Create a DOM element,
   * (optional) allow attributes to be set
   * (optional) allow text content to be set
   * @param  {String} type - e.g. div/span/h1
   * @param  {Object} attributes - e.g {class: 'small'}
   * @param  {Object} textContent - e,g, 'Hello world'
   * @return {Node} - Dom Node
   */
exports.elt = (type, attributes, textContent) => {
  const _elt = document.createElement(type);
  // Set each key as attr
  if (attributes) {
    exports.keys(attributes).forEach(key => {
      _elt.setAttribute(key, attributes[key]);
    });
  }
  // Allow text content
  if (textContent) {
    _elt.textContent = textContent;
  }
  return _elt;
};

/* getJson
 *
 * performs JSON fetch request
 * @param  {Object} options ...
 *
 * url     - base url (String)
 * method  - (optional: defaults to get) get/post (String)
 * payload - (optional: JSON payload) (String)
 *
 * @return {Promise} - return promise
 */
exports.getJson = options =>
  new Promise((res, rej) => {
    fetch(options.url, {
      method: 'get',
      mode: 'cors',
      headers: options.headers || {
        Accept: 'application/json'
      }
    })
      .then(response => {
        return response.json();
      })
      .then(response => {
        res(response);
      })
      .catch(e => rej(e));
  });

/**
 * hasTruthyValues
 *
 * Run through all object values
 * to check if any are truthy
 * @param  {Object} obj
 * @return {Boolean}
 */
exports.hasTruthyValues = obj => exports.keys(obj).some(x => obj[x]);
