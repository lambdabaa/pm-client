#!/usr/bin/env bash

ROOTDIR=`pwd`
BUILD="$ROOTDIR/build"
PUBLIC="$ROOTDIR/../server/public"
THIRD_PARTY="$ROOTDIR/../third_party"

LESS_SRC="$BUILD/style.less"
LESS_DST="$PUBLIC/style.css"
LESS_INCLUDE="less:$THIRD_PARTY/bootstrap/less"


function build_js_deps {
  echo "Building javascript dependencies..."

  # cp "$THIRD_PARTY/bootstrap/js/bootstrap-popover.js" $PUBLIC
  # log_build_results "$PUBLIC/bootstrap-popover.js"

  cp "$THIRD_PARTY/pathjs/path.min.js" $PUBLIC
  log_build_results "$PUBLIC/path.min.js"
}


function build_less {
  echo "Compiling less to css..."
  files=`find less -name "*.less"`
  files="$files $THIRD_PARTY/bootstrap/less/bootstrap.less"
  files="$files $THIRD_PARTY/bootstrap/less/responsive.less"
  cat $files > $LESS_SRC
  echo $LESS_INCLUDE
  lessc --strict-imports --verbose --include-path=$LESS_INCLUDE $LESS_SRC $LESS_DST
  log_build_results $LESS_DST
}


function setup {
  echo "Initialize build environment..."
  mkdir -p $PUBLIC
  mkdir -p $BUILD
}


function cleanup {
  echo "Discard build artifacts..."
  rm -rf $BUILD
}


function log_build_results {
  results="`du -h $1` built by `whoami` `date`"
  echo $results
}


setup
build_less
build_js_deps
cleanup
echo "Done"
