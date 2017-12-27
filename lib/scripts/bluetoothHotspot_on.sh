#!/bin/bash

systemctl daemon-reload
service bluetooth restart || true
bluetoothctl <<EOF
power on
discoverable on
pairable on
EOF
service rpibluetooth start || true
