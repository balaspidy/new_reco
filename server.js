const puppeteer = require('puppeteer');

async function runPuppeteerScript(page) {
  try {
    const browser = page.browser();

    const recordingPage = await page.browser().newPage();
    await recordingPage.goto('file:///E:/xper_puppeteer_1/recording.html');

    await recordingPage.exposeFunction('redirectEvent', async (info) => {
        if (info.targetId == 'submit') {
          console.log(info.targetValue);
          await recordingPage.goto(info.targetValue);
        }
      });
      await recordingPage.evaluateOnNewDocument(() => {
        document.addEventListener('click', e => redirectEvent({
          targetId: e.target.getAttribute("id"),
          targetValue: document.getElementById("url").value
        }), true /* capture */);
      });
  
     
    // Navigate to the recording.html URL in a new tab
    
  } catch (err) {
    console.error('Error executing Puppeteer script:', err);
  }
}

// Export the runPuppeteerScript function
module.exports = runPuppeteerScript;
