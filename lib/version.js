#!/usr/bin/env node

var packageinfo = require("../package.json");

module.exports = () => {
  console.log(packageinfo.version);
}