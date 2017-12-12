#!/usr/bin/env node

var program = require('commander')
program.allowUnknownOption(true)

var commands = [{
    command: 'default',
    description: 'sets a raspbian back to default configuration',
    action: './lib/default.js'
  },
  {
    command: 'rename <hostname>',
    description: 'changes hostname',
    action: './lib/hostname.js'
  },
  {
    command: 'wifi <ESSID> [password]',
    description: 'changes hostname',
    action: './lib/wifi.js'
  },
  {
    command: 'staticwifi <ip> <mask> <gateway> <dns>',
    description: 'configures rpi wifi interface to a static ip address',
    action: './lib/staticwifi.js'
  },
  {
    command: 'ethernet <ip> <mask> <gateway> <dns>',
    description: 'configures rpi network interface to a static ip address',
    action: './lib/ethernet.js'
  },
  {
    command: 'hotspot <ESSID> [password]',
    description: 'creates a mobile hotspot',
    action: './lib/hotspot.js'
  },
  {
    command: 'expandfs',
    description: 'expands the partition of the RPI image to the maximum of the SDcard',
    action: './lib/expandfs.js'
  },
  {
    command: 'detectrpi',
    description: 'detects the hardware version of a raspberry pi',
    action: './lib/detectrpi.js'
  },
  {
    command: 'version',
    description: 'returns the version of pirateship command',
    action: './lib/version.js'
  },
  //  {
  //    command: 'detectwifi',
  //    description: 'detect chipset of USB-Wifi dongle',
  //    action: './lib/detectwifi.js'
  //  },
  {
    command: 'password <password>',
    description: 'change the password for `pi` user',
    action: './lib/password.js'
  },
  {
    command: 'sshkeyadd <public_key>',
    description: 'add a public key to `pi` and `root` user\'s authorized_keys',
    action: './lib/sshkeyadd.js'
  },
  {
    command: 'balena [image]',
    description: 'loads all images under /root/images to balena; then the images are removed',
    action: './lib/balena.js'
  },
  {
    command: 'container [docker|balena|both|none]',
    description: 'enables (and start) the desired container',
    action: './lib/container.js'
  }
]

commands.sort((a, b) => {
  a = a.command.split(" ")[0]
  b = b.command.split(" ")[0]
  return a.localeCompare(b);
});

commands.forEach(command => {
  program
    .command(command.command)
    .description(command.description)
    .action(require(command.action))
})

// default case
program
  .command('*')
  .description('temporary catch all')
  .action(function(env) {
    console.log('ERROR "%s" does not exist\npirateship --help', env);
  });


if (process.argv.length == 2) {
  process.argv.push('--help')
}

program.parse(process.argv);
