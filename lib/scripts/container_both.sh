#!/bin/bash

function start_service() {
  if [ "`systemctl is-active $1`" == "inactive" ]
  then
    systemctl start $1
  fi
}

function enable_service() {
  if [ "`systemctl is-enabled $1`" == "disabled" ]
  then
    systemctl enable $1
  fi
}

enable_service docker
enable_service balena
start_service docker
start_service balena