const fs = require('fs');

/**
 * getFile
 *
 * Simple Promise based abstraction
 * for reading a utf8 file
 * @param  {String} path - path in directory tree
 * @return {Promise} - Resolve if found, reject is errors
 */
exports.getFile = path =>
  new Promise((res, rej) => {
    fs.readFile(path, 'utf8', (err, file) => {
      return err ? rej(err) : res(file);
    });
  });

/**
   * getFileSync
   *
   * Simple abstraction around fs's readFileSync
   * @param  {String} path - path in directory tree
   * @return {String} - file contents
   */
exports.getFileSync = path => fs.readFileSync(path, 'utf8');
