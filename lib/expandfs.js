#!/usr/bin/env node

var exec = require('child_process').exec;

module.exports = function() {
  var command = "raspi-config --expand-rootfs 2>&1 >/dev/null";

  exec(command, function(error, stdout, stderr) {
    if (error) {
      console.log('There has been an error running this command: ' + error);
    }
    if (stderr) {
      process.stdout.write(stderr)
      process.exit(1)
    }
    console.log('Success: the filesystem will be expanded on the next reboot')
  })
}