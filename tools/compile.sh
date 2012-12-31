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

  echo "Building main.js..."
  java -jar tools/plovr-eba786b34df9.jar build plovr.json > "$PUBLIC/main.js"
  log_build_results "$PUBLIC/main.js"

  echo "Building bootstrap.min.js..."
  cd "$THIRD_PARTY/bootstrap-release"
  cp js/bootstrap.min.js $PUBLIC
  log_build_results "$PUBLIC/bootstrap.min.js"

  echo "Building jquery.min.js..."
  cd "$THIRD_PARTY/jquery"
  git checkout -b 1.8-stable
  grunt
  cp dist/jquery.min.js $PUBLIC
  log_build_results "$PUBLIC/jquery.min.js"

  echo "Building path.min.js..."
  cp "$THIRD_PARTY/pathjs/path.min.js" $PUBLIC
  log_build_results "$PUBLIC/path.min.js"

  echo ""
}


function build_less {
  echo "Compiling less to css..."
  files=`find less -name "*.less"`
  files="$files $THIRD_PARTY/bootstrap/less/bootstrap.less"
  files="$files $THIRD_PARTY/bootstrap/less/responsive.less"
  cat $files > $LESS_SRC
  lessc --strict-imports --verbose --include-path=$LESS_INCLUDE $LESS_SRC $LESS_DST -O2 --yui-compress
  log_build_results $LESS_DST
  echo ""
}


function setup {
  echo "Initialize build environment..."
  mkdir -p $PUBLIC
  mkdir -p $BUILD
  echo ""
}


function cleanup {
  echo "Discard build artifacts..."
  rm -rf $BUILD
  echo ""
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
