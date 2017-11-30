#!/usr/bin/env node

var exec = require('child_process').exec;

// detect hardware version of raspberry pi ...
// http://www.raspberrypi-spy.co.uk/2012/09/checking-your-raspberry-pi-board-version/
module.exports = () => {
  cmd = "cat /proc/cpuinfo | grep Revision | sed 's/.* //g' | tr -d '\n'; "

  // List of revisions from http://elinux.org/RPi_HardwareHistory. ARPI should match one of the revision codes found from this link.
  var list = {
    "Beta": "BETA",
    "0002": "RPIB",
    "0003": "RPIB",
    "0004": "RPIB",
    "0005": "RPIB",
    "0006": "RPIB",
    "0007": "RPIA",
    "0008": "RPIA",
    "0009": "RPIA",
    "000d": "RPIB",
    "000e": "RPIB",
    "000f": "RPIB",
    "0010": "RPIB+",
    "0011": "CM",
    "0012": "RPIA+",
    "0013": "RPIB+",
    "0014": "CM",
    "0015": "RPIA+",
    "a01040": "RPI2B",
    "a01041": "RPI2B",
    "a21041": "RPI2B",
    "a22042": "RPI2B",
    "900021": "RPIA+",
    "900032": "RPIB+",
    "900092": "RPIZ",
    "900093": "RPIZ",
    "920093": "RPIZ",
    "9000c1": "RPIZW",
    "a02082": "RPI3B",
    "a020a0": "CM3",
    "a22082": "RPI3B",
    "a32082": "RPI3B"
  }
  exec(cmd, (error, stdout, stderr) => {
    if (error) {
      console.log('There has been an error running this command: ' + error);
    }

    if (stderr) {
      process.stdout.write(stderr)
      process.exit(1)
    }

    console.log(list[stdout])
  })
}