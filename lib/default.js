#!/usr/bin/env node

/**
 * Module dependencies.
 */

var exec = require('child_process').exec;
var fs = require('fs');

module.exports = callback => {
  exec(__dirname + '/scripts/default.sh "' + __dirname + '"', (error, stdout, stderr) => {
    if (error) {
      return console.log(error);
    }

    if (stderr) {
      process.stdout.write(stderr);
      process.exit(1);
    }

    console.log('the rpi has been reset to default');
  });
}