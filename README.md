# Appium Integration Test (iOS App)

### Flutter app reference
1. https://docs.flutter.dev/get-started/install/macos#ios-setup

### Building Appium test script
1. Open iPhone simulator (mac OS only)
`open -a simulator`
2. Initiate Appium project in Flutter project directory
    1. Create "appium" directory: `mkdir appium`
    2. Follow Appium getting started guide to initiate Appium project: https://appium.io/docs/en/about-appium/getting-started/?lang=en
    3. Change to Appium's "capabilities" configurations to iOS "capabilities": https://appium.io/docs/en/writing-running-appium/caps/index.html#appium-desired-capabilities
3. Build Flutter app for iOS simulator
`flutter build ios --debug --simulator`
4. Update "app" in Appium's iOS capabilities, use the `/path/to/.../Runner.app` from the result of `flutter build` above
5. Reference for building Appium test script
    1. Finding elements in Appium test: https://appium.io/docs/en/commands/element/find-element/
    2. Tool to help you find elements in your app: https://github.com/appium/appium-inspector
    3. For iOS, Appium will only detects launch screen, before the app loads. Use implicit timeout when searching for an element: https://appium.io/docs/en/commands/session/timeouts/implicit-wait/
6. Once Appium test script is ready, run the test from the "appium" directory
`node appium/ios.js`

### Build .ipa file (For BrowserStack upload)
1. From Flutter project root directory
`flutter build ios --release --no-codesign`
2. `mkdir Payload`
3. `cp -r build/ios/iphoneos/Runner.app Payload/`
4. `zip -r MyApp.ipa Payload/`
5. References:
    1. https://stackoverflow.com/questions/51254470/how-to-create-ipa-file-for-testing-using-runner-app
    2. https://stackoverflow.com/questions/70675698/generating-an-ipa-file-for-a-flutter-project-without-a-paid-dev-account

### Running Appium test on BrowserStack
1. https://www.browserstack.com/docs/app-automate/appium/getting-started/nodejs/webdriverio#iOS

### Writing GitHub Action Script to automate integration test
1. GitHub action script format: https://docs.github.com/en/actions/quickstart
2. Flutter GitHub action: https://github.com/marketplace/actions/flutter-action
3. Build ipa: Refer to Build ipa steps above
4. Upload ipa: Refer to Running Appium test steps above
5. Set output for GitHub Action job: https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions#example-defining-outputs-for-a-job
6. GitHub Actions job's environment variables: https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions#jobsjob_idenv
7. Refer to `create-and-upload-ipa` and `run-integration-test-for-ios` jobs in [github-actions.yml file](.github/workflows/github-actions.yml)


# Appium Integration Test (Android App)

### Update Appium test script for Android app
1. Manage Android simulator: https://developer.android.com/studio/run/managing-avds
2. Build Flutter app for Android
`flutter build apk --debug`
3. Set `JAVA_HOME` and `ANDROID_HOME` before starting appium server to test locally: https://discuss.appium.io/t/throwing-error-android-home-is-not-set/21405
4. Appium Android capabilities reference: https://appium.io/docs/en/writing-running-appium/caps/#appium-desired-capabilities
5. Build Android apk for BrowserStack upload
`flutter build apk --release`
6. BrowserStack Android capabilities reference: https://www.browserstack.com/docs/app-automate/appium/getting-started/nodejs/webdriverio#Android
