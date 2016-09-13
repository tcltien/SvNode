#!/bin/sh
cwd=`pwd`
app_home="/opt/dtv/admin-nodejs"
app_logs="$app_home/logs"
cd $app_home

if [ ! -e $app_logs ]
then
	mkdir logs
fi

# Set NODE_ENV = passed parameter 
if [ ! -z $1 ]; then
	export NODE_ENV=$1
elif [ -z "${NODE_ENV}" ]; then
	# set environment to production if NODE_ENV doesn't exist
	export NODE_ENV=production
fi
forever -l $app_logs/foverer.log -a --minUptime=1000 --spinSleepTime=1000 start server.js
echo $NODE_ENV
echo "Server started."

cd $cwd