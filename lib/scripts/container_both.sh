#!/bin/bash
systemctl stop docker
systemctl stop balena
systemctl enable balena
systemctl enable docker
systemctl start docker
systemctl start balena