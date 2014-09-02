#!/bin/bash

if [[ "$TRAVIS_TAG" ]]; then
    rm -rf build
    npm run dist
    cd build
    # ziped in build/
    zip -q github-reader-osx.zip -r github-reader/osx
    zip -q github-reader-win.zip -r github-reader/win
    zip -q github-reader-linux32.zip -r github-reader/linux32
    zip -q github-reader-linux64.zip -r github-reader/linux64
    cd ../
    echo "ziped!"
else
    echo "Not Release"
fi