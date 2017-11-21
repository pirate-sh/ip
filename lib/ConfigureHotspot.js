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

function ifdownup(message) {
  exec('ifdown wlan0', function(error, stdout, stderr) {
    exec('sleep 1', function(error, stdout, stderr) {
      exec('ifup wlan0', function(error, stdout, stderr) {
        exec('sysctl net.ipv4.ip_forward=1', function(error, stdout, stderr) {
          exec('iptables -t nat -A POSTROUTING -s 192.168.2.0/24 ! -d 192.168.2.0/24 -j MASQUERADE', function(error, stdout, stderr) {
            exec('service dnsmasq restart', function(error, stdout, stderr) {
              exec('service hostapd restart', function(error, stdout, stderr) {
                exec('systemctl enable hostapd', function(error, stdout, stderr) {
                  exec('systemctl enable dnsmasq', function(error, stdout, stderr) {
                    console.log(message)
                  });
                });
              })
            })
          });
        });
      })
    });
  });
}

function getRandomChannel() {
  var valid_channel = [1, 6, 11];
  var i = parseInt(Math.random() * (valid_channel.length - 1));
  return valid_channel[i];
};

module.exports = function(essid, password) {
  /* network setup */
  var interfaces_file = __dirname + '/network_templates/interfaces'
  var wlan0_file = __dirname + '/network_templates/wlan0/hotspot'

  var dhcpcd_file = __dirname + '/network_templates/dhcpcd'
  var dnsmasq_file = __dirname + '/network_templates/dnsmasq/hotspot'
  var hostapd_file = __dirname + '/network_templates/hostapd_templates/hostapd'

  fs.writeFileSync('/etc/network/interfaces', fs.readFileSync(interfaces_file));
  fs.writeFileSync('/etc/network/interfaces.d/wlan0', fs.readFileSync(wlan0_file));
  fs.writeFileSync('/etc/dhcpcd.conf', fs.readFileSync(dhcpcd_file))
  fs.writeFileSync('/etc/dnsmasq.conf', fs.readFileSync(dnsmasq_file))
  fs.writeFileSync('/etc/default/hostapd', fs.readFileSync(hostapd_file))

  var rc_local_file = __dirname + '/system_templates/rc_local_hotspot'
  fs.writeFileSync('/etc/rc.local', fs.readFileSync(rc_local_file))

  /* hotspot setup */
  var nopassword_template = __dirname + '/hostapd_templates/no_password'
  var password_template = __dirname + '/hostapd_templates/password'
  var hostapd = '/etc/hostapd/hostapd.conf'
  var channel = getRandomChannel();

  if (password === undefined) {
    fs.readFile(nopasswd_template, 'utf8', function(err, data) {
      if (err) {
        console.log(err)
      }

      var result = data.replace("ESSID", essid).replace("CHANNEL", channel)
      fs.writeFile(hostapd, result, 'utf8', function(err) {
        if (err) {
          console.log(err)
        }
      })
    })
  } else {
    if (password.length < 8) {
      throw new Error("Password must be over 8 characters long!");
    };

    fs.readFile(passwd_template, 'utf8', function(err, data) {
      if (err) {
        console.log(err);
      }

      var result = data.replace("ESSID", essid).replace("PASSWORD", password).replace("CHANNEL", channel)

      fs.writeFile(hostapd, result, 'utf8', function(err) {
        if (err) {
          console.log(err);
        }
      })
    })
  }

  ifdownup('This pirateship has anchored successfully!');
}