/*jslint node: true */
'use strict';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var argv   = require('optimist').argv,
    port   = argv.port || 8124,
    address= argv.address || '127.0.0.1',
    app    = require(__dirname + '/app')();

app.server.listen(port, address);

console.log('server started on http://' + address + ':' + port);
