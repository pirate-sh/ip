#!/usr/bin/env node

var exec = require('child_process').exec;

module.exports = bluetoothStatus => {
  var bluetoothStatus = bluetoothStatus.toLowerCase();

  if (!['on', 'off'].includes(bluetoothStatus)) {
    console.log("Error: only `on`, `off` options are supported");
    return;
  }

  var bluetooth_file = __dirname + '/templates/bluetooth/' + (bluetoothStatus == 'on' ? 'hostpot' : 'default');

  fs.writeFileSync('/etc/systemd/system/dbus-org.bluez.service', fs.readFileSync(bluetooth_file));

  var msg;
  var command = __dirname + "/scripts/bluetoothHotspot_" + bluetoothStatus + ".sh";

  if (container == 'on') {
    msg = "Success: the bluetooth service, and the hotspot service have been started."
  } else {
    msg = "Success: the bluetooth service has been switched to default, and the hotspot service has been stopped."
  }

  exec(command, (error, stdout, stderr) => {
    console.log(msg);
  });
}
