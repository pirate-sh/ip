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
  exec('ifdown wlan0', function(error, stdout, stderr) {
    if (error !== null) {
      console.log('exec error: ' + error);
    }
    exec('ifup wlan0', function(error, stdout, stderr) {
      if (error !== null) {
        console.log('exec error: ' + error);
      }
    })
  })
} 


// Set settings.hostname in /etc/hosts and etc/hostname
module.exports = function(wirelessSSID, password, wirelessSecurityType) {

  switch (wirelessSecurityType) {

    case 'none': 
      var fileName = __dirname + '/interfaces.none.template'
      fs.readFile(fileName, 'utf8', function (err,data) {
        if (err) return console.log(err)
        var result = data.replace("WIRELESSSSID", wirelessSSID)
        var fileName = '/etc/network/interfaces'
        fs.writeFile(fileName, result, 'utf8', function (err) {
          if (err) return console.log(err)
          ifdownup()
          return console.log('success') 
        })
      })
      
      break

    case 'WPA':
      console.log('RECONFIGURING WPA')
      var fileName = __dirname + '/interfaces.wpa.template'
      fs.readFile(fileName, 'utf8', function (err,data) {
        if (err) return console.log(err)
        var fileName = '/etc/network/interfaces'
        fs.writeFile(fileName, data, 'utf8', function (err) {
          if (err) return console.log(err)
          fs.readFile(__dirname + '/wpa_supplicant.conf.template', function(err, data) {
            if (err) return console.log(err)
            $wpa_supplicant_conf = data
            var cmd = 'wpa_passphrase "' + wirelessSSID + '" "' + password + '"'
            exec(cmd, function(err, stdout, stderr) {
              if (err) return console.log(err)
              $wpa_supplicant_conf = $wpa_supplicant_conf + stdout
              fs.writeFile('/etc/wpa_supplicant/wpa_supplicant.conf', $wpa_supplicant_conf, function(err) {
                if (err) return console.log(err)
                ifdownup()
                return console.log()
              })
            })
          })
        })
      })
      break
  }
} 
