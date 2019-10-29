#!/bin/sh

set -o errexit
set -o xtrace

if [ "$GITHUB_EVENT_NAME" = "release" ] ; then
  export APP_ENV=prd
  export GATSBY_DOMAIN=dappface.com
elif [ "$GITHUB_EVENT_NAME" = "push" ] && [ $(basename  "$GITHUB_REF") = 'master' ] ; then
  export APP_ENV=stg
  export GATSBY_DOMAIN=stg.dappface.com
else
  export APP_ENV=dev
  export GATSBY_DOMAIN=dev.dappface.com
fi

echo ::set-env name=APP_ENV::"$APP_ENV"
echo ::set-env name=GATSBY_DOMAIN::"$GATSBY_DOMAIN"
