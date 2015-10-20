#!/usr/bin/env node

var sys = require('sys')
var exec = require('child_process').exec;
var _ = require('underscore')
var program = require('commander');
var fs = require('fs');
function puts(error, stdout, stderr) { sys.puts(stdout) } 

module.exports = function() {
  file = "/expandfs.sh"
  exec(__dirname+file, function(error, stdout, stderr) {
    if (error) return console.log('execerror')
    if (stderr) {
      process.stdout.write(stderr)
      process.exit(1)
    }
    console.log(':)')
  })
} 
