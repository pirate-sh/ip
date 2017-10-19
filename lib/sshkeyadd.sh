#!/bin/bash

if [ -e /home/pi/.ssh/authorized_keys ]; then
  echo "$@" >> /home/pi/.ssh/authorized_keys
else
  echo "$@" > /home/pi/.ssh/authorized_keys
  chmod 600 /home/pi/.ssh/authorized_keys
fi

if [ -e /root/.ssh/authorized_keys ]; then
  echo "$@" >> /root/.ssh/authorized_keys
else
  echo "$@" > /root/.ssh/authorized_keys
  chmod 600 /root/.ssh/authorized_keys
fi
