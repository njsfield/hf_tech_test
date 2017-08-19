const fs = require('fs');

/**
 * getFileSync
 *
 * Simple abstraction around fs's readFileSync
 * @param  {String} path - path in directory tree
 * @return {String} - file contents
 */
const getFileSync = path => fs.readFileSync(path, 'utf8');

module.exports = getFileSync;
