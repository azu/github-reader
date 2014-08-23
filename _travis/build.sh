#!/bin/sh
CURRENT=$(cd $(dirname $0) && pwd)

if [[ "$TRAVIS_TAG" ]]; then
    echo "Release: $TRAVIS_TAG";
    nwbuild -p "win,osx,linux32,linux64" ./ -o build/
    sh ${CURRENT}/deploy-gh-pages.sh
else
    echo "Not Release"
fi