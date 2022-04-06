# Appium Integration Test (iOS App)

### Flutter - demo app reference
1. Create demo Flutter app following Flutter's getting started guide, go through at lease the `Install` and `Test drive` steps: https://docs.flutter.dev/get-started/install/macos#ios-setup

### Building Appium test script
1. Open iPhone simulator (mac OS only)
`open -a simulator`
2. Initiate Appium project in Flutter project directory
    1. Create "appium" directory: `mkdir appium`
    2. Follow Appium getting started guide to initiate Appium project: https://appium.io/docs/en/about-appium/getting-started/?lang=en
    3. Update Appium's "capabilities" configurations to use iOS "capabilities": https://appium.io/docs/en/writing-running-appium/caps/index.html#appium-desired-capabilities
3. Build Flutter app for iOS simulator
`flutter build ios --debug --simulator`
4. Update "app" configuration in Appium's iOS capabilities, use the `/path/to/.../Runner.app` from the result of `flutter build` from the previous step (step 3)
5. Reference for building Appium test script
    1. Finding application's elements in Appium test, using selectors: https://appium.io/docs/en/commands/element/find-element/
    2. Tool to help with getting the correct selectors of elements in your app: https://github.com/appium/appium-inspector
    3. For iOS, Appium will only detect launch screen at first (before the app loads), use implicit timeout so that the real mobile app can be loaded: https://appium.io/docs/en/commands/session/timeouts/implicit-wait/
6. Once Appium test script is ready, run the test from the "appium" directory
`node appium/ios.js`

### Build .ipa file (For BrowserStack upload)
1. From Flutter project root directory: `flutter build ios --release --no-codesign`
2. Create a `Payload` folder: `mkdir Payload`
3. Copy app binary (generated on step 1) into the `Payload` folder: `cp -r build/ios/iphoneos/Runner.app Payload/`
4. Compress `Payload` folder into a .ipa file: `zip -r MyApp.ipa Payload/`
5. References:
    1. https://stackoverflow.com/questions/51254470/how-to-create-ipa-file-for-testing-using-runner-app
    2. https://stackoverflow.com/questions/70675698/generating-an-ipa-file-for-a-flutter-project-without-a-paid-dev-account

### Running Appium test on BrowserStack
1. https://www.browserstack.com/docs/app-automate/appium/getting-started/nodejs/webdriverio#iOS

### Writing GitHub Action Script to automate iOS integration test
1. The propose of this script is to automate building .ipa file, and running Appium test on BrowserStack steps above.
2. GitHub action script format reference: https://docs.github.com/en/actions/quickstart
3. To use Flutter in GitHub action: https://github.com/marketplace/actions/flutter-action
3. Build ipa: Refer to Build ipa steps above
4. Upload ipa: Refer to Running Appium test steps above
5. Reference for setting output on GitHub Action job: https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions#example-defining-outputs-for-a-job
6. Reference for using GitHub Actions job's environment variables: https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions#jobsjob_idenv
7. For complete iOS app CI workflow, refer to `create-and-upload-ipa` and `run-integration-test-for-ios` jobs in the project's [github-actions.yml file](.github/workflows/github-actions.yml)


# Appium Integration Test (Android App)

### Updating Appium test script for Android app
1. Manage Android simulator: https://developer.android.com/studio/run/managing-avds
2. Build Flutter app for Android
`flutter build apk --debug`
3. Set `JAVA_HOME` and `ANDROID_HOME` before starting appium server to test locally: https://discuss.appium.io/t/throwing-error-android-home-is-not-set/21405
4. Appium Android capabilities reference: https://appium.io/docs/en/writing-running-appium/caps/#appium-desired-capabilities
5. Build Android apk for BrowserStack upload
`flutter build apk --release`
6. BrowserStack Android capabilities reference: https://www.browserstack.com/docs/app-automate/appium/getting-started/nodejs/webdriverio#Android

### Updating GitHub Action Script to automate Android integration test
1. For complete Android app CI workflow, refer to `create-and-upload-apk` and `run-integration-test-for-android` jobs in the project's [github-actions.yml file](.github/workflows/github-actions.yml)