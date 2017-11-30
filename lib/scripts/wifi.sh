#!/bin/bash
systemctl disable hostapd || true
systemctl disable dnsmasq || true
service dhcpcd restart || true
service hostapd stop || true
service dnsmasq stop || true
ifup wlan0 || true
ifdown wlan0 || true
sleep 1
ifup wlan0 || true

