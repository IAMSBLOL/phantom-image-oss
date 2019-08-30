const express = require('express')
const path = require('path')

const app = express();

// 静态文件目录
const staticDir = path.join(__dirname, 'public');

// CORS
app.use((req, res, next) => {
    if (req.path !== '/' && !req.path.includes('.')) {
        res.header({
            'Access-Control-Allow-Credentials': true,
            'Access-Control-Allow-Origin': req.headers.origin || '*',
            'Access-Control-Allow-Headers': 'X-Requested-With',
            'Access-Control-Allow-Methods': 'PUT,POST,GET,DELETE,OPTIONS',
            'Content-Type': 'application/json; charset=utf-8'
        })
    }
    next()
})
app.use('/public', express.static(staticDir));

const phantom = require('phantom');

(async function () {
    const instance = await phantom.create();
    const page = await instance.createPage();
    await page.on('onResourceRequested', function (requestData) {
        console.info('Requesting', requestData.url);
    });

    const status = await page.open('https://baidu.com/');
    const content = await page.property('content');
    console.log(content);

    await instance.exit();
})();

if (!module.parent) {
    app.listen(3003, function () {
        console.log('123')
    });
}

module.exports = app;
