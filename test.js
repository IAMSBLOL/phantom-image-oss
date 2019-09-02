const phantom = require('phantom');

(async function () {
    const instance = await phantom.create();
    const page = await instance.createPage();
    // await page.on('onResourceRequested', function (requestData) {
    //     console.info('Requesting', requestData.url);
    // });

    const status = await page.open('http://127.0.0.1:3003/public/test.html');
    const content = await page.property('content');
    console.log(content);
    setTimeout(async function () {
        await page.render('math.png');
        await instance.exit();
    }, 5000)
})();
