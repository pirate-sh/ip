#!/bin/bash

service bluetooth start || true
bluetoothctl <<EOF
power on
discoverable on
pairable on
EOF
service rpibluetooth start || true
