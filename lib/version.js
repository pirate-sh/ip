#!/usr/bin/env node

var packageinfo = require("../package.json");

module.exports = function() {
  console.log(packageinfo.version);
}