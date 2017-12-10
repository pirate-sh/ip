#!/bin/bash
systemctl stop docker
systemctl enable balena
systemctl start balena