#!/bin/bash

source lib/scripts/services_functions.sh

disable_service docker
stop_service docker
enable_service balena
start_service balena
