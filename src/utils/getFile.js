const fs = require('fs');

/**
 * getFile
 *
 * Simple Promise based abstraction
 * for reading a utf8 file
 * @param  {String} path - path in directory tree
 * @return {Promise} - Resolve if found, reject is errors
 */
const getFile = path =>
  new Promise((res, rej) => {
    fs.readFile(path, 'utf8', (err, file) => {
      return err ? rej(err) : res(file);
    });
  });

module.exports = getFile;
