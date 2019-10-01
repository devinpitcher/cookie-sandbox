const http = require('http');
const fs = require('fs');
const argv = require('minimist')(process.argv.slice(2));
const puppeteer = require('puppeteer');
const port = argv.p || 1337;
const networkDelay = argv.d || 5000;

const server = http.createServer((req, res) => {
    res.end(fs.readFileSync(argv.file, 'utf8'));
});

server.listen(port, (err) => {
    if (err) {
        return console.error('something bad happened', err);
    }
    console.log(`Basic HTTP server has started on port ${port}`);
});

(async () => {
    const browser = await puppeteer.launch({ headless: true });
    const context = await browser.createIncognitoBrowserContext();
    const page = await context.newPage();
    page.on('request', request => {
        console.log(`${request.method()} ${request.url()}`);
    });
    await page.goto(`http://localhost:${port}`, { waitUntil: 'networkidle0' });
    console.log('Page is loaded and network trafic has stopped.');
    console.log('Starting network delay...');
    await new Promise(resolve => setTimeout(resolve, networkDelay));
    console.log('Delay complete.');
    var cookies = await page.cookies();
    // Shut down Chrome
    await browser.close();
    // Shut down the HTTP server
    await server.close();
    console.log(cookies);
    process.exit();
})();
