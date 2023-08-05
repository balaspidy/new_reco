
const runPuppeteerScript = require('./server.js');
const puppeteer = require('puppeteer');
//const {open, click, type, submit} = require('@puppeteer/recorder');
(async () => {
    // 1. Launch browser in headful mode so that we can click around and see how
    // script works.
    const browser = await puppeteer.launch({
      headless: false,
    });
    const page = await browser.newPage();
  
    const actions = [];

    await page.exposeFunction('stopRecordingEvent', async (info) => {
      if (info.targetId == 'stopRecordingBtn') {
        console.log(info);
        await stopRecording(page);
      } 
    });
    
    // Add a click event listener to the "Stop Recording" button
    await page.evaluateOnNewDocument(() => {
      document.addEventListener('click', e => stopRecordingEvent({
        targetId: e.target.value
      }), true /* capture */);
    });
  
    // Function to handle redirect event
    await page.exposeFunction('redirectEvent3', async(info) => {
      if (info.targetId == 'Start Recording') {
          console.log(info);
          await runPuppeteerScript(page);
      }
    });
    await page.evaluateOnNewDocument(() => {
      document.addEventListener('click', e => redirectEvent3({
          targetId: e.target.value
      }), true /* capture */);
    });
  
    await page.goto('file:///E:/xper_puppeteer_1/index2.html');
    
  })();
  
