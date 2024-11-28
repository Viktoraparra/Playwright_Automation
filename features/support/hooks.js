const playwright = require("playwright");
const { Before, After, BeforeAll, AfterAll, BeforeStep, AfterStep,} = require("@cucumber/cucumber");
const { POManager } = require("../../pageObjects/POManager");
const { Status } = require("@cucumber/cucumber");

// To launch the browser before all the scenarios
BeforeAll(async function () {
  console.log("Launch Browser");
  // Giving browser- Chromium and headed mode
  try {
    this.browser = await playwright["chromium"].launch({ headless: true });
  } catch (error) {
    throw `Error: ${error}`;
  }
});

// Before every scenario, Create new context and page
Before(async function () {
  console.log("Create new context and page");
  try {
    this.context = await this.browser.newContext();
    this.page = await this.context.newPage();
    this.poManager = new POManager(this.page);
  } catch (error) {
    throw `Error: ${error}`;
  }
});

BeforeStep(async function () {
  try {
  } catch (error) {
    throw `Error: ${error}`;
  }
});

AfterStep(async function (status) {
  try {
    if (resourceLimits.status === Status.FAILED) {
      const timestamp = new Date()
        .toISOString()
        .replace(/[-:T.]/g, "")
        .slice(0, 15); // Formato: YYYYMMDDHHMMSS
      const screenshotPath = `./screenshots/sh-${timestamp}.png`;

      await this.page.screenshot({ path: screenshotPath });
      console.log(`Screenshot saved at: ${screenshotPath}`);
    }
  } catch (error) {
    throw `Error: ${error}`;
  }
});

// After every scenario, Close context and page
After(async function () {
  console.log("Close context and page");
  try {
    await this.page.close();
    await this.context.close();
  } catch (error) {
    throw `Error: ${error}`;
  }
});

// To close the browser after all the scenarios
AfterAll(async function () {
  console.log("Close Browser");
  try {
    // await this.browser.close();
  } catch (error) {
    throw `Error: ${error}`;
  }
});
