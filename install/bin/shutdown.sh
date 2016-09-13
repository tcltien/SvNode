#!/bin/sh
cwd=`pwd`
app_home="/opt/dtv/admin-nodejs"
cd $app_home

# set environment to production
export NODE_ENV=production
forever stop 0
echo "Server stopped."

cd $cwd