const { combine } = require('../../utils');

// Model imports
const { NO_OP, GET_DATA_REQUEST, initialModel } = require('./model');

// Main update
const update = require('./update');
// Main view
const view = require('./view');

// Initialise view log
let { log } = require('../../utils');
log = log('APP');
/**
 * Main DOM Node
 */
const GLOBAL_DOM_HOOK = document.getElementById('main');
log('GLOBAL DOM HOOK: ', GLOBAL_DOM_HOOK);

/**
  * Hold global model
  */
let GLOBAL_MODEL = combine({}, initialModel);

/**
 * Main Update
 *
 * Call main update function then use
 * newMsg & newModel to set global model
 *
 * @param  {Object} msg - containing type & (optional) payload
 * @return {Promise}
 */
const mainUpdate = (_msg = { type: NO_OP }) => {
  // Run Promise
  return new Promise(res => {
    // Fire update
    update(_msg, GLOBAL_MODEL)
      // Continue with (optional newMsg & newModel)
      .then(([newMsg, newModel]) => {
        log('MSG PROCESSED: ', _msg, 'NEWMODEL: ', newModel);
        // UPDATE GLOBAL_MODEL
        GLOBAL_MODEL = newModel;
        // Apply new model to view
        // Pass update function for control
        render(view(newModel, mainUpdate));
        // If a message is returned
        // Re-call update function
        if (newMsg) {
          mainUpdate(newMsg);
        } else {
          // Resolve
          res();
        }
      });
  });
};

/**
 * render
 *
 * Allow main dom element to be injected
 * with view
 *
 * @param {Node} viewNode - node returned by view function
 */
const render = viewNode => {
  // Reset
  GLOBAL_DOM_HOOK.innerHTML = '';
  // Build
  GLOBAL_DOM_HOOK.appendChild(viewNode);
};

/**
 * init
 *
 * Fire update to render app on page load
 */
const init = () => {
  // Start by making request on page load
  mainUpdate({ type: GET_DATA_REQUEST });
};

// Initialise
init();
