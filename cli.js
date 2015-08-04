#!/usr/bin/env node

var program = require('commander')
program.allowUnknownOption(true)
var fs = require('fs')
var exec = require('child_process').exec


console.log(process.argv)

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

var adapter = require('./lib/ReconfigureNetwork.js')

program
  .command('adapter <wirelessSSID> <password> <wirelessSecurityType>')
  .description('connects a adapter to a wifi network')
  .action(adapter)

var eth0 = require('./lib/Eth0.js')

program
  .command('eth0 <ip> <mask> <gateway> <dns>')
  .description('configures rpi network interface to a static ip address')
  .action(eth0)

var detectrpi = require('./lib/DetectRPI.js')

program
  .command('detectrpi [-v]')
  .description('detects the hardware version of a raspberry pi')
  .action(detectrpi)

var detectwifi = require('./lib/DetectWifi.js')

program
  .command('detectwifi [-v]')
  .description('detect chipset of USB-Wifi dongle')
  .action(detectwifi)

program.parse(process.argv);
