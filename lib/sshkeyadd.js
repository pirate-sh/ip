#!/usr/bin/env node

var exec = require('child_process').exec;
var fs = require('fs');

module.exports = function(public_key) {
  var root_dir = '/root/.ssh'
  var pi_dir = '/home/.pi/.ssh'
  var root_ssh = root_dir + '/authorized_keys'
  var pi_ssh = pi_dir + '/authorized_keys'

  try {
    if (!fs.existsSync(root_dir)) {
      fs.mkdirSync(root_dir);
      fs.chmodSync(root_dir, 700);
    }

    if (!fs.existsSync(pi_dir)) {
      fs.mkdirSync(pi_dir);
      fs.chmodSync(pi_dir, 700);
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