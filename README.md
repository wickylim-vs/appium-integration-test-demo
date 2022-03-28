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
    1. Tool for finding elements in your app: https://github.com/appium/appium-inspector
    2. Printing app's elements in appium test: https://appium.io/docs/en/commands/session/source/
    3. For iOS, Appium will only detects launch screen, before the app loads. Use implicit timeout when searching for an element: https://appium.io/docs/en/commands/session/timeouts/implicit-wait/
6. Once Appium test script is ready, run the test from the "appium" directory
`cd appium && node index.js`

### Build .ipa file (For BrowserStack upload)
1. From Flutter project root directory
`flutter build ios --release`
2. `mkdir Payload`
3. `cp -r build/ios/iphoneos/Runner.app Payload/`
4. `zip -r Payload.ipa Payload/`
5. References:
    1. https://stackoverflow.com/questions/51254470/how-to-create-ipa-file-for-testing-using-runner-app
    2. https://stackoverflow.com/questions/70675698/generating-an-ipa-file-for-a-flutter-project-without-a-paid-dev-account

### Running Appium test on BrowserStack
1. https://www.browserstack.com/docs/app-automate/appium/getting-started/nodejs/webdriverio#iOS
