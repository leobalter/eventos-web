'use strict';

var _readFile = require('fs').readFile,
    _writeFile = require('fs').writeFile,
    sprintf = require('util').format,
    Q = require('q'),
    marked = require('marked'),
    title,
    template;

// Promise based `readFile`
function readFile(name) {
  var deferred = Q.defer();

  _readFile(name, function(error, data) {
    if(error) {
      deferred.reject(error);
    }

    deferred.resolve(data.toString());
  });

  return deferred.promise;
}

// Promise based `writeFile`
function writeFile(name, contents) {
  var deferred = Q.defer();

  _writeFile(name, contents, function(error) {
    if(error) {
      deferred.reject(error);
    }

    deferred.resolve();
  });

  return deferred.promise;
}

// Convert string to HTML
function toHtml(data) {
  return marked(data);
}

/**
 * 1. Read template file and store its value
 * 2. Read `README.md` file
 * 3. Parse and store title value and then parse the HTML data
 * 4. Write `index.html` file
 * 5. Prompt success message
 */
readFile('./template.html')
  .then(function(contents) {
    template = contents;
    return readFile('./README.md');
  })
  .then(function(data) {
    title = data.split('\n').shift().replace('#', '');
    return toHtml(data);
  })
  .then(function(contents) {
    contents = sprintf(template, title, contents);
    return writeFile('./index.html', contents);
  })
  .done(function() {
    console.log('File generated with success!');
  });
