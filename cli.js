#!/usr/bin/env node

var program = require('commander')
program.allowUnknownOption(true)
var fs = require('fs')
var exec = require('child_process').exec


//console.log(process.argv)

var def = require('./lib/Default.js')

program
  .command('default')
  .description('sets a raspbian back to default configuration')
  .action(def)

var reboot = require('./lib/Reboot.js')

program
  .command('reboot')
  .description('reboots system')
  .action(reboot)

var hostname = require('./lib/ReconfigureHostname.js')

program
  .command('rename <hostname>')
  .description('changes Hostname')
  .action(hostname)

program.parse(process.argv);
