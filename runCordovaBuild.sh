#!/bin/bash

npm run build

sed -i -e 's/=\"\//=\"/g' ./build/index.html

rm -R /Users/Worker/Desktop/GRIBOV/cordova/react-app/www

mkdir /Users/Worker/Desktop/GRIBOV/cordova/react-app/www

cp -a ./build/ /Users/Worker/Desktop/GRIBOV/cordova/react-app/www

cd /Users/Worker/Desktop/GRIBOV/cordova/react-app/

# cordova build android

cordova run android