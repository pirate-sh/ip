#!/usr/bin/env node

var exec = require('child_process').exec;


module.exports = function(password) {
  var command = "echo pi:" + password +"|chpasswd";
  exec(command, function(error, stdout, stderr) {
    if (error) {
      return console.log('There has been an error while trying to change the password. Try to run this as root');
    }
    if (stderr) {
      process.stdout.write(stderr)
      process.exit(1)
    }
    console.log('The password has been changed correctly')
  })
}
