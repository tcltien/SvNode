#!/bin/sh
current_dir=`pwd`
whoami=`who -m | awk '{print $1;}'`
group=`groups | awk '{print $1;}'`
app_home="/opt/dtv/admin-nodejs"

# Start processing
echo "Start the installation of the sds-admin app....."
if [ -e "$app_home" ]
then
	rm -rf $app_home
fi
mkdir -p $app_home

cd $app_home

# check out the src from SVN
echo "Checking out the src from SVN to $app_home/. ..."
svn export --force -r $revision https://dtvsvn.cybersoft-vn.com/13s.drtv.0918.0/deliverables/trunk/implementation/sds/admin-nodejs/src .

cd bin
# check out the bin from SVN
echo "Checking out the bin from SVN to $app_home/. ..."
svn export --force https://dtvsvn.cybersoft-vn.com/13s.drtv.0918.0/deliverables/trunk/implementation/sds/admin-nodejs/install/bin .

# add execute mode to the start/stop scripts
chmod a+x *.sh

cd $app_home

# install the nodejs dependencies packages
echo "Install the dependencies packages..."
npm install

cd $current_dir
echo "Done installing the sds-admin app."
