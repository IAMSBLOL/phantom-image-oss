/* eslint-disable no-useless-escape */

const express = require('express')
const path = require('path')
const app = express();

var bodyParser = require('body-parser');

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: false })); // for parsing application/x-www-form-urlencoded

const shot = require('./router/screenshot')

require('events').EventEmitter.defaultMaxListeners = 0

// 静态文件目录
const staticDir = path.join(__dirname, 'public');
const nodeModules = path.join(__dirname, 'node_modules');
app.use('/public', express.static(staticDir));
app.use('/node_modules', express.static(nodeModules));
// CORS
app.use((req, res, next) => {
    // console.log(req)
    if (req.path !== '/' && !req.path.includes('.')) {
        res.header({
            'Access-Control-Allow-Credentials': true,
            'Access-Control-Allow-Origin': req.headers.origin || '*',
            'Access-Control-Allow-Headers': 'Origin,X-Requested-With,content-Type,Accept,Authorization',
            'Access-Control-Allow-Methods': 'PUT,POST,GET,DELETE,OPTIONS',
            'Content-Type': 'application/json; charset=utf-8'
        })
    }

    next()
})

app.route('/').options((req, res, next) => {
    res.send('')
    next()
})

app.route('/phantom').get(shot).post(shot)

if (!module.parent) {
    app.listen(3003, function () {
        console.log('123')
    });
}

module.exports = app;
