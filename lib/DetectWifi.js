#!/usr/bin/env node

/**
 * Module dependencies.
 */

var sys = require('util')
var exec = require('child_process').exec;
var _ = require('underscore')
var program = require('commander');
var fs = require('fs');
function puts(error, stdout, stderr) { sys.puts(stdout) } 

// detect hardware version of raspberry pi ...
// http://www.raspberrypi-spy.co.uk/2012/09/checking-your-raspberry-pi-board-version/
module.exports = function() {
  cmd = "cat /proc/cpuinfo | grep Revision | sed 's/.* //g' | tr -d '\n'; "

  var list = {
    "000d" : "RPIB",
    "000e" : "RPIB",
    "000f" : "RPIB",
    "0010" : "RPIB+",
    "0011" : "CM",
    "a11041" : "RPI2B",
    "a21041" : "RPI2B",
    "a02082" : "RPI3B"
  }
  exec(cmd, function(error, stdout, stderr) {
    if (error) return console.log('execerror')
    if (stderr) {
      process.stdout.write(stderr)
      process.exit(1)
    }
    console.log(list[stdout])
  })
} 
