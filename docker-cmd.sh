#!/bin/bash
mkdir -p /usr/volumes/src
cp -rf /usr/volumes/src/* /usr/src/app

#npm start
npm run build
node dist/server/index.js
