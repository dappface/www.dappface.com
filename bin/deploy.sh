#!/bin/sh

set -o errexit
set -o xtrace

./node_modules/.bin/firebase use "$APP_ENV" --token="$FIREBASE_TOKEN"
./node_modules/.bin/firebase deploy --token="$FIREBASE_TOKEN"
