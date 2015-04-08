#!/usr/bin/env node

/**
 * Module dependencies.
 */

var sys = require('sys')
var exec = require('child_process').exec;
var _ = require('underscore')
var program = require('commander');
var fs = require('fs');
function puts(error, stdout, stderr) { sys.puts(stdout) } 

// Set settings.hostname in /etc/hosts and etc/hostname
module.exports = function(callback) {
  cmd = 'sudo reboot; '
  exec(cmd, function(error, stdout, stderr) {
    if (error) return callback(error)
    return callback() 
  })
} 
