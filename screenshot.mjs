import puppeteer from 'puppeteer';
import fs from 'fs';

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

export default async function getUrlAndResolutions(devices, urls) {
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
