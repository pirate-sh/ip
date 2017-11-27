#!/usr/bin/env node

/**
 * Module dependencies.
 */

var exec = require('child_process').exec;
var fs = require('fs');

module.exports = callback => {
  cmd = 'sudo cp ' + __dirname + '/interfaces.default /etc/network/interfaces;'
  cmd += 'sudo cp ' + __dirname + '/hostname.default /etc/hostname;'
  cmd += 'sudo cp ' + __dirname + '/hosts.default /etc/hosts;'
  cmd += 'sudo cp ' + __dirname + '/wpa_supplicant.conf.default /etc/wpa_supplicant/wpa_supplicant.conf;'
  cmd += 'sudo cp ' + __dirname + '/rc.local.default /etc/rc.local;'
  cmd += 'sudo rm /usr/local/bin/hostapdstart;'
  cmd += 'sudo rm -rf /etc/hostapd.conf;'
  cmd += 'sudo /etc/init.d/hostname.sh;'
  cmd += 'sudo rm /var/lib/dhcp/dhclient.*;'


  exec(__dirname + "/scripts/default.sh", (error, stdout, stderr) => {
    console.log('the rpi has been reset to default');
  });
}