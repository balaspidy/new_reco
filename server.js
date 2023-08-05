const puppeteer = require('puppeteer');

async function runPuppeteerScript(page) {
  try {
    const browser = await puppeteer.launch({ headless: false });
    const [page] = await browser.pages();

    // Attach event listener to the "Redirect" button
    page.exposeFunction('redirect', async (url) => {
      const newTarget = await browser.waitForTarget(target => target.url() === 'about:blank');

      const newPage = await browser.newPage();
      await newPage.goto(url);
    });

    // Load the local HTML file directly using Puppeteer
    await page.goto('file:///E:/xper_puppeteer_1/recording.html');

  } catch (err) {
    console.error('Error executing Puppeteer script:', err);
  }
}

// Export the runPuppeteerScript function
module.exports = runPuppeteerScript;
