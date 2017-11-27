#!/usr/bin/env node

var exec = require('child_process').exec;
var fs = require('fs')


function ifdownup(message) {
  exec(__dirname + "/scripts/wifi.sh", function(error, stdout, stderr) {
    console.log(message);
  });
}


module.exports = function(ESSID, password) {
  /* network setup */
  var interfaces_file = __dirname + '/templates/network/interfaces/modular'
  var dhcpcd_file = __dirname + '/templates/network/dhcpcd/modular'
  var dnsmasq_file = __dirname + '/templates/network/dnsmasq/default'
  var wlan0_file = __dirname + '/templates/network/wlan0/default'
  var eth0_file = __dirname + '/templates/network/eth0/default'

  fs.writeFileSync('/etc/network/interfaces', fs.readFileSync(interfaces_file));
  fs.writeFileSync('/etc/network/interfaces.d/wlan0', fs.readFileSync(wlan0_file));
  fs.writeFileSync('/etc/network/interfaces.d/eth0', fs.readFileSync(eth0_file));
  fs.writeFileSync('/etc/dhcpcd.conf', fs.readFileSync(dhcpcd_file))
  fs.writeFileSync('/etc/dnsmasq.conf', fs.readFileSync(dnsmasq_file))

  var rc_local_file = __dirname + '/templates/rc.local/default'
  fs.writeFileSync('/etc/rc.local', fs.readFileSync(rc_local_file))

  /* wifi setup */
  var template_wpa_supplicant = __dirname + '/templates/network/wpa_supplicant'
  var system_wpa_supplicant = '/etc/wpa_supplicant/wpa_supplicant.conf'

  if (password === undefined) {
    var network = `
network={
  ssid="` + ESSID + `"
  key_mgmt=NONE
}`

    fs.readFile(template_wpa_supplicant, (err, data) => {
      if (err) {
        console.log(err);
      }

      wpa_supplicant_conf = data + network
      fs.writeFile(system_wpa_supplicant, wpa_supplicant_conf, 'utf8', err => {
        if (err) {
          console.log(err)
        }
        ifdownup('open wifi network')
      });
    });
  } else {
    var cmd = 'wpa_passphrase "' + ESSID + '" "' + password + '"';

    exec(cmd, (err, stdout, stderr) => {
      if (err) {
        console.log(err);
      };

      fs.readFile(template_wpa_supplicant, (err, data) => {
        if (err) {
          console.log(err);
        }

        wpa_supplicant_conf = data + stdout
        fs.writeFile(system_wpa_supplicant, wpa_supplicant_conf, 'utf8', err => {
          if (err) {
            console.log(err)
          }
          ifdownup('password network')
        })
      });
    });
  }
}