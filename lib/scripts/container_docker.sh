#!/bin/bash

source lib/scripts/services_functions.sh

disable_service balena
stop_service balena
enable_service docker
start_service docker
