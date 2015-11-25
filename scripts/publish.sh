#!/bin/bash
# $ ./publish.sh 2.0.0
# $ ./publish.sh 2.0.0_3
set -e
PACKAGE_VERSION=$1
CURRENT_DIR=$(pwd)
SEMANTIC_UI_PACKAGE="${CURRENT_DIR}/dist/semantic:ui"
SEMANTIC_UI_DATA_PACKAGE="${CURRENT_DIR}/dist/semantic:ui-data"

function publish {
  REPO=$1
  echo "publishing ${REPO} ..."

  cd ${REPO}
  # Publishing causes to change .versions file. That is why git commit happens after
  meteor publish
  git add --all
  git commit -m "Meteor package bump version ${PACKAGE_VERSION}"
  git push origin master
  git tag -a v${PACKAGE_VERSION} -m "bump version ${PACKAGE_VERSION}"
  git push --tags
}

publish ${SEMANTIC_UI_DATA_PACKAGE}
publish ${SEMANTIC_UI_PACKAGE}

cd $CURRENT_DIR
echo "${PACKAGE_VERSION}" > version
