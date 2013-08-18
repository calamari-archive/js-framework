/*jslint node: true */
/*globals css, js */
'use strict';

var hbs = require('handlebars');

hbs.registerHelper('css', function(filename) {
  return hbs.css(filename);
});

hbs.registerHelper('js', function(filename) {
  return hbs.js(filename);
});
