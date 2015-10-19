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

var hostname = require('./lib/ReconfigureHostname.js')

program
  .command('rename <hostname>')
  .description('changes Hostname')
  .action(hostname)

var adapter = require('./lib/ReconfigureNetwork.js')

program
  .command('adapter <wirelessSSID> <password> <wirelessSecurityType>')
  .description('[deprecated] connects a adapter to a wifi network')
  .action(adapter)

var wifi = require('./lib/ReconfigureWifi.js')

program
  .command('wifi <ESSID> [password]')
  .description('connects to a wifi network')
  .action(wifi)

var ethernet = require('./lib/ConfigureEthernet.js')

program
  .command('ethernet <ip> <mask> <gateway> <dns>')
  .description('configures rpi network interface to a static ip address')
  .action(ethernet)

var expandfs = require('./lib/ExpandFS.js')

programm
  .command('expandfs')
  .description('expands the partition of the RPI image to the maximum of the SDcard')
  .action(expandfs)

var detectrpi = require('./lib/DetectRPI.js')

program
  .command('detectrpi')
  .description('detects the hardware version of a raspberry pi')
  .action(detectrpi)

var detectwifi = require('./lib/DetectWifi.js')

program
  .command('detectwifi')
  .description('detect chipset of USB-Wifi dongle')
  .action(detectwifi)

program
  .command('*')
  .description('temporary catch all')
  .action(function(env){
    console.log('ERROR "%s" does not exsist\npirateship --help', env);});

if (process.argv.length == 2) {
  process.argv.push('--help')
}

program.parse(process.argv);
