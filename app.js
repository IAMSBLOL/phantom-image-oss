/* eslint-disable no-useless-escape */

const express = require('express')
const path = require('path')
const app = express();

const shot = require('./router/screenshot')

// 静态文件目录
const staticDir = path.join(__dirname, 'public');
const nodeModules = path.join(__dirname, 'node_modules');
app.use('/public', express.static(staticDir));
app.use('/node_modules', express.static(nodeModules));
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

app.route('/phantom').get(shot).post(shot)

if (!module.parent) {
    app.listen(3003, function () {
        console.log('123')
    });
}

module.exports = app;
