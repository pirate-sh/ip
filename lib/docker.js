#!/usr/bin/env node

var exec = require('child_process').exec;
var fs = require('fs');

module.exports = function(dockerimagezip) {
  if (dockerimagezip == undefined) {
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
        console.log("- Image: " + imagePath);
        var command = "gzip -cd " + imagePath + " | docker load";
        exec(command, function(error, stdout, stderr) {
          if (error) {
            return console.log('There has been an error while trying to load this image (' + imagePath + ')');
          }
          fs.unlinkSync(imagePath);
          console.log('The image ' + image + ' has been loaded.');
        });
      });
    })
  } else {
    // this assumes images are always found at /root/dockerimages/
    var imagedir = "/root/dockerimages/";
    var dockerimagezip_fullpath = imagedir + dockerimagezip + ".tar.gz";
    console.log("- Image: " + dockerimagezip_fullpath);

    try {
      stats = fs.statSync(dockerimagezip_fullpath);
      console.log("File exists.");
      var command = "gzip -cd " + dockerimagezip_fullpath + " | docker load";
      exec(command, function(error, stdout, stderr) {
        if (error) {
          return console.log('There has been an error while trying to load this image (' + imagePath + ')');
        }
        fs.unlinkSync(dockerimagezip_fullpath);
        console.log('The image ' + dockerimagezip + ' has been loaded.');
      });
    } catch (e) {
      console.log("File does not exist. Doing nothing...");
    }
  }
}