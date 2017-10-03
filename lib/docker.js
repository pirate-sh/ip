#!/usr/bin/env node

var exec = require('child_process').exec;
var fs = require('fs');

module.exports = function() {
  fs.readdir("/root/dockerimages", function(err, images) {
    if (err) {
      console.log('There has been an error when trying to read /root/dockerimages.\nYou must be running this command as root.');
      process.exit(1);
    }
    if (!images.length) {
      console.log('The folder is empty. No images were loaded');
      process.exit(1);
    }
    images.forEach(function(image) {
      var imagePath = "/root/dockerimages/" + image;
      var command = "gzip -cd " + imagePath + " | docker load";
      exec(command, function(error, stdout, stderr) {
        if (error) {
          return console.log('There has been an error while trying to load this image (' + imagePath + ')');
        }
        fs.unlink(imagePath);
        console.log('The image ' + image + ' has been loaded.');
      });
    });
  })
}