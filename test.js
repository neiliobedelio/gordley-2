const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage();
    page.on('console', msg => console.log('LOG:', msg.text()));
    page.on('pageerror', error => console.log('ERROR:', error.message));
    page.on('response', response => {
        if (!response.ok()) {
            console.log('HTTP ERROR:', response.status(), response.url());
        }
    });

    await page.goto('file:///Users/neil/gordley-2/index-glitch.html');
    await new Promise(r => setTimeout(r, 3000));
    await browser.close();
})();
