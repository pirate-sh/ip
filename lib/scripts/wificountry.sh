#!/bin/bash

COUNTRY=$1
if grep -q "^country=" /etc/wpa_supplicant/wpa_supplicant.conf ; then
    sed -i --follow-symlinks "s/^country=.*/country=$COUNTRY/g" /etc/wpa_supplicant/wpa_supplicant.conf
else
    sed -i --follow-symlinks "1i country=$COUNTRY" /etc/wpa_supplicant/wpa_supplicant.conf
fi
iw reg set "$COUNTRY"

if [ -f /run/wifi-country-unset ] && hash rfkill 2> /dev/null; then
    rfkill unblock wifi
fi

echo $COUNTRY > /etc/rpi-wifi-country