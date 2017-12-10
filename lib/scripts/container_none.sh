#!/bin/bash
systemctl disable docker
systemctl disable balena
systemctl stop docker
systemctl stop balena