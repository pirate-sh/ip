#!/bin/bash

service rpibluetooth stop || true
systemctl daemon-reload
service bluetooth restart || true