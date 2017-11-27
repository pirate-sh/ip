#!/usr/bin/env node

var exec = require('child_process').exec;
var fs = require('fs')

function ifdownup(message) {
  exec(__dirname + "/scripts/hotspot.sh", (error, stdout, stderr) => {
    console.log(message);
  });
}

function getRandomChannel() {
  var valid_channel = [1, 6, 11];
  var i = parseInt(Math.random() * (valid_channel.length - 1));
  return valid_channel[i];
};

module.exports = (essid, password) => {
  /* network setup */
  var interfaces_file = __dirname + '/templates/network/interfaces/modular'
  var wlan0_file = __dirname + '/templates/network/wlan0/hotspot'
  var eth0_file = __dirname + '/templates/network/eth0/default'
  var dhcpcd_file = __dirname + '/templates/network/dhcpcd/modular'
  var dnsmasq_file = __dirname + '/templates/network/dnsmasq/hotspot'
  var hostapd_file = __dirname + '/templates/network/hostapd/default'

  fs.writeFileSync('/etc/network/interfaces', fs.readFileSync(interfaces_file));
  fs.writeFileSync('/etc/network/interfaces.d/wlan0', fs.readFileSync(wlan0_file));
  fs.writeFileSync('/etc/network/interfaces.d/eth0', fs.readFileSync(eth0_file));
  fs.writeFileSync('/etc/dhcpcd.conf', fs.readFileSync(dhcpcd_file))
  fs.writeFileSync('/etc/dnsmasq.conf', fs.readFileSync(dnsmasq_file))
  fs.writeFileSync('/etc/default/hostapd', fs.readFileSync(hostapd_file))

  var rc_local_file = __dirname + '/templates/rc.local/hotspot'
  fs.writeFileSync('/etc/rc.local', fs.readFileSync(rc_local_file))

  /* hotspot setup */
  var nopassword_template = __dirname + '/templates/network/hostapd/no_password'
  var password_template = __dirname + '/templates/network/hostapd/password'
  var hostapd = '/etc/hostapd/hostapd.conf'
  var channel = getRandomChannel();

  if (password === undefined) {
    fs.readFile(nopassword_template, 'utf8', (err, data) => {
      if (err) {
        console.log(err)
      }

      var result = data.replace("ESSID", essid).replace("CHANNEL", channel)
      fs.writeFile(hostapd, result, 'utf8', err => {
        if (err) {
          console.log(err)
        }
      })
    })
  } else {
    if (password.length < 8) {
      throw new Error("Password must be over 8 characters long!");
    };

    fs.readFile(password_template, 'utf8', (err, data) => {
      if (err) {
        console.log(err);
      }

      var result = data.replace("ESSID", essid).replace("PASSWORD", password).replace("CHANNEL", channel)

      fs.writeFile(hostapd, result, 'utf8', err => {
        if (err) {
          console.log(err);
        }
      })
    })
  }

  ifdownup('This pirateship has anchored successfully!');
}