#!/bin/bash
systemctl stop balena
systemctl enable docker
systemctl start docker