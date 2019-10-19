#!/bin/sh

set -o errexit
set -o nounset
set -o xtrace

if [ "${GITHUB_EVENT_NAME:-}" = "release" ] ; then
  export APP_ENV=prd
elif [ "${GITHUB_EVENT_NAME:-}" = "push" ] ; then
  if [ $(basename  "${GITHUB_REF:-}") = 'master' ] ; then
    export APP_ENV=stg
  else
    export APP_ENV=dev
  fi
fi

./node_modules/.bin/firebase use "$APP_ENV" --token="$FIREBASE_TOKEN"
./node_modules/.bin/firebase deploy --token="$FIREBASE_TOKEN"
