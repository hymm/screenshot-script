# screenshot-script

A node.js script to take screenshots of urls using puppeteer.

index.mjs example:
```js
import getUrlAndResolutions from './screenshot';

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

getUrlAndResolutions(devices, urls);
```
