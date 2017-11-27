#!/usr/bin/env node

var exec = require('child_process').exec;
var fs = require('fs');

module.exports = function(public_key) {
  var root_ssh = '/root/.ssh/authorized_keys';
  var pi_ssh = '/home/pi/.ssh/authorized_keys';

  try {
    if (!fs.existsSync('/root/.ssh')) {
      fs.mkdirSync(dir);
      fs.chmodSync('/root/.ssh', 700);
    }

    if (!fs.existsSync('/home/pi/.ssh')) {
      fs.mkdirSync(dir);
      fs.chmodSync('/home/pi/.ssh', 700);
    }

    fs.appendFileSync(root_ssh, '\n' + public_key);
    fs.appendFileSync(pi_ssh, '\n' + public_key);

    fs.chownSync(root_ssh, 0, 0);
    fs.chownSync(pi_ssh, 1000, 1000);

    console.log('====== Added to `pi` and `root` user\'s authorized_keys ======');
    console.log(public_key);
  } catch (e) {
    console.log('Error adding the SSH key: ' + e)
  }
}