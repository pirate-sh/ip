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

program.parse(process.argv);
