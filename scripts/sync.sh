#!/bin/bash

function web {
  rm -rf ../colorplay-web/resources/dist
  cp -r ./dist ../colorplay-web/resources
}

function mobile {
  rm -rf ../colorplay-mobile/dist
  cp -r ./dist ../colorplay-mobile
  cd ../colorplay-mobile
  echo "Which platform do you want to open?"
  echo "1. Android"
  echo "2. iOS"
  echo "4. All"
  read -p "Enter your choice: " target
  case $target in
    1)
      npx cap sync
      npx cap open android
      ;;
    2)
      npx cap sync
      npx cap open ios
      ;;
    3)
      npx cap sync
      npx cap open android
      npx cap open ios
      ;;
    *)
      exit;
      ;;
  esac
}

function desktop {
  rm -rf ../colorplay-desktop/electron/dist
  cp -r ./dist ../colorplay-desktop/electron
  cd ../colorplay-desktop
  npm run start
}

npm run build
echo "Which platform you want to sync?"
echo "1. Web"
echo "2. Mobile"
echo "3. Desktop"
echo "4. All"
read -p "Enter your choice: " platform
case $platform in
  1)
    web
    ;;
  2)
    mobile
    ;;
  3)
    desktop
    ;;
  4)
    web
    mobile
    desktop
    ;;
  *)
    exit;
    ;;
esac
