#!/bin/bash

# Clean Expo and cache directories
rm -rf .expo
rm -rf node_modules/.cache
rm -rf android/.gradle
rm -rf android/build
rm -rf $HOME/.expo

# Install dependencies
npm install

# Start Expo with clear cache
npx expo start --clear