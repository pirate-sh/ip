#!/bin/bash

function start_service() {
  if [ "`systemctl is-active $1`" == "inactive" ]
  then
    systemctl start $1
  fi
}

function stop_service() {
  if [ "`systemctl is-active $1`" == "active" ]
  then
    systemctl stop $1
  fi
}

function enable_service() {
  if [ "`systemctl is-enabled $1`" == "disabled" ]
  then
    systemctl enable $1
  fi
}

function disable_service() {
  if [ "`systemctl is-enabled $1`" == "enabled" ]
  then
    systemctl disable $1
  fi
}

disable_service docker
stop_service docker
enable_service balena
start_service balena