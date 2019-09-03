
const createPhantomPool = require('phantom-pool')

const replaceSrc = require('../utils')
const pool = createPhantomPool({
    max: 10, // default
    min: 2, // default
    // how long a resource can stay idle in pool before being removed
    idleTimeoutMillis: 30000, // default.
    // maximum number of times an individual resource can be reused before being destroyed; set to 0 to disable
    maxUses: 50, // default
    // function to validate an instance prior to use; see https://github.com/coopernurse/node-pool#createpool
    validator: () => Promise.resolve(true), // defaults to always resolving true
    // validate resource before borrowing; required for `maxUses and `validator`
    testOnBorrow: true, // default
    // For all opts, see opts at https://github.com/coopernurse/node-pool#createpool
    phantomArgs: [['--ignore-ssl-errors=true', '--disk-cache=true'], {
        // logLevel: 'debug',
    }], // arguments passed to phantomjs-node directly, default is `[]`. For all opts, see https://github.com/amir20/phantomjs-node#phantom-object-api
})

let contents = [
    `在下面的图形中，根据图下面的分数涂上颜色．<br /><img  src="/upimages/quiz/images/201604/118/a30232f7.png" style="vertical-align:middle" /><div> 长颈漏斗；\\(\\rm{2H_{2}O_{2} dfrac { overset{;MnO_{2};}{ .}}{;}2H_{2}O+O_{2}↑}\\)；可以控制反应的发生和停止；\\(\\rm{A}\\)</div><div> 解：\\(\\rm{(1)}\\)长颈漏斗方便加液体药品，故答案为：长颈漏斗； <br />\\(\\rm{(2)}\\)如果用双氧水和二氧化锰制氧气就不需要加热，过氧化氢在二氧化锰做催化剂的条件下生成水和氧气，要注意配平；实验室常用加热氯化铵和氢氧化钙的固体混合物来制取氨气，因此需要加热；故答案为：\\(\\rm{A}\\)； <br />长颈漏斗方便加液体药品，制取装置包括加热和不需加热两种，如果用双氧水和二氧化锰制氧气就不需要加热，如果用高锰酸钾或氯酸钾制氧气就需要加热\\(\\rm{.}\\)氧气的密度比空气的密度大，不易溶于水，因此能用向上排空气法和排水法收集\\(\\rm{.}\\)实验室制取\\(\\rm{CO_{2}}\\)，是在常温下，用大理石或石灰石和稀盐酸制取的，碳酸钙和盐酸互相交换成分生成氯化钙和水和二氧化碳，因此不需要加热\\(\\rm{.}\\)二氧化碳能溶于水，密度比空气的密度大，因此只能用向上排空气法收集\\(\\rm{.C}\\)装置的优点是：可以控制反应的发生和停止；实验室常用加热氯化铵和氢氧化钙的固体混合物来制取氨气，因此需要加热．<br />本考点主要考查了仪器的名称、气体的制取装置和收集装置的选择，同时也考查了化学方程式的书写和装置的优点等，综合性比较强\\(\\rm{.}\\)气体的制取装置的选择与反应物的状态和反应的条件有关；气体的收集装置的选择与气体的密度和溶解性有关\\(\\rm{.}\\)本考点是中考的重要考点之一，主要出现在实验题中．</div>`,
    '在下面的图形中，根据图下面的分数涂上颜色．<br /><img  src="/upimages/quiz/images/201604/118/a30232f7.png" style="vertical-align:middle" />',
    `<span class="MathJye" mathtag="math" style="whiteSpace:nowrap;wordSpacing:normal;wordWrap:normal"><table cellpadding="-1" cellspacing="-1" style="margin-right:1px"><tr><td style="border-bottom:1px solid black">1</td></tr><tr><td>5</td></tr></table></span><br /><br />（2）<span class="MathJye" mathtag="math" style="whiteSpace:nowrap;wordSpacing:normal;wordWrap:normal"><table cellpadding="-1" cellspacing="-1" style="margin-right:1px"><tr><td style="border-bottom:1px solid black">5</td></tr><tr><td>9</td></tr></table></span>÷<span class="MathJye" mathtag="math" style="whiteSpace:nowrap;wordSpacing:normal;wordWrap:normal"><table cellpadding="-1" cellspacing="-1" style="margin-right:1px"><tr><td style="border-bottom:1px solid black">1</td></tr><tr><td>26</td></tr></table></span>+<span class="MathJye" mathtag="math" style="whiteSpace:nowrap;wordSpacing:normal;wordWrap:normal"><table cellpadding="-1" cellspacing="-1" style="margin-right:1px"><tr><td style="border-bottom:1px solid black">4</td></tr><tr><td>9</td></tr></table></span>×26<br />=<span class="MathJye" mathtag="math" style="whiteSpace:nowrap;wordSpacing:normal;wordWrap:normal"><table cellpadding="-1" cellspacing="-1" style="margin-right:1px"><tr><td style="border-bottom:1px solid black">5</td></tr><tr><td>9</td></tr></table></span>×26+<span class="MathJye" mathtag="math" style="whiteSpace:nowrap;wordSpacing:normal;wordWrap:normal"><table cellpadding="-1" cellspacing="-1" style="margin-right:1px"><tr><td style="border-bottom:1px solid black">4</td></tr><tr><td>9</td></tr></table></span>×26<br />=（<span class="MathJye" mathtag="math" style="whiteSpace:nowrap;wordSpacing:normal;wordWrap:normal"><table cellpadding="-1" cellspacing="-1" style="margin-right:1px"><tr><td style="border-bottom:1px solid black">5</td></tr><tr><td>9</td></tr></table></span>+<span class="MathJye" mathtag="math" style="whiteSpace:nowrap;wordSpacing:normal;wordWrap:normal"><table cellpadding="-1" cellspacing="-1" style="margin-right:1px"><tr><td style="border-bottom:1px solid black">4</td></tr><tr><td>9</td></tr></table></span>）×26<br />=1×26<br />=26<br /><br />（3）（<span class="MathJye" mathtag="math" style="whiteSpace:nowrap;wordSpacing:normal;wordWrap:normal"><table cellpadding="-1" cellspacing="-1" style="margin-right:1px"><tr><td style="border-bottom:1px solid black">2</td></tr><tr><td>5</td></tr></table></span>-<span class="MathJye" mathtag="math" style="whiteSpace:nowrap;wordSpacing:normal;wordWrap:normal"><table cellpadding="-1" cellspacing="-1" style="margin-right:1px"><tr><td style="border-bottom:1px solid black">2</td></tr><tr><td>5</td></tr></table></span>÷2）×<span class="MathJye" mathtag="math" style="whiteSpace:nowrap;wordSpacing:normal;wordWrap:normal"><table cellpadding="-1" cellspacing="-1" style="margin-right:1px"><tr><td style="border-bottom:1px solid black">5</td></tr><tr><td>3</td></tr></table></span><br />=（<span class="MathJye" mathtag="math" style="whiteSpace:nowrap;wordSpacing:normal;wordWrap:normal"><table cellpadding="-1" cellspacing="-1" style="margin-right:1px"><tr><td style="border-bottom:1px solid black">2</td></tr><tr><td>5</td></tr></table></span>-<span class="MathJye" mathtag="math" style="whiteSpace:nowrap;wordSpacing:normal;wordWrap:normal"><table cellpadding="-1" cellspacing="-1" style="margin-right:1px"><tr><td style="border-bottom:1px solid black">1</td></tr><tr><td>5</td></tr></table></span>）×<span class="MathJye" mathtag="math" style="whiteSpace:nowrap;wordSpacing:normal;wordWrap:normal"><table cellpadding="-1" cellspacing="-1" style="margin-right:1px"><tr><td style="border-bottom:1px solid black">5</td></tr><tr><td>3</td></tr></table></span><br />=<span class="MathJye" mathtag="math" style="whiteSpace:nowrap;wordSpacing:normal;wordWrap:normal"><table cellpadding="-1" cellspacing="-1" style="margin-right:1px"><tr><td style="border-bottom:1px solid black">1</td></tr><tr><td>5</td></tr></table></span>×<span class="MathJye" mathtag="math" style="whiteSpace:nowrap;wordSpacing:normal;wordWrap:normal"><table cellpadding="-1" cellspacing="-1" style="margin-right:1px"><tr><td style="border-bottom:1px solid black">5</td></tr><tr><td>3</td></tr></table></span><br />=<span class="MathJye" mathtag="math" style="whiteSpace:nowrap;wordSpacing:normal;wordWrap:normal"><table cellpadding="-1" cellspacing="-1" style="margin-right:1px"><tr><td style="border-bottom:1px solid black">1</td></tr><tr><td>3</td></tr></table></span><br /><br />（4）（2-<span class="MathJye" mathtag="math" style="whiteSpace:nowrap;wordSpacing:normal;wordWrap:normal"><table cellpadding="-1" cellspacing="-1" style="margin-right:1px"><tr><td style="border-bottom:1px solid black">9</td></tr><tr><td>10</td></tr></table></span>÷<span class="MathJye" mathtag="math" style="whiteSpace:nowrap;wordSpacing:normal;wordWrap:normal"><table cellpadding="-1" cellspacing="-1" style="margin-right:1px"><tr><td style="border-bottom:1px solid black">3</td></tr><tr><td>5</td></tr></table></span>）÷<span class="MathJye" mathtag="math" style="whiteSpace:nowrap;wordSpacing:normal;wordWrap:normal"><table cellpadding="-1" cellspacing="-1" style="margin-right:1px"><tr><td style="border-bottom:1px solid black">5</td></tr><tr><td>6</td></tr></table></span><br />=（2-<span class="MathJye" mathtag="math" style="whiteSpace:nowrap;wordSpacing:normal;wordWrap:normal"><table cellpadding="-1" cellspacing="-1" style="margin-right:1px"><tr><td style="border-bottom:1px solid black">3</td></tr><tr><td>2</td></tr></table></span>）÷<span class="MathJye" mathtag="math" style="whiteSpace:nowrap;wordSpacing:normal;wordWrap:normal"><table cellpadding="-1" cellspacing="-1" style="margin-right:1px"><tr><td style="border-bottom:1px solid black">5</td></tr><tr><td>6</td></tr></table></span><br />=<span class="MathJye" mathtag="math" style="whiteSpace:nowrap;wordSpacing:normal;wordWrap:normal"><table cellpadding="-1" cellspacing="-1" style="margin-right:1px"><tr><td style="border-bottom:1px solid black">1</td></tr><tr><td>2</td></tr></table></span>÷<span class="MathJye" mathtag="math" style="whiteSpace:nowrap;wordSpacing:normal;wordWrap:normal"><table cellpadding="-1" cellspacing="-1" style="margin-right:1px"><tr><td style="border-bottom:1px solid black">5</td></tr><tr><td>6</td></tr></table></span><br />=<span class="MathJye" mathtag="math" style="whiteSpace:nowrap;wordSpacing:normal;wordWrap:normal"><table cellpadding="-1" cellspacing="-1" style="margin-right:1px"><tr><td style="border-bottom:1px solid black">3</td></tr><tr><td>5</td></tr></table></span><br /><br />（5）25%×3.6+6.4×<span class="MathJye" mathtag="math" style="whiteSpace:nowrap;wordSpacing:normal;wordWrap:normal"><table cellpadding="-1" cellspacing="-1" style="margin-right:1px"><tr><td style="border-bottom:1px solid black">1</td></tr><tr><td>4</td></tr></table></span><br />=0.25×3.6+6.4×0.25<br />=0.25×（3.6+6.4）<br />=0.25×10<br />=2.5<br /><br />（6）<span class="MathJye" mathtag="math" style="whiteSpace:nowrap;wordSpacing:normal;wordWrap:normal"><table cellpadding="-1" cellspacing="-1" style="margin-right:1px"><tr><td style="border-bottom:1px solid black">8</td></tr><tr><td>25</td></tr></table></span>×99+<span class="MathJye" mathtag="math" style="whiteSpace:nowrap;wordSpacing:normal;wordWrap:normal"><table cellpadding="-1" cellspacing="-1" style="margin-right:1px"><tr><td style="border-bottom:1px solid black">8</td></tr><tr><td>25</td></tr></table></span><br />=<span class="MathJye" mathtag="math" style="whiteSpace:nowrap;wordSpacing:normal;wordWrap:normal"><table cellpadding="-1" cellspacing="-1" style="margin-right:1px"><tr><td style="border-bottom:1px solid black">8</td></tr><tr><td>25</td></tr></table></span>×（99+1）<br />=<span class="MathJye" mathtag="math" style="whiteSpace:nowrap;wordSpacing:normal;wordWrap:normal"><table cellpadding="-1" cellspacing="-1" style="margin-right:1px"><tr><td style="border-bottom:1px solid black">8</td></tr><tr><td>25</td></tr></table></span>×100<br />=32</div>`,
    `<span class="MathJye" mathtag="math" style="whiteSpace:nowrap;wordSpacing:normal;wordWrap:normal"><table cellpadding="-1" cellspacing="-1" style="margin-right:1px"><tbody><tr><td style="border-bottom:1px solid black;padding-bottom:1px;font-size:90%"><span><span>x</span><span style="vertical-align:super;font-size:90%">2</span></span>y-x<span><span>y</span><span style="vertical-align:super;font-size:90%">2</span></span></td></tr><tr><td>3</td></tr></tbody></table></span>`
]

contents = contents.map((o) => replaceSrc(o))
const text = contents[0]

function shot (req, res, next) {
    pool.use(async (instance) => {
        console.time(2)
        const page = await instance.createPage()
        const status = await page.open('http://127.0.0.1:3003/public/test.html', { operation: 'GET' })
        if (status !== 'success') {
            throw new Error('cannot open google.com')
        }
        await page.evaluateJavaScript(`function() {
            document.body.innerHTML = '${text}';
            MathJax.Hub.Config({tex2jax: {inlineMath: [['$','$'], ['\\(','\\)']]}});
            MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
         }`)

        setTimeout(async function () {
            await page.render('./image/img.png');
            res.status(200)
            res.end('成功咯')
            console.timeEnd(2)
        }, 1000)
    }).then((content) => {
        console.log(content)
    })
}

// app.use('/phantom', function (req, res) {

// const phantom = require('phantom');

// (async function () {
//     console.time(1)
//     const instance = await phantom.create();
//     const page = await instance.createPage();
//     await page.property('viewportSize');
//     await page.on('onResourceRequested', function (requestData) {
//         console.info('Requesting', requestData.url);
//     });

//     await page.open('http://127.0.0.1:3003/public/test.html');
//     await page.evaluateJavaScript(`function() {
//         document.body.innerHTML = '${text}';
//         MathJax.Hub.Config({tex2jax: {inlineMath: [['$','$'], ['\\(','\\)']]}});
//         MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
//      }`)

//     setTimeout(async function () {
//         await page.render('math.png');
//         await instance.exit();
//         res.end('成功咯')
//         console.timeEnd(1)
//     }, 1000)
// })();
// })

module.exports = shot
