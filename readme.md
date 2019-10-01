# Cookie Sandbox

This is a _very_ basic Node app that creates an HTTP server to host a static HTML document that is loaded by headless Chrome (via Puppeteer) in an incognito window and returns all cookies that were set in the browser.

## But why?

GDPR. Since most third-party servives do not seem to provide a solid list of cookies that they may set on your website when their Javascript is loaded, I had to manually try to find what cookies they set. Instead, I created this basic app that I can add any JS I want to a basic HTML page, run this script, and get an output of all the cookie names.

## Can I use this?

Sure. It's not very great, I put it together very quickly so I could give a list of cookies to our legal department to be added to our cookie policy, so it could probably be better. Maybe I'll update it to be more useful. `¯\_(ツ)_/¯`

## How to use it

`node ./index -p PORT -d 5000 --file=./test.html`

`-p` Port to use. Defaults to `1337`

`-d` Delay in ms after network activity has stopped to wait

`--file` Relative path to the HTML file you'd like to load
