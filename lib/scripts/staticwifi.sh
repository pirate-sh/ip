#!/bin/bash
ifup wlan0 || true
ifdown wlan0 || true
sleep 1
ifup wlan0 || true