const { workerData, threadId, parentPort } = require('worker_threads');

// const fs = require('fs')

const config = require('../config')

var OSS = require('ali-oss');
// console.log(threadId);

var client = new OSS({

    region: 'oss-cn-shenzhen',

    accessKeyId: 'LTAI4FizxVoDmF7NPhTgRsks',

    accessKeySecret: 'wTbmblihF3w669PpKD07APSsUezf4n',

    bucket: 'csw-oss-sz'

});

var aliOss = {

    bucket: 'csw-oss-sz',

    endPoint: 'oss-cn-shenzhen.aliyuncs.com',

};

(async function () {
    const { filename: key } = workerData;
    client.useBucket(aliOss.bucket);
    let result = await client.put(key + '.png', config.root + '/image/' + key + '.png');
    var imageSrc = 'http://csw-oss-sz.oss-cn-shenzhen.aliyuncs.com/' + result.name;
    console.log(imageSrc)

    parentPort.postMessage({ imageSrc, threadId })

    // fs.unlink(config.root + '/image/' + key + '.png', (err) => {
    //     if (err) throw err;
    //     // console.log('文件已删除');
    // });
})()
