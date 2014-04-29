#!/bin/sh

parentDir=$(cd $(dirname $(cd $(dirname $0);pwd));pwd)
zip -r github-reader.nw ${parentDir}/*