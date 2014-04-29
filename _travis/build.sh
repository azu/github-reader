#!/bin/sh

parentDir=$(cd $(dirname $(cd $(dirname $0);pwd));pwd)
zip -r ${parentDir}/github-reader.nw ${parentDir}/*