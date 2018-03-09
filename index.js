const puppeteer = require('puppeteer');
const fs = require('fs');

const devices = [
  { name: 'Highest', width: 1920, height: 1080 },
  { name: 'Laptop-1', width: 1366, height: 768 },
  { name: 'Laptop-2', width: 1360, height: 768 },
  { name: 'Small-Desktop-1', width: 1280, height: 800 },
  { name: 'Small-Desktop--2', width: 1024, height: 768 },
  { name: 'Ipad-Tab', width: 768, height: 1024 },
  { name: 'Android', width: 360, height: 640 },
  { name: 'Iphone', width: 375, height: 667 },
];

const urls = [
  { name: 'Google', link: 'https://www.google.com' },
];

async function getBrowser() {
  return await puppeteer.launch();
}

async function getPage(browser, url) {
  const page = await browser.newPage();
  await page.waitFor(500);
  await page.goto(url.link);

  return page;
}

async function setViewports(page, { width, height}) {
  await page.setViewport({
    width: width,
    height: height,
  });
}

async function saveScreenshot(page, device, url) {
  const { name, width, height } = device;
  const newLocation = `screenshots/${name}(${width}-${height})`;
  fs.mkdir(newLocation, (err) => {});

  await page.screenshot({
    path: `${newLocation}/${url.name}.png`,
    fullPage: true
  });
}

async function getUrlAndResolutions(devices, urls) {
  fs.mkdir('screenshots', (err) => {});
  for (let url of urls) {
    const browser = await getBrowser();
    const page = await getPage(browser, url);
    for (let device of devices) {
      await setViewports(page, device);
      await saveScreenshot(page, device, url)
    }
    browser.close();
  }
}

getUrlAndResolutions(devices, urls);
