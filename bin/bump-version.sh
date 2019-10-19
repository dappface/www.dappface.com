#!/bin/sh

set -o errexit
set -o nounset
set -o xtrace

if [ ! "${GITHUB_EVENT_NAME:-}" = "release" ] ; then
  exit 0
fi

git config user.email "junichi.sugiura@dappface.com"
git config user.name "LukeSugiura"
git remote set-url origin https://x-access-token:"$GITHUB_TOKEN"@github.com/"$GITHUB_REPOSITORY".git
git checkout master

version=$(basename "$GITHUB_REF")
npm version "$version" --no-git-tag-version

git add -A
git commit -m "Bump package version to $version"
