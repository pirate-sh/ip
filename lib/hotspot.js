#!/usr/bin/env node

/**
 * Module dependencies.
 */

var sys = require('util')
var exec = require('child_process').exec;
var spawn = require('child_process').spawn;
var program = require('commander');
var fs = require('fs')

function ifdownup(message) {
  exec('service dhcpcd restart', function(x, y, z) {
    exec('ifdown wlan0', function(x, y, z) {
      exec('sleep 1', function(x, y, z) {
        exec('ifup wlan0', function(x, y, z) {
          exec('sysctl net.ipv4.ip_forward=1', function(x, y, z) {
            /* here we add the iptables rules to forward from eth0 to wlan0 */
            exec('iptables -t nat -A POSTROUTING -o eth0 -j MASQUERADE', function(x, y, z) {
              exec('iptables -A FORWARD -i eth0 -o wlan0 -m state --state RELATED,ESTABLISHED -j ACCEPT  ', function(x, y, z) {
                exec('iptables -A FORWARD -i wlan0 -o eth0 -j ACCEPT', function(x, y, z) {
                  exec('service dnsmasq restart', function(x, y, z) {
                    exec('service hostapd restart', function(x, y, z) {
                      exec('systemctl enable hostapd', function(x, y, z) {
                        exec('systemctl enable dnsmasq', function(x, y, z) {
                          console.log(message)
                        });
                      });
                    })
                  })
                });
              });
            });
          });
        })
      });
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
  var eth0_file = __dirname + '/network_templates/eth0/default'

  var dhcpcd_file = __dirname + '/network_templates/dhcpcd'
  var dnsmasq_file = __dirname + '/network_templates/dnsmasq/hotspot'
  var hostapd_file = __dirname + '/hostapd_templates/hostapd'

  fs.writeFileSync('/etc/network/interfaces', fs.readFileSync(interfaces_file));
  fs.writeFileSync('/etc/network/interfaces.d/wlan0', fs.readFileSync(wlan0_file));
  fs.writeFileSync('/etc/network/interfaces.d/eth0', fs.readFileSync(eth0_file));
  fs.writeFileSync('/etc/dhcpcd.conf', fs.readFileSync(dhcpcd_file))
  fs.writeFileSync('/etc/dnsmasq.conf', fs.readFileSync(dnsmasq_file))
  fs.writeFileSync('/etc/default/hostapd', fs.readFileSync(hostapd_file))

  var rc_local_file = __dirname + '/system_templates/rc.local/hotspot'
  fs.writeFileSync('/etc/rc.local', fs.readFileSync(rc_local_file))

  /* hotspot setup */
  var nopassword_template = __dirname + '/hostapd_templates/no_password'
  var password_template = __dirname + '/hostapd_templates/password'
  var hostapd = '/etc/hostapd/hostapd.conf'
  var channel = getRandomChannel();

  if (password === undefined) {
    fs.readFile(nopassword_template, 'utf8', function(err, data) {
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

    fs.readFile(password_template, 'utf8', function(err, data) {
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