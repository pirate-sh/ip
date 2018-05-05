#!/bin/bash

source_dir=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )
source $source_dir/services_functions.sh

enable_service rpibluetooth
restart_service bluetooth
restart_service rpibluetooth

sleep 5 # wait 5 seconds for bluetooth to be completely up
