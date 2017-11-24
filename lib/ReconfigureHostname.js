#!/usr/bin/env node

/**
 * Module dependencies.
 */

var sys = require('util')
var exec = require('child_process').exec;
var _ = require('underscore')
var program = require('commander');
var fs = require('fs')
function puts(error, stdout, stderr) { sys.puts(stdout) } 


// Set settings.hostname in /etc/hosts and etc/hostname
module.exports = function(newHostname) {

  var fileName = __dirname + '/hosts.template'
  fs.readFile(fileName, 'utf8', function (err,data) {

    var result = data.replace('HOSTNAME', newHostname)
    var fileName = '/etc/hosts'
    fs.writeFile(fileName, result, 'utf8', function (err) {

      var fileName = '/etc/hostname'
      fs.readFile(fileName, 'utf8', function (err,data) {

        var result = newHostname+'\n'
        fs.writeFile(fileName, result, 'utf8', function (err) {

          var cmd = 'hostname ' + newHostname;
          exec(cmd, function(error, stdout, stderr) {
            if (error) {
              console.log("There has been an error: " + error);
            }
          })

        })
      })
    })
  })

} 
