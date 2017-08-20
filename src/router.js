const path = require('path');
const url = require('url');
const { getFile, getFileSync } = require('./utils/getFile');
const { logObj } = require('./utils/logObj');

// Init log for this module
const log = require('./utils').log('ROUTER');

// Set constants
const STATIC_DIR = path.join(__dirname, '../public');
const VIEW_DIR = path.join(__dirname, './views');

const layoutFile = getFileSync(`${VIEW_DIR}/layout.html`);

log(layoutFile ? 'LAYOUT FILE IMPORTED' : 'LAYOUT FILE NOT FOUND');

const injectionMarker = '{{{ }}}';

// Patterns
const staticRegex = /js|css|ico$/;
const viewRegex = /html$/;

// Map route uris to views
const routes = {
  '/': 'index.html'
};

/**
 * pathToContentType
 *
 * Map static paths to content
 * types via their extensions
 * @param  {String} path
 * @return {String} 
 */
const pathToContentType = path => {
  const types = {
    js: 'text/javascript',
    css: 'text/css',
    ico: 'image/x-icon'
  };
  const staticMatch = path.match(staticRegex);
  return staticMatch ? types[staticMatch[0]] : 'text/plain';
};

log('ROUTES INITIALISED', logObj(routes));

/**
 * serve
 *
 * Reads a file & writes to response object
 * for client. If file is a view file,
 * compile its contents into the specified layout
 * file
 *
 * If any errors reading files, reply
 * with 404 to client
 *
 * @param  {String} _path - absolute path of file
 * @param  {Object} res - response object for client
 */
const serve = (_path, res) => {
  getFile(_path)
    .then(file => {
      // If view file requested,
      // merge into layoutFile
      log('FILE FOUND');
      if (viewRegex.test(_path)) {
        log('FILE WAS VIEW. COMPILING...');
        file = layoutFile.replace(injectionMarker, file);
        // Set html content type header for views
        res.setHeader('content-type', 'text/html');
      } else {
        // Set unique content type header for static files
        res.setHeader('content-type', pathToContentType(_path));
      }
      log(logObj('SERVING TO CLIENT: '), _path);
      // res.writeHead(200);
      res.write(file);
      res.end();
    })
    .catch(e => {
      log('FILE NOT FOUND: ', e);
      res.writeHead(404);
      res.write(`404 Not Found: ${e}`);
      res.end();
    });
};

/**
 * Router
 *
 * Basic router to parse URI from
 * request object.
 *
 * Composes absolute path names depending
 * on whether request is for static
 * file of html (view)
 *
 * @param  {Object} req - request object
 * @param  {Object} res - response object
 */
const router = (req, res) => {
  // Extract pathname from uri
  const uri = url.parse(req.url).pathname;
  log('URI: ', uri);
  // Check for static file request
  if (staticRegex.test(uri)) {
    // Build full path
    const staticPath = `${STATIC_DIR}${uri}`;
    log('PREPARING STATIC FILE: ', staticPath);
    serve(staticPath, res);
  } else {
    // Assert uri maps to allowed
    // view file
    if (routes[uri]) {
      // Build path
      const viewPath = `${VIEW_DIR}/${routes[uri]}`;
      log('PREPARING VIEW: ', viewPath);
      serve(viewPath, res);
    } else {
      const notFoundPath = `${VIEW_DIR}/404.html`;
      log('NOT FOUND: ', uri);
      log('PREPARING NOT FOUND VIEW: ', notFoundPath);
      serve(notFoundPath, res);
    }
  }
};

module.exports = router;
