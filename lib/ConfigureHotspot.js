#!/usr/bin/env node

/**
 * Module dependencies.
 */

var sys = require('util')
var exec = require('child_process').exec;
var program = require('commander');
var fs = require('fs')

function puts(error, stdout, stderr) {
  sys.puts(stdout)
}

function ifdownup(error, stdout, stderr) {
  // We need to add uap0 just in case; but we don't care about the error :)
  exec('iw dev wlan0 interface add uap0 type __ap', function(error, stdout, stderr) {
    exec('ifdown uap0', function(error, stdout, stderr) {
      if (error !== null) {
        console.log('exec error: ' + error);
      };
      exec('ifup uap0', function(error, stdout, stderr) {
        if (error !== null) {
          console.log('exec error: ' + error);
        };
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
  cmd = 'sudo cp ' + __dirname + '/network_templates/dnsmasq /etc/dnsmasq.conf;'
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
  ifdownup();
  return console.log('This pirateship has anchored successfully!');
}