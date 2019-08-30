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
app.use('/phantom', function (req, res) {
    const phantom = require('phantom');

    (async function () {
        const instance = await phantom.create();
        const page = await instance.createPage();
        await page.property('viewportSize');
        await page.on('onResourceRequested', function (requestData) {
            console.info('Requesting', requestData.url);
        });

        await page.open('https://www.baidu.com');
        // const content = await page.property('content');

        // console.log(`Page opened with status [${status}].`);
        // console.log(content);
        // await page.evaluateJavaScript(`function() {
        //     document.body.innerHTML = '<div>1231231312316sfdg sfgsf1313<div>'
        //     return div
        //  }`)
        await page.render('stackoverflow.png');

        await instance.exit();

        res.end('成功咯')
    })();
})

if (!module.parent) {
    app.listen(3003, function () {
        console.log('123')
    });
}

module.exports = app;
