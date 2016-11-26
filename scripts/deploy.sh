#!/bin/bash

npm run deploy &

# Output to the screen every 30 seconds to prevent a travis timeout
export PID=$!
while [[ `ps -p $PID | tail -n +2` ]]; do
  echo 'Deploying'
  sleep 30
done
