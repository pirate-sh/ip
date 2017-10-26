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

var wifi = require('./lib/ReconfigureWifi.js')

program
  .command('wifi <ESSID> [password]')
  .description('connects to a wifi network')
  .action(wifi)

var staticwifi = require('./lib/ConfigureWifiStatic.js')
program
  .command('staticwifi <ip> <mask> <gateway> <dns>')
  .description('configures rpi wifi interface to a static ip address')
  .action(staticwifi)

var ethernet = require('./lib/ConfigureEthernet.js')

program
  .command('ethernet <ip> <mask> <gateway> <dns>')
  .description('configures rpi network interface to a static ip address')
  .action(ethernet)

var hotspot = require('./lib/ConfigureHotspot.js')

program
  .command('hotspot <ESSID> [password]')
  .description('creates a mobile hotspot')
  .action(hotspot)

var expandfs = require('./lib/ExpandFS.js')

program
  .command('expandfs')
  .description('expands the partition of the RPI image to the maximum of the SDcard')
  .action(expandfs)

var detectrpi = require('./lib/DetectRPI.js')

program
  .command('detectrpi')
  .description('detects the hardware version of a raspberry pi')
  .action(detectrpi)

var version = require('./lib/Version.js')

program
  .command('version')
  .description('returns the version of pirateship command')
  .action(version)

// var detectwifi = require('./lib/DetectWifi.js')

// program
//  .command('detectwifi')
//  .description('detect chipset of USB-Wifi dongle')
//  .action(detectwifi)
var docker = require('./lib/docker.js')
program
  .command('docker [dockerimagezip]')
  .description('loads all images under /root/dockerimages to docker; then the images are removed')
  .action(docker)


var password = require('./lib/Password.js')
program
  .command('password <password>')
  .description('change the password for `pi` user')
  .action(password)

program
  .command('*')
  .description('temporary catch all')
  .action(function(env){
    console.log('ERROR "%s" does not exist\npirateship --help', env);});

if (process.argv.length == 2) {
  process.argv.push('--help')
}

program.parse(process.argv);
