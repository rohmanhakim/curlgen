#!/bin/sh
webpack-dev-server --port 8087 & sleep 5; ./node_modules/.bin/nightwatch
WEBPACK_PROCESS=$(ps ax | grep webpack | grep node | awk '{print $1}')
kill $WEBPACK_PROCESS