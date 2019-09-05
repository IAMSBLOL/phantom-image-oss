const genericPool = require('generic-pool');
const puppeteer = require('puppeteer');

// import initDebug from 'debug'
// const debug = initDebug('phantom-pool')

const initPhantomPool = ({
    max = 10,
    min = 4,
    idleTimeoutMillis = 30000,
    maxUses = 5000,
    testOnBorrow = true,
    puppeteerArgs = {},
    validator = () => Promise.resolve(true),
    ...otherConfig
} = {}) => {
    // TODO: randomly destroy old instances to avoid resource leak?
    const browser = puppeteer.launch({ ...puppeteerArgs })
    const factory = {

        create: () => browser
            .then(async (instance) => {
                // instance['useCount'] = 0;
                const page = await instance.newPage()
                await page.goto('http://127.0.0.1:3003/public/test.html', { waitUntil: 'networkidle0' });
                page['useCount'] = 0;
                return page
                // return instance;
            }),
        destroy: (instance) => instance.browser().close(),
        validate: (instance) => validator(instance).then(valid => Promise.resolve(valid && (maxUses <= 0 || instance.useCount < maxUses))),
    }
    const config = {
        max,
        min,
        idleTimeoutMillis,
        testOnBorrow,
        ...otherConfig,
    }
    const pool = genericPool.createPool(factory, config)
    const genericAcquire = pool.acquire.bind(pool)
    pool.acquire = () => genericAcquire().then(r => {
        r.useCount += 1
        return r
    })
    pool.use = (fn) => {
        let resource
        return pool.acquire()
            .then(r => {
                resource = r
                return resource
            })
            .then(fn)
            .then((result) => {
                pool.release(resource)
                return result
            }, (err) => {
                pool.release(resource)
                throw err
            })
    }

    return pool
}

initPhantomPool.default = initPhantomPool

module.exports = initPhantomPool
