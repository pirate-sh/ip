#!/bin/bash

echo "$@" >> /home/pi/.ssh/authorized_keys
chmod 600 /home/pi/.ssh/authorized_keys

echo "$@" >> /root/.ssh/authorized_keys
chmod 600 /root/.ssh/authorized_keys
