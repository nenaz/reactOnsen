#!/bin/bash

# npm run build

sed -i -e 's/=\"\//=\"/g' ./build/index.html

cp -a ./build/ /Users/Worker/Desktop/GRIBOV/cordova/react-app/www

cd /Users/Worker/Desktop/GRIBOV/cordova/react-app/

cordova run android