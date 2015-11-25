#!/bin/bash
# $ ./generate-and-publish.sh 2.0.0
# $ ./generate-and-publish.sh 2.0.0_2

PACKAGE_VERSION=$1
./scripts/generate.sh $PACKAGE_VERSION
./scripts/publish.sh $PACKAGE_VERSION
