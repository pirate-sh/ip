#!/bin/bash

source_dir=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )
source $source_dir/services_functions.sh

disable_service rpibluetooth
stop_service rpibluetooth
restart_service bluetooth