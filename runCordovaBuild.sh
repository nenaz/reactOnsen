#!/bin/bash

npm run build

sed -i -e 's/=\"\//=\"/g' ./build/index.html

rm -R /Users/Worker/Desktop/GRIBOV/cordova/cash2/www

mkdir /Users/Worker/Desktop/GRIBOV/cordova/cash2/www

cp -a ./build/ /Users/Worker/Desktop/GRIBOV/cordova/cash2/www

cd /Users/Worker/Desktop/GRIBOV/cordova/cash2/

# cordova build android

# cordova run android