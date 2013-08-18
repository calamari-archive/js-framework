/*jslint node: true */
'use strict';

module.exports = function(app) {
  app.use(function(req, res, next) {
    if (req.originalUrl === '/favicon.ico') {
      res.send('');
    } else {
      next();
    }
  });
  require('./test_controller')(app);
};
