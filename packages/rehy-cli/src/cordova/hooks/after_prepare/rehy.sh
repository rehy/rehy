#!/usr/bin/env bash

mkdir -p platforms/android/res/drawable-xxhdpi platforms/android/res/drawable-xxxhdpi platforms/android/res/drawable

ANDROID_RES_DIR=$INIT_CWD/cordova/android/res/
test -d $ANDROID_RES_DIR && cpy '**/*.*' $PWD/platforms/android/res/ --cwd=$ANDROID_RES_DIR --parents

cordova-icon
cordova-splash
