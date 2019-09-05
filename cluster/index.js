
const { Cluster } = require('puppeteer-cluster');

module.exports = async function () {
    let cluster = null;
    cluster = await Cluster.launch({
        concurrency: Cluster.CONCURRENCY_CONTEXT,
        maxConcurrency: 2,
    });

    await cluster.task(async ({ _page, data: { page, c, i } }) => {
        console.time(i)
        await page.evaluate(text => {
            document.body.innerHTML = `${text}`;
            // MathJax.Hub.Config({ tex2jax: { inlineMath: [['$', '$'], ['\\(', '\\)']] } });
            MathJax.Hub.Queue(['Typeset', MathJax.Hub]);
        }, c)

        const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
        await delay(1000);
        await page.screenshot({ path: './image/example' + i + '.png', fullPage: true });
        console.timeEnd(i)
    });

    console.log(cluster.queue, '??')
    // = cluster
    return cluster
}
