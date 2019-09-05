const puppeteerPool = require('../../puppeteer_pool')

const pool = puppeteerPool({
    max: 16, // 最大资源
    min: 8, // 空闲保留
    idleTimeoutMillis: 360000, // default.
    // maximum number of times an individual resource can be reused before being destroyed; set to 0 to disable
    maxUses: 0, // default
    // see https://github.com/coopernurse/node-pool#createpool
    validator: () => Promise.resolve(true),
    // validate resource before borrowing; required for `maxUses and `validator`
    testOnBorrow: true, // default
    // For all opts, see opts at https://github.com/coopernurse/node-pool#createpool
    puppeteerArgs: {
        defaultViewport: {
            width: 750,
            height: 1
        }
    }, // 提升性能
})

module.exports = pool
