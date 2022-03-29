const wdio = require("webdriverio");
const assert = require("assert");

const iosOpts = {
  path: '/wd/hub',
  port: 4723,
  capabilities: {
    automationName: "XCUITest",
    platformName: "iOS",
    platformVersion: "15.4",
    deviceName: "iPhone 12 Pro",
    app: __dirname + "/../build/ios/iphonesimulator/Runner.app"
  }
};

const iosOptsBS = {
  user: process.env.BROWSERSTACK_USERNAME,
  key: process.env.BROWSERSTACK_ACCESS_KEY,
  capabilities: {
    project: "Testing Appium iOS Project",
    build: 'Appium Demo iOS',
    name: "iOS Test",
    device: 'iPhone 11 Pro',
    os_version: "13",
    app: process.env.BROWSERSTACK_APP_ID,
    'browserstack.debug': true
  }
};

async function main () {
  const client = await wdio.remote(process.env.RUN_ON_BROWSERSTACK ? iosOptsBS : iosOpts);
  client.setImplicitTimeout(5000);

  const increment = await client.$('~Increment');
  await increment.click();

  const counter = await client.$('~1');
  const count = await counter.getAttribute("value");
  assert.equal(count, 1);

  await new Promise(r => setTimeout(r, 5000));

  await client.deleteSession();
}

main();
  