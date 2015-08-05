#!/usr/bin/env node

/**
 * Module dependencies.
 */

var sys = require('sys')
var exec = require('child_process').exec;
var fs = require('fs')
function puts(error, stdout, stderr) { sys.puts(stdout) } 

function ifdownup(error, stdout, stderr) {
  exec('ifdown eth0', function(error, stdout, stderr) {
    if (error !== null) {
      console.log('exec error: ' + error);
    }
    exec('ifup eth0', function(error, stdout, stderr) {
      if (error !== null) {
        console.log('exec error: ' + error);
      }
    })
  })
}

module.exports = function(ip, mask, gateway, dns) {
  var fileName = __dirname + '/interfaces.eth0.template'
  fs.readFile(fileName, 'utf8', function (err,data) {
    if (err) return console.log(err)
    var result = data.replace("IPADDRESS",ip).replace("NETMASK",mask).replace("GATEWAY",gateway).replace("DNS",dns)
    var fileName = '/etc/network/interfaces'
    fs.writeFile(fileName, result, 'utf8', function (err) {
      if (err) return console.log(err)
      ifdownup()
      return console.log('This pirateship has anchored successfully!') 
    })
  })
}


