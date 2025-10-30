#!/bin/bash
# Fix SSH key permissions and connect to EC2

# Fix permissions (only owner can read)
chmod 400 /mnt/d/secure\ file/gamezonekey.pem

# Connect to EC2
ssh -i /mnt/d/secure\ file/gamezonekey.pem ubuntu@13.203.206.140
