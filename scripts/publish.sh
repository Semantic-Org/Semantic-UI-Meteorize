#!/bin/bash

set -e
[ -z "$PACKAGE_PATH" ] && echo "PACKAGE_PATH needs to be set" && exit 1
[ -z "$GIT_USER_EMAIL" ] && echo "GIT_USER_EMAIL needs to be set" && exit 1
[ -z "$GIT_USER_NAME" ] && echo "GIT_USER_NAME needs to be set" && exit 1
[ -z "$PACKAGE_VERSION" ] && echo "PACKAGE_VERSION needs to be set" && exit 1

echo "publishing ${PACKAGE_PATH} ..."
cd ${PACKAGE_PATH}
# Publishing causes to change .versions file. That is why git commit happens after
meteor publish
git config user.email "$GIT_USER_EMAIL"
git config user.name "$GIT_USER_NAME"
git add --all
git commit -m "Meteor package bump version ${PACKAGE_VERSION}"
git push origin master
git tag -a v${PACKAGE_VERSION} -m "bump version ${PACKAGE_VERSION}"
git push --tags