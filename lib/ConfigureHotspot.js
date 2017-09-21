#!/usr/bin/env node

/**
 * Module dependencies.
 */

var sys = require('util')
var exec = require('child_process').exec;
var program = require('commander');
var fs = require('fs')
function puts(error, stdout, stderr) { sys.puts(stdout) } 

function ifdownup(error, stdout, stderr) {
  exec('ifdown uap0', function(error, stdout, stderr) {
    if (error !== null) {
      console.log('exec error: ' + error);
    }
    exec('ifup uap0', function(error, stdout, stderr) {
      if (error !== null) {
        console.log('exec error: ' + error);
      }
    })
  })
}

function getRandomChannel(){
  var valid_channel = [1,6,11];
  var i = parseInt(Math.random()*(valid_channel.length-1));
  return valid_channel[i];
};

module.exports = function(essid, password, callback) {

  var template0 = __dirname + '/hostapd.conf.hotspot.nopasswd.template'
  var template1 = __dirname + '/hostapd.conf.hotspot.template'
  var channel = getRandomChannel();
  var hostapd = '/etc/hostapd/hostapd.conf'

  if (password === undefined) {
    fs.readFile(template0, 'utf8', function (err,data) {
      if (err) return console.log(err)
      var result = data.replace("ESSID",essid).replace("CHANNEL",channel)

      fs.writeFile(hostapd, result, 'utf8', function (err) {
        if (err) return console.log(err)
        cmd = 'sudo cp '+__dirname+'/dnsmasq.conf.hotspot.template /etc/dnsmasq.conf;'
        cmd += 'sudo cp '+__dirname+'/interfaces.hotspot.template /etc/network/interfaces;'
        cmd += 'sudo cp '+__dirname+'/hostapdstart.hotspot.template /usr/local/bin/hostapdstart;'
        cmd += 'sudo chmod 667 /usr/local/bin/hostapdstart;'
        cmd += 'sudo cp '+__dirname+'/rc.local.hotspot.template /etc/rc.local;'

        exec(cmd, function(error, stdout, stderr) {
          if (error) return callback(error)
        })
      })
    })
  } else {
    if (password.length < 8 ) throw new Error("Password must be over 8 characters long!");
    fs.readFile(template1, 'utf8', function (err,data) {
      if (err) return console.log(err)
      var result = data.replace("ESSID",essid).replace("PASSWORD",password).replace("CHANNEL",channel)

      fs.writeFile(hostapd, result, 'utf8', function (err) {
        if (err) return console.log(err)
        cmd = 'sudo cp '+__dirname+'/dnsmasq.conf.hotspot.template /etc/dnsmasq.conf;'
        cmd += 'sudo cp '+__dirname+'/interfaces.hotspot.template /etc/network/interfaces;'
        cmd += 'sudo cp '+__dirname+'/hostapdstart.hotspot.template /usr/local/bin/hostapdstart;'
        cmd += 'sudo chmod 667 /usr/local/bin/hostapdstart;'
        cmd += 'sudo cp '+__dirname+'/rc.local.hotspot.template /etc/rc.local;'

        exec(cmd, function(error, stdout, stderr) {
          if (error) return callback(error)
        })
      })
    })
  }
  ifdownup()
  return console.log('This pirateship has anchored successfully!') 
}
