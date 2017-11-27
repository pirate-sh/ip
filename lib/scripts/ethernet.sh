#!/bin/bash
ifup eth0 || true
ifdown eth0 || true
sleep 1
ifup eth0 || true