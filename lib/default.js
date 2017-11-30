#!/usr/bin/env node

var exec = require('child_process').exec;
var fs = require('fs');

module.exports = callback => {
  exec(__dirname + '/scripts/default.sh "' + __dirname + '"', (error, stdout, stderr) => {
    console.log('the rpi has been reset to default');
  });
}