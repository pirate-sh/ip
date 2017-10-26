#!/usr/bin/env node

/**
 * Module dependencies.
 */

var sys = require('util')
var exec = require('child_process').exec;
var spawn = require('child_process').spawn;
var sleep = require('sleep').sleep;
var program = require('commander');
var fs = require('fs')

function ifdownup(error, stdout, stderr) {
  exec('iw dev wlan0 interface add uap0 type __ap', function(error, stdout, stderr) {
    sleep(5);
    exec('ifdown uap0', function(error, stdout, stderr) {
      exec('ifup uap0', function(error, stdout, stderr) {
      })
    })
  });
}

function getRandomChannel() {
  var valid_channel = [1, 6, 11];
  var i = parseInt(Math.random() * (valid_channel.length - 1));
  return valid_channel[i];
};

module.exports = function(essid, password) {
  var nopasswd_template = __dirname + '/hostapd_templates/nopasswd_network'
  var passwd_template = __dirname + '/hostapd_templates/passwd_network'
  var channel = getRandomChannel();
  var hostapd = '/etc/hostapd/hostapd.conf'

  var cmd = ''
  cmd += 'sudo cp ' + __dirname + '/network_templates/interfaces /etc/network/interfaces;'
  cmd += 'sudo cp ' + __dirname + '/network_templates/dnsmasq /etc/dnsmasq.conf;'
  cmd += 'sudo cp ' + __dirname + '/network_templates/uap0 /etc/network/interfaces.d/;'
  cmd += 'sudo cp ' + __dirname + '/network_templates/uap0_start /etc/network/if-up.d/;'
  cmd += 'sudo chmod +x  /etc/network/if-up.d/uap0_start;'
  cmd += 'sudo cp ' + __dirname + '/hostapd_templates/hostapdstart /usr/local/bin/hostapdstart;'
  cmd += 'sudo chmod +x /usr/local/bin/hostapdstart;'
  cmd += 'sudo cp ' + __dirname + '/system_templates/rc_local_hotspot /etc/rc.local;'

  if (password === undefined) {
    fs.readFile(nopasswd_template, 'utf8', function(err, data) {
      if (err) {
        return console.log(err)
      }

      var result = data.replace("ESSID", essid).replace("CHANNEL", channel)
      fs.writeFile(hostapd, result, 'utf8', function(err) {
        if (err) {
          return console.log(err)
        }
      })
    })
  }
  else {
    if (password.length < 8) {
      throw new Error("Password must be over 8 characters long!");
    };

    fs.readFile(passwd_template, 'utf8', function(err, data) {
      if (err) {
        return console.log(err);
      }

      var result = data.replace("ESSID", essid).replace("PASSWORD", password).replace("CHANNEL", channel)

      fs.writeFile(hostapd, result, 'utf8', function(err) {
        if (err) {
          return console.log(err);
        }
      })
    })
  }

  exec(cmd, function(error, stdout, stderr) {
    if (error) {
      console.log(error);
    }
  });
  ifdownup();
  console.log('This pirateship has anchored successfully!');
}