#!/bin/sh

# Define the root directory where the files are located

ROOT_DIR=/usr/share/nginx/html/
APP_DIR=/usr/share/nginx/html/ui-app/browser

# Echo the initial state of the config file
echo "Initial config.js content:"
cat $ROOT_DIR/config/config.js

# Replace env vars in the JavaScript file
echo "Replacing environment variables in config.js"

# Use sed to replace placeholders with actual environment variable values
sed -i "s|IMAGE_VERSION_PLACEHOLDER|$IMAGE_VERSION|g" $ROOT_DIR/config/config.js
sed -i "s|API_URL_PLACEHOLDER|$API_URL|g" $ROOT_DIR/config/config.js

cp $ROOT_DIR/config/config.js /$APP_DIR

rm $ROOT_DIR/index.html

mv usr/share/nginx/html/ui-app/browser/* $ROOT_DIR

rm -rf $ROOT_DIR/config
rm -rf $APP_DIR

echo "Updated config.js content:"

cat $ROOT_DIR/config/config.js

# Start Nginx
nginx -g 'daemon off;'
