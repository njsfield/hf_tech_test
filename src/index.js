const http = require('http');
const router = require('./router');

module.exports = http.createServer(router);
