#!/usr/bin/env node

var exec = require('child_process').exec;


module.exports = password => {
  var command = "echo pi:" + password + "|chpasswd";
  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.log('There has been an error while trying to change the password. Try to run this as root');
    }
    if (stderr) {
      process.stdout.write(stderr)
      process.exit(1)
    }
    console.log('password change success')
  })
}