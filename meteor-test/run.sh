#!/usr/bin/env bash
# this file helps with the testing part

usage() {
  echo "Usage: $0 [clean|start]"
  echo "  clean: removes everything from client except custom.semantic.json"
  echo "  start: starts meteor"
}

if [ "$#" -ne 1 ]; then
  usage
  exit 1
fi

clean() {
  rm -fr client/definitions \
        client/site \
        client/themes \
        client/.custom.semantic.json \
        client/semantic.less \
        client/theme.config.import.less \
        client/theme.import.less
}

start() {
  meteor
}

ACTION=$1
case "$ACTION" in
  clean)
    clean
    ;;
  start)
    start
    ;;
  *)
    usage
    ;;
esac
