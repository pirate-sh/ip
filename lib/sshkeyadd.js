#!/usr/bin/env node

var exec = require('child_process').exec;

module.exports = function(public_key) {
  var command = '/sshkeyadd.sh ' + public_key;
  exec(__dirname+command, function(error, stdout, stderr) {
    if (error) {
      return console.log(error);
    }
    if (stderr) {
      process.stdout.write(stderr);
      process.exit(1);
    }
    console.log('====== Added to `pi` and `root` user\'s authorized_keys ======');
    console.log(public_key);
  })
}
