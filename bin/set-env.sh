#!/bin/sh

set -o errexit
set -o xtrace

if [ "$GITHUB_EVENT_NAME" = "release" ] ; then
  export APP_ENV=prd
  export GATSBY_DOMAIN=dappface.com
elif [ "$GITHUB_EVENT_NAME" = "push" ] && [ $(basename  "$GITHUB_REF") = 'master' ] ; then
  export GATSBY_DOMAIN=stg
  export DOMAIN=stg.dappface.com
else
  export GATSBY_DOMAIN=dev
  export DOMAIN=dev.dappface.com
fi
