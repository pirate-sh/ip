#!/bin/bash

source_dir=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )
source $source_dir/services_functions.sh

disable_service rpibluetooth
stop_service rpibluetooth
restart_service bluetooth

sleep 2 # Wait few seconds for bluetooth to start
restart_service bluealsa # restart the bluetooth audio service
