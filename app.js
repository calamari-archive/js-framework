/*jslint node: true */
'use strict';

var express  = require('express'),
    http     = require('http'),
    hbs      = require('express-hbs'),
    handlebars = require('handlebars'),
    fs       = require('fs');

module.exports = function() {
  var app          = express()
        .use(express.static(__dirname + '/public'))
        .use(require('connect-assets')({
          helperContext: handlebars
        })),

      server       = http.createServer(app),
      initializers;


  try {
    initializers = fs.readdirSync(__dirname + '/config/initializers');
    initializers.forEach(function(filename) {
      require(__dirname + '/config/initializers/' + filename)(app);
    });
  } catch(e) {
    console.info('No initializers to load.');
  }

  app.server = server;

  // TODO: use helperContext on connect-assets to get rid of this globals:
  handlebars.css.root = '/stylesheets';
  handlebars.js.root  = '/javascripts';

  app.engine('hbs', hbs.express3({
    partialsDir: __dirname + '/views',
    defaultLayout: __dirname + '/views/layouts/application',
    layoutsDir: __dirname + '/views/layouts'
  }));
  app.set('view engine', 'hbs');
  app.set('views', __dirname + '/views');

  // load handlebars helpers
  try {
    fs.readdirSync(__dirname + '/views/helpers/').forEach(function(filename) {
      require(__dirname + '/views/helpers/' + filename);
    });
  } catch(e) {
    console.info('No handlebars helpers to load.');
  }

  require(__dirname + '/router')(app);

  // Production Readyness
  process.on('uncaughtException', function (err) {
    app.logger.error('Uncaught Exception: ', err.toString());
    console.log(err);
  });

  app.get('/health', function(req, res){
    res.send({
      pid: process.pid,
      memory: process.memoryUsage(),
      uptime: process.uptime()
    });
  });

  return app;
};
