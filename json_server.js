const puppeteer = require('puppeteer');

async function runPuppeteerScript() {
  try {
    const browser = await puppeteer.launch({
      headless: false,
    });
    const page = await browser.newPage();

    // Function to handle redirect event
    await page.exposeFunction('redirectEvent', async (info) => {
      if (info.targetId === 'startRecording') {
        console.log(JSON.stringify(info)); // Log the message in Puppeteer context
        await page.evaluate((message) => {
          // Call the function on the front-end to display the message
          handlePuppeteerMessage(message);
        }, JSON.stringify(info));
      }
    });
    await page.evaluateOnNewDocument(() => {
      document.addEventListener('click', e => redirectEvent({
        targetId: e.target.id,
        eventType: 'click'
      }), true /* capture */);
    });

    // Load the local HTML file directly using Puppeteer
    await page.goto('file:///Users/balamurug.palanisamy/Git_sneha/new_reco/index.html');

    // Close the browser when the script is done
  

  } catch (err) {
    console.error('Error executing Puppeteer script:', err);
  }
}

// Expose the runPuppeteerScript function to be called from the front-end
global.startPuppeteerScript = runPuppeteerScript;

// Call the Puppeteer script function
runPuppeteerScript();
