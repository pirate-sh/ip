#!/usr/bin/env node

var exec = require('child_process').exec;
var fs = require('fs');

function loadImage(imagePath) {
  console.log("- Image: " + imagePath);
  try {
    fs.statSync(imagePath);
  } catch (e) {
    console.log("File does not exist. Doing nothing...");
    return;
  }

  var command = "gzip -cd " + imagePath + " | docker load";

  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.log('There has been an error while trying to load this image (' + imagePath + ')');
    }

    console.log('The image ' + imagePath + ' has been loaded.');
  });
}


module.exports = dockerimagezip => {

  if (dockerimagezip == undefined) {
    fs.readdir("/root/dockerimages", (err, images) => {
      if (err) {
        console.log('There has been an error when trying to read /root/dockerimages.\nYou must be running this command as root.');
        process.exit(1);
      }

      if (!images.length) {
        console.log('The folder is empty. No images were loaded');
        process.exit(1);
      }

      images.forEach(image => {
        var imagePath = "/root/dockerimages/" + image;
        loadImage(imagePath);
        fs.unlinkSync(imagePath);
      });
    })
  } else {
    var imagePath = "/root/dockerimages/" + dockerimagezip + ".tar.gz";
    loadImage(imagePath);
  }
}