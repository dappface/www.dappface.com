#!/bin/sh

set -o errexit
set -o xtrace

if [ "$GITHUB_EVENT_NAME" = "release" ] ; then
  export APP_ENV=prd
elif [ "$GITHUB_EVENT_NAME" = "push" ] && [ $(basename  "$GITHUB_REF") = 'master' ] ; then
  export APP_ENV=stg
else
  export APP_ENV=dev
fi
