const replaceSrc = function (data) {
    let _data = data
    let _captureLits = []
    // img的src
    _data.replace(/<img [^>]*src=['"]([^'"]+)[^>]*>/gi, function (match, capture) {
        // console.log(capture)
        if (/https|http/g.test(capture) === false) {
            _captureLits.push(capture)
        }
    });
    const __captureLits = [...new Set(_captureLits)]
    __captureLits.map((o, i) => {
        _data = _data.replace(new RegExp(o, 'g'), `https://cj-emb.oss-cn-shenzhen.aliyuncs.com/` + o)
    })
    // 秘制背景图
    _data.replace(/background:\s*url\(([^)]+?)\)/gi, function (match, capture) {
        _data = _data.replace(new RegExp(capture, 'g'), `'https://cj-emb.oss-cn-shenzhen.aliyuncs.com/${capture.replace(/'/, '')}`)
    });
    return _data
}

module.exports = replaceSrc
