#!/usr/bin/env node

var exec = require('child_process').exec;
var fs = require('fs')

module.exports = country => {

  var availableCountries = [];

  fs.readFile('/usr/share/zoneinfo/iso3166.tab', "utf-8", function(err, data) {
    if (err) {
      console.log("Error: unable to read the list of supported countries");
      return;
    }

    var lines = data.split("\n");
    lines = lines.splice(25, lines.length)
    lines.forEach(line => {
      var country = line.split("\t")[0]
      if (country) {
        availableCountries.push(country)
      }
    })

    if (!availableCountries.includes(country.toUpperCase())) {
      console.log("Error: the country '" + country.toUpperCase() + "' is not supported.");
      return;
    }

    var command = __dirname + "/scripts/wificountry.sh " + country.toUpperCase()

    exec(command, (error, stdout, stderr) => {
      if (error || stderr) {
        console.log("Error: when trying to change the wifi country to '" + country.toUpperCase() + "'");
        console.log(error);
        console.log(stderr);
        return;
      }
      console.log("Success: the wifi country has been set to '" + country.toUpperCase() + "'");
    });
  });
}