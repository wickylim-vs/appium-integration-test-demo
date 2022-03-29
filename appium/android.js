const wdio = require("webdriverio");
const assert = require("assert");

const androidOpts = {
  path: '/wd/hub',
  port: 4723,
  capabilities: {
    automationName: "UiAutomator2",
    platformName: "Android",
    platformVersion: "11",
    deviceName: "Android Emulator",
    app: __dirname + "/../build/app/outputs/flutter-apk/app-debug.apk"
  }
};

const androidOptsBS = {
  user: process.env.BROWSERSTACK_USERNAME,
  key: process.env.BROWSERSTACK_ACCESS_KEY,
  capabilities: {
    project: "Testing Appium Android Project",
    build: 'Appium Demo Android',
    name: "Android Test",
    device: 'Google Pixel 4',
    os_version: "11",
    app: process.env.BROWSERSTACK_APP_ID,
    'browserstack.debug': true
  }
};

async function main () {
  const client = await wdio.remote(process.env.RUN_ON_BROWSERSTACK ? androidOptsBS : androidOpts);
  client.setImplicitTimeout(5000);

  const increment = await client.$('~Increment');
  await increment.click();

  const counter = await client.$('~1');
  const count = await counter.getAttribute("content-desc");
  assert.equal(count, 1);

  await new Promise(r => setTimeout(r, 3000));

  await client.deleteSession();
}

main();
  