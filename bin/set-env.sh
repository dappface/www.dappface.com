#!/bin/sh

set -o errexit
set -o xtrace

if [ "$GITHUB_EVENT_NAME" = "release" ] ; then
  export APP_ENV=prd
  export DOMAIN=dappface.com
elif [ "$GITHUB_EVENT_NAME" = "push" ] && [ $(basename  "$GITHUB_REF") = 'master' ] ; then
  export APP_ENV=stg
  export DOMAIN=stg.dappface.com
else
  export APP_ENV=dev
  export DOMAIN=dev.dappface.com
fi
