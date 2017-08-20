const server = require('./src');
const { log } = require('./src/utils');
const _log = log('SERVER');

// Prevent CORS issues with port 4444;
const PORT = 4444;
const HOST = 'http://localhost';

server.listen(PORT, () => {
  _log(`Server live at ${HOST}:${PORT}/`);
});
