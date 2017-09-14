#!/usr/bin/env node

/**
 * Module dependencies.
 */

var sys = require('util')
var exec = require('child_process').exec;
var program = require('commander');
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

module.exports = function(essid, password, callback) {
  var fileName = __dirname + '/hostapd.conf.hotspot.template'
  fs.readFile(fileName, 'utf8', function (err,data) {
    if (err) return console.log(err)
    var result = data.replace("ESSID",essid).replace("PASSWORD",password)
    var fileName = '/etc/hostapd/hostapd.conf'
    
    fs.writeFile(fileName, result, 'utf8', function (err) {
      if (err) return console.log(err)
      cmd = 'sudo cp '+__dirname+'/dnsmasq.conf.hotspot.template /etc/dnsmasq.conf;'
      cmd += 'sudo cp '+__dirname+'/interfaces.hotspot.template /etc/network/interfaces;'
      cmd += 'sudo cp '+__dirname+'/hostapdstart.hotspot.template /usr/local/bin/hostapdstart;'
      cmd += 'sudo chmod 667 /usr/local/bin/hostapdstart;'
      cmd += 'sudo cp '+__dirname+'/rc.local.hotspot.template /etc/rc.local;'

      exec(cmd, function(error, stdout, stderr) {
         if (error) return callback(error)
      })
      ifdownup()
      return console.log('This pirateship has anchored successfully!') 
    })  
  }) 
}


