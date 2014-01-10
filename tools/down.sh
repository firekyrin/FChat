#!/bin/bash
#down.sh
packages="
socket.io
express
buffer-crc32
commander
connect
cookie
cookie-signature
debug
fresh
methods
mkdirp
range-parser
send"

for line in $packages;do

	while [[ 0 ]]; do
		echo "=====================[downloading $line]"
		npm install $line
		[ $? -eq 0 ] && break;
	done

done
