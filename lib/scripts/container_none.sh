#!/bin/bash

function stop_service() {
  if [ "`systemctl is-active $1`" == "active" ]
  then
    systemctl stop $1
  fi
}

function disable_service() {
  if [ "`systemctl is-enabled $1`" == "enabled" ]
  then
    systemctl disable $1
  fi
}

disable_service balena
disable_service docker
stop_service docker
stop_service balena