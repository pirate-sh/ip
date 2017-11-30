#!/usr/bin/env node

var exec = require('child_process').exec;
var fs = require('fs')


module.exports = newHostname => {

  var fileName = __dirname + '/templates/hosts';
  var defaultHostname = 'raspberrypi';

  fs.readFile(fileName, 'utf8', (err, data) => {
    var result = data.replace('HOSTNAME', newHostname)
    fs.writeFile('/etc/hosts', result, 'utf8', err => {
      fs.writeFile('/etc/hostname', newHostname, 'utf8', err => {
        var cmd = 'hostname ' + newHostname;
        exec(cmd, (error, stdout, stderr) => {
          if (error) {
            console.log('There has been an error running this command: ' + error);
          }

          if (stderr) {
            process.stdout.write(stderr)
            process.exit(1)
          }

          console.log('Success: the hostname has been modified')
        })
      })
    })
  })
}