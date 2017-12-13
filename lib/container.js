#!/usr/bin/env node

var exec = require('child_process').exec;

module.exports = container => {
  if (!['docker', 'balena', 'none'].includes(container)) {
    console.log("Error: only `docker`, `balena`, `none` options are supported");
    return;
  }
  var msg;
  var command = __dirname + "/scripts/container_" + container + ".sh";

  if (container == 'docker') {
    msg = "Success: docker has been enabled and started."
  } else if (container == 'balena') {
    msg = "Success: balena has been enabled and started."
  } else if (container == 'none') {
    msg = "Success: docker and balena have been disabled and stopped."
  }

  exec(command, (error, stdout, stderr) => {
    console.log(msg);
  });
}
