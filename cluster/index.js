
const { Cluster } = require('puppeteer-cluster');

const createWorker = require('../worker_threads')

const config = require('../config');

module.exports = async function () {
    let cluster = null;
    cluster = await Cluster.launch({
        concurrency: Cluster.CONCURRENCY_CONTEXT,
        maxConcurrency: 2,
    });

    await cluster.task(async ({ _page, data: { page, c, i, id } }) => {
        // console.time(i)
        await page.evaluate(text => {
            document.body.innerHTML = `${text}`;
            // MathJax.Hub.Config({ tex2jax: { inlineMath: [['$', '$'], ['\\(', '\\)']] } });
            MathJax.Hub.Queue(['Typeset', MathJax.Hub]);
        }, c)

        const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
        await delay(1000);
        await page.screenshot({ path: './image/' + i + '.png', fullPage: true });
        // console.timeEnd(i)

        createWorker(
            config.root + '/worker_threads/upload_thread.js',
            (err, result) => {
                if (err) return console.error(err);
                console.log('多线程处理完毕嘿嘿嘿')
                // process.exit(result.threadId)
            },
            { id, filename: i }
        );
    });

    // console.log(cluster.queue, '??')
    // = cluster
    return cluster
}
