#!/bin/bash
service dhcpcd restart || true
ifdown wlan0 || true
sleep 1
ifup wlan0 || true
sysctl net.ipv4.ip_forward=1 || true
iptables -t nat -A POSTROUTING -o eth0 -j MASQUERADE || true
iptables -A FORWARD -i eth0 -o wlan0 -m state --state RELATED,ESTABLISHED -j ACCEPT || true
iptables -A FORWARD -i wlan0 -o eth0 -j ACCEPT || true
service dnsmasq restart || true
service hostapd restart || true
systemctl enable hostapd || true
systemctl enable dnsmasq || true
