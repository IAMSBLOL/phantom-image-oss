
// const path = request('path')
const { Worker } = require('worker_threads');

function startWorker (path, cb, workerData) {
    // console.log(workerData, 1313)
    // console.log(path)
    let w = new Worker(path, { workerData });
    w.on('message', (msg) => {
        cb(null, msg)
        // console.log(11, w.threadId)
    })
    w.on('error', cb);
    w.on('exit', (code) => {
        if (code !== 0) { console.error(new Error(`Worker stopped with exit code ${code}`)) }
        // console.log('w.threadId is goudai')
    });

    return w;
}

module.exports = startWorker

// console.log('this is the main thread')

// let myWorker = startWorker(path.join(__dirname, 'upload_thread.js'), (err, result) => {
//     if (err) return console.error(err);
//     console.log('[[Heavy computation function finished]]')
//     console.log('First value is: ', result.val);
//     console.log('Took: ', (result.timeDiff / 1000), ' seconds');
// })

// const start = Date.now();
// request.get('http://www.google.com', (err, resp) => {
//     if (err) {
//         return console.error(err);
//     }
//     console.log('Total bytes received: ', resp.body.length);
//     myWorker.postMessage({ finished: true, timeDiff: Date.now() - start }) // you could send messages to your workers like this
// })
