#!/bin/bash

source_dir=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )
source $source_dir/services_functions.sh

enable_service rpibluetooth
restart_service bluetooth
restart_service rpibluetooth

sleep 3 # wait 3 seconds for bluetooth to be completely up

# put rpi bluetooth on discoverable mode
bluetoothctl <<EOF
power on
discoverable on
pairable on
EOF