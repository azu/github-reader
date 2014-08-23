#!/bin/bash
CURRENT=$(cd $(dirname $0) && pwd)

if [[ "$TRAVIS_TAG" ]]; then
    echo "Release: $TRAVIS_TAG";
    zip -q -r ${PWD##*/}.nw *
    sh ${CURRENT}/deploy-gh-pages.sh
else
    echo "Not Release"
fi