#!/usr/bin/env node

/**
 * Module dependencies.
 */

var sys = require('util')
var exec = require('child_process').exec;
var spawn = require('child_process').spawn;
var program = require('commander');
var fs = require('fs')

function starthostapd(error, stdout, stderr) {
  exec('killall hostapd', function (error, stdout, sterr) {
      spawn('hostapdstart', {detached: true}).unref();
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
      return console.log(error);
    }
  });
  starthostapd();
  return console.log('This pirateship has anchored successfully!');
}