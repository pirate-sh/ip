#!/bin/bash

mkdir -p /root/.ssh /home/pi/.ssh
chmod 700 /root/.ssh /home/pi/.ssh

echo "$@" >> /home/pi/.ssh/authorized_keys
chmod 600 /home/pi/.ssh/authorized_keys
chown -R pi:pi /home/pi/.ssh

echo "$@" >> /root/.ssh/authorized_keys
chmod 600 /root/.ssh/authorized_keys