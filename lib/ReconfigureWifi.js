#!/usr/bin/env node

/**
 * Module dependencies.
 */

var sys = require('util')
var exec = require('child_process').exec;
var program = require('commander');
var fs = require('fs')


function ifdownup(message) {
  exec('ifup wlan0', function(error, stdout, stderr) {
    exec('ifdown wlan0', function(error, stdout, stderr) {
      exec('sleep 1', function(error, stdout, sterr) {
        exec('ifup wlan0', function (error, stdout, stderr) {
          console.log(message);
        });
      });
    });
  });
}


module.exports = function(ESSID, password) {
  var interfaces_file = __dirname + '/network_templates/interfaces'
  var dhcpcd_file = __dirname + '/network_templates/dhcpcd'
  var wlan0_file = __dirname + '/network_templates/wlan0_default'
  var template_wpa_supplicant = __dirname + '/network_templates/wpa_supplicant'
  var system_wpa_supplicant = '/etc/wpa_supplicant/wpa_supplicant.conf'

  fs.writeFileSync('/etc/network/interfaces', fs.readFileSync(interfaces_file));
  fs.writeFileSync('/etc/network/interfaces.d/wlan0', fs.readFileSync(wlan0_file));
  fs.writeFileSync('/etc/dhcpcd.conf', fs.readFileSync(dhcpcd_file))

  if (password === undefined) {
    var network = `
network={
  ssid="` + ESSID + `"
  key_mgmt=NONE
}`

    fs.readFile(template_wpa_supplicant, function(err, data) {
      if (err) {
        console.log(err);
      }

      wpa_supplicant_conf = data + network
      fs.writeFile(system_wpa_supplicant, wpa_supplicant_conf, 'utf8', function(err) {
        if (err) { 
          console.log(err)
        }
        ifdownup('open wifi network')
      })
    });
  } else {
    var cmd = 'wpa_passphrase "' + ESSID + '" "' + password + '"'
    exec(cmd, function(err, stdout, stderr) {
      if (err) {
        console.log(err);
      }
      fs.readFile(template_wpa_supplicant, function(err, data) {
        if (err) {
          console.log(err);
        }
  
        wpa_supplicant_conf = data + stdout
        fs.writeFile(system_wpa_supplicant, wpa_supplicant_conf, 'utf8', function(err) {
          if (err) { 
            console.log(err)
          }
          ifdownup('password network')
        })
      });
    });
  }
}