#!/bin/bash

source lib/scripts/services_functions.sh

disable_service balena
disable_service docker
stop_service docker
stop_service balena
