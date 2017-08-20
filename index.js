const server = require('./src');
const log = require('./src/utils').log('SERVER');

// Prevent CORS issues with port 4444;
const PORT = 4444;
const HOST = 'http://localhost';

server.listen(PORT, () => {
  log(`Server live at ${HOST}:${PORT}/`);
});
