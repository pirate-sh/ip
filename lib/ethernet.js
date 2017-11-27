#!/usr/bin/env node

var exec = require('child_process').exec;
var fs = require('fs')

function ifdownup(message) {
  exec(__dirname + "/scripts/ethernet.sh", (error, stdout, stderr) => {
    console.log(message);
  });
}

module.exports = function(ip, mask, gateway, dns) {
  var fileName = __dirname + '/templates/network/eth0/static'

  fs.readFile(fileName, 'utf8', (err, data) => {
    if (err) { 
      return console.log(err)
    }

    var result = data.replace("IPADDRESS", ip).replace("NETMASK", mask).replace("GATEWAY", gateway).replace("DNS", dns)
    var fileName = '/etc/network/interfaces.d/eth0'

    fs.writeFile(fileName, result, 'utf8', (err) => {
      if (err) { 
        return console.log(err)
      }

      ifdownup('This pirateship has anchored successfully!');
    })
  })
}