#!/usr/bin/env node

var exec = require('child_process').exec;

module.exports = () => {
  var command = "iwconfig wlan0";

  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.log('There has been an error running this command: ' + error);
    }
    if (stderr) {
      process.stdout.write(stderr)
      process.exit(1)
    }
    var change = stdout.split("\n");
    var SSID = change[0];
    var index = SSID.indexOf("ESSID");
    SSID = SSID.slice(index);

    var signal = change[6];
    index = signal.indexOf("Signal");
    signal = signal.slice(index);
    console.log(SSID + signal);
  })
}