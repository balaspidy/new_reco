// puppeteerScript.js
const puppeteer = require('puppeteer');

async function runPuppeteerScript(page) {
  try {

    const actions = [];

    // Function to handle redirect event
    await page.exposeFunction('redirectEvent', async (info) => {
      if (info.targetId == 'submit') {
        console.log(info.targetValue);
        await page.goto(info.targetValue);
      }
    });
    await page.evaluateOnNewDocument(() => {
      document.addEventListener('click', e => redirectEvent({
        targetId: e.target.getAttribute("id"),
        targetValue: document.getElementById("url").value
      }), true /* capture */);
    });

    await page.exposeFunction('reportEvent', info => {
      console.log(JSON.stringify(info));
      actions.push(info);
      
    });
    await page.evaluateOnNewDocument(() => {
      document.addEventListener('click', e => reportEvent({ targetName: e.target.baseURI, eventType: 'click' }), true /* capture */);
    });

    await page.exposeFunction('reportEvent1', info => {
      console.log(info);
      actions.push(info);
    });
    await page.evaluateOnNewDocument(() => {
      document.addEventListener('input', f => reportEvent1({ targetName: f.target.value, eventType: 'input' }), true /* capture */);
    });

    await page.exposeFunction('scrollEvent', info => {
      console.log(info);
      actions.push(info);
    });
    await page.evaluateOnNewDocument(() => {
      window.addEventListener('scroll', () => {
        scrollEvent({
          eventType: 'scroll',
          scrollX: window.scrollX,
          scrollY: window.scrollY,
        });
      });
    });

    await page.goto('file:///Users/balamurug.palanisamy/Git_sneha/new_reco/recording.html');

  } catch (err) {
    console.error('Error executing Puppeteer script:', err);
  }
}
module.exports = runPuppeteerScript;





