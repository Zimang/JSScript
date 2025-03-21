importClass(org.opencv.imgproc.Imgproc);
importClass(org.opencv.core.Core);
importClass(org.opencv.core.Rect);
importClass(org.opencv.core.Mat);
importClass(org.opencv.core.Point);
importClass(org.opencv.core.Size);
importClass(org.opencv.core.CvType);
importClass(org.opencv.core.Scalar);
importClass(org.opencv.imgcodecs.Imgcodecs);
//shit
var prefixPath=""

// 分析脚本代码的变量
let clickCount = 0;

/** 图片处理  **/
// TODO 我希望能够将matchTemplate拆分出来，显然中间的遍历scale数组的逻辑太糟糕了

function buildRegion(region, img) {
    if (region == undefined) {
        region = [];
    }
    let x = region[0] === undefined ? 0 : region[0];
    let y = region[1] === undefined ? 0 : region[1];
    let width = region[2] === undefined ? img.getWidth() - x : region[2];
    let height = region[3] === undefined ? img.getHeight() - y : region[3];
    if (x < 0 || y < 0 || x + width > img.width || y + height > img.height) {
        throw new Error(
            'out of region: region = [' + [x, y, width, height] + '], image.size = [' + [img.width, img.height] + ']'
        );
    }
    return new Rect(x, y, width, height);
}

/**
 * @param {number} threshold 图片相似度。取值范围为0~1的浮点数。默认值为0.9
 * @param {number[]} region 找图区域
 * @param {number[]} scaleFactors 大图的宽高缩放因子，默认为 [1, 0.9, 1.1, 0.8, 1.2]
 * @param {number} max 找图结果最大数量，默认为5
 * @param {boolean} grayTransform 是否进行灰度化预处理，默认为true。
 * 通常情况下将图像转换为灰度图可以简化匹配过程并提高匹配的准确性，当然，如果你的匹配任务中颜色信息对匹配结果具有重要意义，
 * 可以跳过灰度化步骤，直接在彩色图像上进行模板匹配。
 */
function MatchOptions(threshold, region, scaleFactors, max, grayTransform) {
    this.threshold = threshold;
    this.region = region;
    this.scaleFactors = scaleFactors;
    this.max = max;
    this.grayTransform = grayTransform;
}

function PointInBackground(p, bw, bh) {
    this.pointX = p.x;
    this.pointY = p.y;
    this.bgWidth = bw;
    this.bgHeight = bh;
}

const defaultMatchOptions = new MatchOptions(
    0.9,
    undefined,
    [
        [1, 1],
        [0.9, 0.9],
        [1.1, 1.1],
        [0.8, 0.8],
        [1.2, 1.2]
    ],
    5,
    true
);
// 校验参数
MatchOptions.check = function (options) {
    if (options == undefined) {
        return defaultMatchOptions;
    }
    // deep copy
    let newOptions = JSON.parse(JSON.stringify(options));
    if (newOptions.threshold == undefined) {
        newOptions.threshold = defaultMatchOptions.threshold;
    }
    if (newOptions.region && !Array.isArray(newOptions.region)) {
        throw new TypeError('region type is number[]');
    }
    if (newOptions.max == undefined) {
        newOptions.max = defaultMatchOptions.max;
    }
    if (newOptions.scaleFactors == undefined) {
        newOptions.scaleFactors = defaultMatchOptions.scaleFactors;
    } else if (!Array.isArray(newOptions.scaleFactors)) {
        throw new TypeError('scaleFactors');
    }
    for (let index = 0; index < newOptions.scaleFactors.length; index++) {
        let factor = newOptions.scaleFactors[index];
        if (Array.isArray(factor) && factor[0] > 0 && factor[1] > 0) {
            // nothing
        } else if (typeof factor === 'number') {
            newOptions.scaleFactors[index] = [factor, factor];
        } else {
            throw new TypeError('scaleFactors');
        }
    }
    if (newOptions.grayTransform === undefined) {
        newOptions.grayTransform = defaultMatchOptions.grayTransform;
    }

    return newOptions;
};

function Match(point, similarity, scaleX, scaleY) {
    this.point = point;
    this.similarity = similarity;
    this.scaleX = scaleX;
    this.scaleY = scaleY;
}

/**
 * 找图，在图中找出所有匹配的位置
 * @param {Image} img
 * @param {Image} template
 * @param {MatchOptions} options 参数见上方定义
 * @returns {Match[]}
 */
function matchTemplate(img, template, options) {
    // console.log(Imgproc.resize.toString())
    if (img == null || template == null) {
        throw new Error('ParamError img null:'+img==null+" temp == null:"+template==null);
    }
    options = MatchOptions.check(options);
    // console.log('参数：', options);

    let largeMat = img.mat;
    let templateMat = template.mat;

    console.log("temp ", templateMat,"lar ",largeMat);
    let largeGrayMat;
    let templateGrayMat;
    if (options.region) {
        options.region = buildRegion(options.region, img);
        largeMat = new Mat(largeMat, options.region);
    }
    // 灰度处理
    if (options.grayTransform) {
        largeGrayMat = new Mat();
        Imgproc.cvtColor(largeMat, largeGrayMat, Imgproc.COLOR_BGR2GRAY);
        templateGrayMat = new Mat();
        Imgproc.cvtColor(templateMat, templateGrayMat, Imgproc.COLOR_BGR2GRAY);
    }

    // console.log("tempG ", templateGrayMat,"larG ",largeGrayMat);
    // =================================================
    let finalMatches = [];
    for (let factor of options.scaleFactors) {
        let [fx, fy] = factor;
        let resizedTemplate = new Mat();
        // console.log("templateGrayMat || templateMat ",templateGrayMat || templateMat);

        Imgproc.resize(templateGrayMat || templateMat, resizedTemplate, new Size(), fx, fy, Imgproc.INTER_LINEAR);
        // 执行模板匹配，标准化相关性系数匹配法
        let matchMat = new Mat();
//
    //    console.log('新的temp 长宽 '+resizedTemplate.size().height+" "+resizedTemplate.size().width);
    //    console.log('新的imag 长宽 '+largeMat.size().height+" "+largeMat.size().width);
        // 检查 resizedTemplate 的尺寸是否超过 largeMat 的尺寸
        // 放缩因子可能会导致在蚂蚁窝找大象的问题        
        if (resizedTemplate.size().height > largeMat.size().height ||
            resizedTemplate.size().width > largeMat.size().width) {
            // console.log('放缩后存在冲突');
            resizedTemplate.release();
            continue;
        }


        Imgproc.matchTemplate(largeGrayMat || largeMat, resizedTemplate, matchMat, Imgproc.TM_CCOEFF_NORMED);
        let currentMatches = _getAllMatch(matchMat, resizedTemplate, options.threshold, factor, options.region);
        //  console.log('缩放比：', factor, '可疑目标数：', currentMatches.length);
        for (let match of currentMatches) {
            if (finalMatches.length === 0) {
                finalMatches = currentMatches.slice(0, options.max);
                break;
            }
            if (!isOverlapping(finalMatches, match)) {
                finalMatches.push(match);
            }
            if (finalMatches.length >= options.max) {
                break;
            }
        }
        resizedTemplate.release();
        matchMat.release();
        if (finalMatches.length >= options.max) {
            break;
        }
    }
    largeMat !== img.mat && largeMat.release();
    largeGrayMat && largeGrayMat.release();
    templateGrayMat && templateGrayMat.release();

    return finalMatches;
} 
 

function _getAllMatch(tmResult, templateMat, threshold, factor, rect) {
    let currentMatches = [];
    let mmr = Core.minMaxLoc(tmResult);

    while (mmr.maxVal >= threshold) {
        // 每次取匹配结果中的最大值和位置，从而使结果按相似度指标从高到低排序
        let pos = mmr.maxLoc; // Point
        let value = mmr.maxVal;

        let start = new Point(Math.max(0, pos.x - templateMat.width() / 2), Math.max(0, pos.y - templateMat.height() / 2));
        let end = new Point(
            Math.min(tmResult.width() - 1, pos.x + templateMat.width() / 2),
            Math.min(tmResult.height() - 1, pos.y + templateMat.height() / 2)
        );
        // 屏蔽已匹配到的区域
        Imgproc.rectangle(tmResult, start, end, new Scalar(0), -1);
        mmr = Core.minMaxLoc(tmResult);

        if (rect) {
            pos.x += rect.x;
            pos.y += rect.y;
            start.x += rect.x;
            start.y += rect.y;
            end.x += rect.x;
            end.y += rect.y;
        }
        let match = new Match(pos, value, factor[0], factor[1]);
        // 保存匹配点的大致范围，用于后续去重。设置enumerable为false相当于声明其为私有属性
        Object.defineProperty(match, 'matchAroundRect', { value: new Rect(start, end), writable: true, enumerable: false });
        currentMatches.push(match);
    }

    return currentMatches;
}

/**
 * 判断新检测到的点位是否与之前的某个点位重合。
 * @param {Match[]} matches
 * @param {Match} newMatch
 * @returns {boolean}
 */
function isOverlapping(matches, newMatch) {
    for (let existingMatch of matches) {
        // 也可判断两点间的距离，但是平方、开方运算不如比较范围简单高效
        if (existingMatch.matchAroundRect.contains(newMatch.point)) {
            if (newMatch.similarity > existingMatch.similarity) {
                existingMatch.point = newMatch.point;
                existingMatch.similarity = newMatch.similarity;
                existingMatch.scaleX = newMatch.scaleX;
                existingMatch.scaleY = newMatch.scaleY;
                existingMatch.matchAroundRect = newMatch.matchAroundRect;
            }
            return true;
        }
    }
    return false;
}
/**
 * 根据搜图结果在原图上画框
 * @param {Match[]} matches
 * @param {*} srcMat
 * @param {*} templateMat
 */
function showMatchRectangle(matches, srcMat, templateMat) {
    for (let match of matches) {
        let start = match.point;
        let end = new Point(
            match.point.x + templateMat.width() * match.scaleX,
            match.point.y + templateMat.height() * match.scaleY
        );
        Imgproc.rectangle(srcMat, start, end, new Scalar(0, 0, 255), 3);
    }

    const saveName = '/sdcard/Download/temp_' + getDate() + '.jpg';
    let img2 = images.matToImage(srcMat);
    images.save(img2, saveName);
    app.viewFile(saveName);
    img2.recycle();
}

/** 单图片搜索后的处理 */
// 包括
// 1. 找到图片点击中央
// 2. 找到图片拖拽,水平或垂直
// 3. 找到图片长按
// 4. 连续时间间隔里点击相同图片，或设置重试上限
// 5. 

//这个函数如果我用captureScreen做默认函数，会不会出现延时的问题？
//毕竟截一张图的时间可比创建一个int的时间长多了

//两个库混用存在问题，一个是用opencv进行查找，一个使用autox查找
//这个时候容易出现类型转换的问题
//在使用上，我们需要的是最简单的，点位或者说坐标
function clickTargetPicCentral(tar, delay, source) {
    // console.log(formatDate(new Date()) + "  clickTargetPicCentral")
    
    if (!source) {
        var img = captureScreen();
        images.saveImage(img, "/sdcard/1.jpg", "jpg");
        var source = images.read("/sdcard/1.jpg");
    } 
    //    console.log("zim"+source.width)
    var res = matchTemplate(source, tar, {
        threshold: 0.85,
        region: [100, 100],
        grayTransform: true,
        // scaleFactors: [ 1.6],
        scaleFactors: [1, 0.9, 1.1, 0.8, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 1.9, 2.0],
    })
    if (res.length >= 1) {
        
        let match = res[0];
        const x = Number(match.point.x) + Number(tar.width) * Number(match.scaleX) * 0.5;
        const y = Number(match.point.y) + Number(tar.height) * Number(match.scaleY) * 0.5; 
        click(x, y)
        // console.log("坐标:"+match.point.x+" "+match.point.y)
        // click(match.point.x + tar.width * match.scaleX * 0.5, match.point.y + tar.height * match.scaleY * 0.5)
        // console.log("宽:"+source.width+"高"+source.height)
        tar.recycle()
        source.recycle()
        sleep(delay)
        return true
    } else {
        //没找到也应该清除
        tar.recycle()
        source.recycle()
        sleep(delay)
        return false
    }
}

function findSinglePicTo(fn,tar,delay,source){
    if (!source) {
        var img = captureScreen();
        images.saveImage(img, "/sdcard/1.jpg", "jpg");
        var source = images.read("/sdcard/1.jpg");
    } 
    //    console.log("zim"+source.width)
    var res = matchTemplate(source, tar, {
        threshold: 0.85,
        region: [100, 100],
        grayTransform: true,
        // scaleFactors: [ 1.6],
        scaleFactors: [1, 0.9, 1.1, 0.8, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 1.9, 2.0],
    })
    if (res.length >= 1) {
        
        let match = res[0];
        const x = Number(match.point.x) + Number(tar.width) * Number(match.scaleX) * 0.5;
        const y = Number(match.point.y) + Number(tar.height) * Number(match.scaleY) * 0.5; 
        fn(match.point.x, match.point.y,tar.width,tar.height)
        // console.log("坐标:"+match.point.x+" "+match.point.y)
        // click(match.point.x + tar.width * match.scaleX * 0.5, match.point.y + tar.height * match.scaleY * 0.5)
        // console.log("宽:"+source.width+"高"+source.height)
        tar.recycle()
        source.recycle()
        sleep(delay)
        return true
    } else {
        tar.recycle()
        source.recycle()
        sleep(delay)
        return false
    }
}
function findSingleColorfulPicTo(fn,tar,delay,source){
    if (!source) {
        var img = captureScreen();
        images.saveImage(img, "/sdcard/1.jpg", "jpg");
        var source = images.read("/sdcard/1.jpg");
    } 
    //    console.log("zim"+source.width)
    var res = matchTemplate(source, tar, {
        threshold: 0.85,
        region: [100, 100],
        grayTransform: false,
        // scaleFactors: [ 1.6],
        scaleFactors: [1, 0.9, 1.1, 0.8, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 1.9, 2.0],
    })
    if (res.length >= 1) {
        
        let match = res[0]; 
        fn(match.point.x, match.point.y,tar.width,tar.height) 
        tar.recycle()
        source.recycle()
        sleep(delay)
        return true
    } else {
        tar.recycle()
        source.recycle()
        sleep(delay)
        return false
    }
}
function findSinglePicFromPathTo(fn,tarp,delay,source){
    if (!source) {
        var img = captureScreen();
        images.saveImage(img, "/sdcard/1.jpg", "jpg");
        var source = images.read("/sdcard/1.jpg");
    } 
    var tar= images.read(tarp);
    //    console.log("zim"+source.width)
    var res = matchTemplate(source, tar, {
        threshold: 0.85,
        region: [100, 100],
        grayTransform: true,
        // scaleFactors: [ 1.6],
        scaleFactors: [1, 0.9, 1.1, 0.8, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 1.9, 2.0],
    })
    if (res.length >= 1) {
        
        let match = res[0];
        const x = Number(match.point.x) + Number(tar.width) * Number(match.scaleX) * 0.5;
        const y = Number(match.point.y) + Number(tar.height) * Number(match.scaleY) * 0.5; 
        fn(match.point.x, match.point.y,tar.width,tar.height)
        // console.log("坐标:"+match.point.x+" "+match.point.y)
        // click(match.point.x + tar.width * match.scaleX * 0.5, match.point.y + tar.height * match.scaleY * 0.5)
        // console.log("宽:"+source.width+"高"+source.height)
        tar.recycle()
        source.recycle()
        sleep(delay)
        return true
    } else {
        tar.recycle()
        source.recycle()
        sleep(delay)
        return false
    }
}
function findSingleColorfulPicFromPathTo(fn,tarp,delay,source){
    if (!source) {
        var img = captureScreen();
        images.saveImage(img, "/sdcard/1.jpg", "jpg");
        var source = images.read("/sdcard/1.jpg");
    } 
    var tar= images.read(tarp);
    //    console.log("zim"+source.width)
    var res = matchTemplate(source, tar, {
        threshold: 0.85,
        region: [100, 100],
        grayTransform: false,
        // scaleFactors: [ 1.6],
        scaleFactors: [1, 0.9, 1.1, 0.8, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 1.9, 2.0],
    })
    if (res.length >= 1) {
        
        let match = res[0]; 
        fn(match.point.x, match.point.y,tar.width,tar.height) 
        tar.recycle()
        source.recycle()
        sleep(delay)
        return true
    } else {
        tar.recycle()
        source.recycle()
        sleep(delay)
        return false
    }
}

function clickTargetPicCentralFromPath(tarp, delay, source) {
    console.log(formatDate(new Date()) + "  "+tarp)
    if (!source) {
        var img = captureScreen();
        images.saveImage(img, "/sdcard/1.jpg", "jpg");
        var source = images.read("/sdcard/1.jpg"); 
    }
    clog("w and h "+source.getWidth()+" "+source.getHeight())
    if(!delay) delay=0
    var tar= images.read(tarp);
    //    console.log("zim"+source.width)
    var res = matchTemplate(source, tar, {
        threshold: 0.85,
        region: [100, 100],
        grayTransform: true,
        // scaleFactors: [ 1.6],
        scaleFactors: [1, 0.9, 1.1, 0.8, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 1.9, 2.0],
    })
    if (res.length >= 1) {
        
        let match = res[0];
        const x = Number(match.point.x) + Number(tar.width) * Number(match.scaleX) * 0.5;
        const y = Number(match.point.y) + Number(tar.height) * Number(match.scaleY) * 0.5; 
        click(x, y)
        console.log("坐标:"+match.point.x+" "+match.point.y)
        console.log("宽:"+source.width+"高"+source.height)
        tar.recycle()
        source.recycle()
        sleep(delay)
        return true
    } else {
        tar.recycle()
        source.recycle()
        console.log("没有找到图片")
        sleep(delay)
        return false
    }
}
function clog(msg){
    console.log(msg)
}
function clickColorfulTargetPicCentralFromPath(tarp, delay, source) {
    // console.log(formatDate(new Date()) + "  clickTargetPicCentral")
    clog(tarp)
    if (!source) {
        var img = captureScreen();
        images.saveImage(img, "/sdcard/1.jpg", "jpg");
        var source = images.read("/sdcard/1.jpg");
    }
    var tar= images.read(tarp);
    var res = matchTemplate(source, tar, {
        threshold: 0.85,
        region: [100, 100],
        grayTransform: false,
        // scaleFactors: [ 1.6],
        scaleFactors: [1, 0.9, 1.1, 0.8, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 1.9, 2.0],
    })
    if (res.length >= 1) {
        
        let match = res[0];
        const x = Number(match.point.x) + Number(tar.width) * Number(match.scaleX) * 0.5;
        const y = Number(match.point.y) + Number(tar.height) * Number(match.scaleY) * 0.5; 
        click(x, y)
        // console.log("坐标:"+match.point.x+" "+match.point.y)
        // click(match.point.x + tar.width * match.scaleX * 0.5, match.point.y + tar.height * match.scaleY * 0.5)
        // console.log("宽:"+source.width+"高"+source.height)
        tar.recycle()
        source.recycle()
        sleep(delay)
        return true
    } else {
        tar.recycle()
        source.recycle()
        console.log("没有找到图片")
        sleep(delay)
        return false
    }
}
function clickColorfulTargetPicLeftTop(tar, delay, source) {
    console.log(formatDate(new Date()) + "  clickTargetPicCentral")
    if (!source) {
        var img = captureScreen();
        images.saveImage(img, "/sdcard/1.jpg", "jpg");
        var source = images.read("/sdcard/1.jpg");
    }
    //    console.log("zim"+source.width)
    var res = matchTemplate(source, tar, {
        threshold: 0.85,
        region: [100, 100],
        grayTransform: false,
        // scaleFactors: [ 1.6],
        scaleFactors: [1, 0.9, 1.1, 0.8, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 1.9, 2.0],
    })
    if (res.length >= 1) {
        
        let match = res[0];
        const x = Number(match.point.x)  
        const y = Number(match.point.y) 
        click(x, y)
        console.log("坐标:"+match.point.x+" "+match.point.y)
        // click(match.point.x + tar.width * match.scaleX * 0.5, match.point.y + tar.height * match.scaleY * 0.5)
        console.log("宽:"+source.width+"高"+source.height)
        tar.recycle()
        source.recycle()
        sleep(delay)
        return true
    } else {
        tar.recycle()
        source.recycle()
        sleep(delay)
        return false
    }
}

function clickColorfulTargetPicLeftTopFromPath(tarp, delay, source) {
    console.log(formatDate(new Date()) + "  clickTargetPicCentral")
    if (!source) {
        var img = captureScreen();
        images.saveImage(img, "/sdcard/1.jpg", "jpg");
        var source = images.read("/sdcard/1.jpg");
    }
    var tar= images.read(tarp);
    if (!source) {
        var img = captureScreen();
        images.saveImage(img, "/sdcard/1.jpg", "jpg");
    }
    //    console.log("zim"+source.width)
    var res = matchTemplate(source, tar, {
        threshold: 0.85,
        region: [100, 100],
        grayTransform: false,
        // scaleFactors: [ 1.6],
        scaleFactors: [1, 0.9, 1.1, 0.8, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 1.9, 2.0],
    })
    if (res.length >= 1) {
        
        let match = res[0];
        const x = Number(match.point.x)  
        const y = Number(match.point.y) 
        click(x, y)
        console.log("坐标:"+match.point.x+" "+match.point.y)
        // click(match.point.x + tar.width * match.scaleX * 0.5, match.point.y + tar.height * match.scaleY * 0.5)
        console.log("宽:"+source.width+"高"+source.height)
        tar.recycle()
        source.recycle()
        sleep(delay)
        return true
    } else {
        tar.recycle()
        source.recycle()
        sleep(delay)
        return false
    }
}

function clickTargetPicLeftTop(tar, delay, source) {
    console.log(formatDate(new Date()) + "  clickTargetPicCentral")
    if (!source) {
        var img = captureScreen();
        images.saveImage(img, "/sdcard/1.jpg", "jpg");
        var source = images.read("/sdcard/1.jpg");
    }
    //    console.log("zim"+source.width)
    var res = matchTemplate(source, tar, {
        threshold: 0.85,
        region: [100, 100],
        grayTransform: true,
        // scaleFactors: [ 1.6],
        scaleFactors: [1, 0.9, 1.1, 0.8, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 1.9, 2.0],
    })
    if (res.length >= 1) {
        
        let match = res[0];
        const x = Number(match.point.x)  
        const y = Number(match.point.y) 
        click(x, y)
        console.log("坐标:"+match.point.x+" "+match.point.y)
        // click(match.point.x + tar.width * match.scaleX * 0.5, match.point.y + tar.height * match.scaleY * 0.5)
        console.log("宽:"+source.width+"高"+source.height)
        tar.recycle()
        source.recycle()
        sleep(delay)
        return true
    } else {
        tar.recycle()
        source.recycle()
        sleep(delay)
        return false
    }
}
 
//洗衣粉广告
function clickFromPath(path,delay) {
    var current = className("android.widget.FrameLayout").findOne();
    if(!current){
        clog("路径无效")
        if(delay){
            sleep(delay)
        }
        return;
    }
    for (var i = 2; i < path.length; i++) { 
        clog(current)
        // clog("路径号#"+(i+1))
        if(current.childCount()<=path[i]){
            clog("路径无效")
            if(delay){
                sleep(delay)
            }
            return;
        }
        current = current.child(path[i]);
    }
    current.click();
    if(delay){
        sleep(delay)
    }
}
function clickTargetPicLeftTopFromPath(tarp, delay, source) {
    console.log(formatDate(new Date()) + "  clickTargetPicCentral")
    if (!source) {
        var img = captureScreen();
        images.saveImage(img, "/sdcard/1.jpg", "jpg");
        var source = images.read("/sdcard/1.jpg");
    }
    var tar= images.read(tarp);
    //    console.log("zim"+source.width)
    var res = matchTemplate(source, tar, {
        threshold: 0.85,
        region: [100, 100],
        grayTransform: true,
        // scaleFactors: [ 1.6],
        scaleFactors: [1, 0.9, 1.1, 0.8, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 1.9, 2.0],
    })
    if (res.length >= 1) {
        
        let match = res[0];
        const x = Number(match.point.x)  
        const y = Number(match.point.y) 
        click(x, y)
        // console.log("坐标:"+match.point.x+" "+match.point.y)
        // click(match.point.x + tar.width * match.scaleX * 0.5, match.point.y + tar.height * match.scaleY * 0.5)
        // console.log("宽:"+source.width+"高"+source.height)
        tar.recycle()
        source.recycle()
        sleep(delay)
        return true
    } else {
        tar.recycle()
        source.recycle()
        sleep(delay)
        return false
    }
}
 

function swipeTargetPicLeft(tar, delay, dur, source) {
    console.log(formatDate(new Date()) + "swipeTargetPicLeft")
    if (!source) {
        var img = captureScreen();
        images.saveImage(img, "/sdcard/1.jpg", "jpg");
        var source = images.read("/sdcard/1.jpg");
    }
    if (!dur) {
        dur = 200
    }
    //    console.log("zim"+source.width)
    var res = matchTemplate(source, tar, {
        threshold: 0.85,
        region: [100, 100],
        grayTransform: false,
        scaleFactors: [1, 0.9, 1.1, 0.8, 1.2],
        // scaleFactors: [ 1.6],
        max: 1
    })
    if (res.length >= 1) {
        let match = res[0];
        let match_x = match.point.x + tar.width * match.scaleX * 0.5
        let match_y = match.point.y + tar.height * match.scaleY * 0.5
        //        console.log("坐标:"+match.point.x+" "+match.point.y)
        swipe(match_x, match_y, match_x + tar.width * match.scaleX * 0.5, match_y, dur)
        //        console.log("宽:"+source.width+"高"+source.height)
        tar.recycle()
        source.recycle()
        sleep(delay)
        return true
    } else {
        tar.recycle()
        source.recycle()
        sleep(delay)
        return false
    }
}


function swipeTargetPicLeftFromPath(tarp, delay, dur, source) {
    console.log(formatDate(new Date()) + "swipeTargetPicLeft")
    if (!source) {
        var img = captureScreen();
        images.saveImage(img, "/sdcard/1.jpg", "jpg");
        var source = images.read("/sdcard/1.jpg");
    }
    var tar= images.read(tarp);
    if (!dur) {
        dur = 200
    }
    //    console.log("zim"+source.width)
    var res = matchTemplate(source, tar, {
        threshold: 0.85,
        region: [100, 100],
        grayTransform: false,
        scaleFactors: [1, 0.9, 1.1, 0.8, 1.2],
        // scaleFactors: [ 1.6],
        max: 1
    })
    if (res.length >= 1) {
        let match = res[0];
        let match_x = match.point.x + tar.width * match.scaleX * 0.5
        let match_y = match.point.y + tar.height * match.scaleY * 0.5
        //        console.log("坐标:"+match.point.x+" "+match.point.y)
        swipe(match_x, match_y, match_x + tar.width * match.scaleX * 0.5, match_y, dur)
        //        console.log("宽:"+source.width+"高"+source.height)
        tar.recycle()
        source.recycle()
        sleep(delay)
        return true
    } else {
        tar.recycle()
        source.recycle()
        sleep(delay)
        return false
    }
}

//多图片处理
// 1. 多个图片匹配,如果只有一个能够点击，那似乎问题不会太大
function clickAllPicsCentral(tar, delay,picNum,intervalT, source) {
    console.log(formatDate(new Date()) + "clickAllPicsCentral")
    if (!source) {
        var img = captureScreen();
        images.saveImage(img, "/sdcard/1.jpg", "jpg");
        var source = images.read("/sdcard/1.jpg");
    }
    if(!intervalT){
        intervalT=20
    }
    //    console.log("zim"+source.width)
    var res = matchTemplate(source, tar, {
        threshold: 0.85,
        region: [100, 100],
        grayTransform: false,
        scaleFactors: [1, 0.9, 1.1, 0.8, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 1.9, 2.0],
        // scaleFactors: [ 1.6],
        max: picNum
    })
    if (res.length >= 1) {
        for(let match of res){
            var x = Number(match.point.x) + Number(tar.width) * Number(match.scaleX) * 0.5;
            var y = Number(match.point.y) + Number(tar.height) * Number(match.scaleY) * 0.5;
            console.log("x,y  "+x+"="+match.point.x+"+"+tar.width * match.scaleX * 0.5+"   "+y+"="+match.point.x+"+"+tar.width * match.scaleX * 0.5)

            click(x, y)
            //        console.log("宽:"+source.width+"高"+source.height)
            sleep(intervalT)
        }
        tar.recycle()
        source.recycle()
        sleep(delay)
        return true
    } else {
        tar.recycle()
        source.recycle()
        sleep(delay)
        return false
    }
}
function clickAllPicsCentralFromPath(tarp, delay,picNum,intervalT, source) {
    console.log(formatDate(new Date()) + "clickAllPicsCentral")
    if (!source) {
        var img = captureScreen();
        images.saveImage(img, "/sdcard/1.jpg", "jpg");
        var source = images.read("/sdcard/1.jpg");
    }
    var tar= images.read(tarp);
    if(!intervalT){
        intervalT=20
    }
    //    console.log("zim"+source.width)
    var res = matchTemplate(source, tar, {
        threshold: 0.85,
        region: [100, 100],
        grayTransform: false,
        scaleFactors: [1, 0.9, 1.1, 0.8, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 1.9, 2.0],
        // scaleFactors: [ 1.6],
        max: picNum
    })
    if (res.length >= 1) {
        for(let match of res){
            var x = Number(match.point.x) + Number(tar.width) * Number(match.scaleX) * 0.5;
            var y = Number(match.point.y) + Number(tar.height) * Number(match.scaleY) * 0.5;
            console.log("x,y  "+x+"="+match.point.x+"+"+tar.width * match.scaleX * 0.5+"   "+y+"="+match.point.x+"+"+tar.width * match.scaleX * 0.5)

            click(x, y)
            //        console.log("宽:"+source.width+"高"+source.height)
            sleep(intervalT)
        }
        tar.recycle()
        source.recycle()
        sleep(delay)
        return true
    } else {
        tar.recycle()
        source.recycle()
        sleep(delay)
        return false
    }
}
function repeatFunction(fn, times) {
    if(times<0) times=999
    if(!times) times=1
    for (let i = 0; i < times; i++) {
        fn(); // 调用传入的函数
    }
}

function countDownRepeat(fn, exitFn, count) {
    const exit=exitFn()
    console.log(exit); // 打印当前计数值
    if (count < 0 || exit) return; // 如果 count 小于 0 或 exitFn 返回 true，结束递归
    fn(); // 执行传入的函数
    countDownRepeat(fn, exitFn, --count); // 递归调用，count 减 1
}


function screenCentralClick(delay,isLandscape){
    clickCount++
    console.log("click screen central count"+clickCount)
    if(isLandscape&&isLandscape==true){
        click(device.height*0.5,device.width*0.5)
    }else{
        click(device.width*0.5,device.height*0.5)
    }
    sleep(delay)
}


function landScapeCentralClick(delay){
    clickCount++
    console.log("click screen central count"+clickCount) 
    click(device.height*0.5,device.width*0.5)  
    sleep(delay)
}

//wait2do 
//等到某个事件出现（图片，组件），然后去做某件事情
//找到的ponit(一个)和args作为参数提供给callback
//function waitImage2Do(template,overtime,callback,...args) {
//    var itemSleep = 500
//    if(!files.exists(template)){
//        return false
//    }
//    var temp = images.read(template)
//    for (i = 0; i < 999; i++) {
//        if (i * itemSleep > overtime) {
//            return false
//        }
//        var img = captureScreen();
//        images.saveImage(img, "/sdcard/1.jpg", "jpg");
//        var bg = images.read("/sdcard/1.jpg")
//        var point = matchTemplate(bg, temp, {
//            threshold: 0.9,
//            grayTransform: false,
//            scaleFactors: [1, 0.9, 1.1, 0.8, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 1.9, 2.0],
//            max:1
//        })
//        if (point.length > 0) {
//            bg.recycle()
//            temp.recycle()
//            callback(PointInBackground(point,temp.width,temp.height),...args)
//            return true
//        }
//        bg.recycle()
//        sleep(itemSleep)
//    }
//    bg.recycle()
//    temp.recycle()
//    return false
//};

//广告处理

// 定义控件大小的合理范围（根据实际情况调整）
var minWidth = 50; // 最小宽度
var maxWidth = 150; // 最大宽度
var minHeight = 50; // 最小高度
var maxHeight = 150; // 最大高度
var screenWidth = device.width;
var screenHeight = device.height;

// 定义目标区域（屏幕中间向右的右上角四分之一）
var targetTop = 0;
var targetLeft = Math.floor(screenWidth / 2);
var targetBottom = Math.floor(screenHeight / 4);
var targetRight = screenWidth; 

var adThread = null; 
function startAdDetection(){
    if(adThread){
        console.log("ad thread already start")
    }else{
        adThread=threads.start(function(){
            detectAndClickControls();
        });
        adThread.waitFor();
    }
}
// TODO 阻塞广告检测
function startBlockingAdDetection(){
    if(adThread){
        console.log("ad thread already start")
    }else{
        adThread=threads.start(function(){
            detectAndClickControls();
        });
        adThread.waitFor();
        console.log("使用interupt")
        adThread.interrupt()
        console.log("广告监测线程是否存活"+isAdDetctionThraedAlive())
        adThread=null
    }
}
function startBlockingDurationAdDetection(duration){
    if(adThread){
        console.log("ad thread already start")
    }else{
        adThread=threads.start(function(){
            detectAndClickControls();
        });
        adThread.waitFor();
        sleep(duration) 
        console.log("广告监测线程是否存活"+isAdDetctionThraedAlive())
        adThread=null
    }
}
// 这个方法有奇怪的报错
function startBlockingAdDetectionRound(round){
    if(adThread){
        console.log("ad thread already start")
    }else{
        adThread=threads.start(function(){
            detectAndClickControlsByRounds(round);
        });
        adThread.waitFor();
        console.log("before join "+formatDate())
        try{
            adThread.join() 
        }catch(e){
            console.log("too long for executing"+formatDate())
        }
        console.log("after join"+formatDate())
        adThread=null
    }
}
// 这个方法有奇怪的报错
function startBlockingAdDetectionRoundWith(round,fn){
    if(adThread){
        console.log("ad thread already start")
    }else{
        adThread=threads.start(function(){
            detectAndClickControlsByRoundsWith(round,fn);
        });
        adThread.waitFor();
        console.log("before join "+formatDate())
        try{
            adThread.join() 
        }catch(e){
            console.log("too long for executing"+formatDate())
        }
        console.log("after join"+formatDate())
        adThread=null
    }
}
//暂时只有这个是有效的
function startDurationAdDetection(duration){
    if(adThread){
        console.log("ad thread already start")
    }else{
        adThread=threads.start(function(){
            detectAndClickControls();
        });
        adThread.waitFor(); 
        
        threads.start(function(){
            sleep(duration)
            console.log("使用interupt")
            try{
                adThread.interrupt()
            }catch (e) {
                console.error("子线程发生错误: " + e); 
            }
            
            console.log("使用interupt之后") 
            console.log("广告监测线程是否存活 innner"+isAdDetctionThraedAlive())
            // adThread=null
        }) 
    }
}

function startAdDetectionRound(round){
    if(adThread){
        console.log("ad thread already start")
    }else{
        adThread=threads.start(function(){
            detectAndClickControlsByRounds(round);
        });
        adThread.waitFor();
    }
}

function stopAdDetction(){
    if(adThread){ 
        adThread.interrupt() 
        adThread=null
        console.log("stoped")
    }else{
        console.log("no ad thread running")
    }
    
}

function isAdDetctionThraedAlive(){
    return adThread.isAlive()
}

function isSizeValid(bounds) {
    var width = bounds.width();
    var height = bounds.height();
    return width >= minWidth && width <= maxWidth &&
           height >= minHeight && height <= maxHeight;
}

function isInsideTargetRegion(bounds) {
    return bounds.top >= targetTop && bounds.left >= targetLeft &&
           bounds.bottom <= targetBottom && bounds.right <= targetRight;
}

function clickCenterOfControl(control) {
    var bounds = control.bounds();
    var centerX = bounds.centerX();
    var centerY = bounds.centerY();
    click(centerX, centerY);
    console.log("点击控件的中心点: (" + centerX + ", " + centerY + ")");
}

function detectAndClickControls() {
    while (true) { // 持续检测
        try {
            // 查找所有符合条件的按钮、视图和图片视图
            var buttons = className("android.widget.Button").find();
            var views = className("android.view.View").find();
            var imageViews = className("android.widget.ImageView").find();

            // 合并三个数组
            var controls = buttons.concat(views).concat(imageViews);

            if(controls){
                // console.log("width height:"+screenWidth+"  "+screenHeight)
                // for(var itt of controls){
                //     console.log(itt.bounds())
                // }
                for (var i = 0; i < controls.length; i++) {
                    // console.log(i+" 遍历控件");
                    var control = controls[i];
                    if(!control){ 
                        //好好的控件突然没了
                        continue;
                    }
                    var bounds = control.bounds();
                    //问题就在于上一次点击会导致数组里面的组件发生变化，但似乎问题并不是很大
    
                    // 检查控件是否位于目标区域内
                    if (isInsideTargetRegion(bounds)&&isSizeValid(bounds)) {
                        console.log("检测到目标区域内的控件: " + control.toString());
    
                        // 确认控件仍然存在并且可以点击
                        if (control.clickable()) {
                            // 使用控件的中心点进行点击
                            clickCenterOfControl(control);
                            sleep(1000); // 等待一段时间以确保点击操作完成
                        } else {
                            // console.log("控件不可点击");
                        }
                        // 可选：点击后继续检测或退出循环
                        // break; // 如果只需要点击一次，可以在此处中断循环
                    }
                }
            } else{
                // console.log("无控件识别到了")
            }

            // 短暂休眠以避免过度占用CPU资源
            sleep(1500);
        } catch (e) {
            console.error("子线程发生错误: " + e);
            adThread=null
            exit()
            // 可选：处理异常后可以选择退出循环或继续尝试
            // sleep(1000); // 等待一段时间后重试
        }
    } 
}

function detectAndClickControlsByRounds(round) {
    if(round&&round<0) round=5
    var rr=0
    while (rr++<round) { // 持续检测
        console.log("round #"+rr)
        try {
            // 查找所有符合条件的按钮、视图和图片视图
            var buttons = className("android.widget.Button").find();
            var views = className("android.view.View").find();
            var imageViews = className("android.widget.ImageView").find();

            // 合并三个数组
            var controls = buttons.concat(views).concat(imageViews);

            if(controls){
                // console.log("width height:"+screenWidth+"  "+screenHeight)
                // for(var itt of controls){
                //     console.log(itt.bounds())
                // }
                for (var i = 0; i < controls.length; i++) {
                    // console.log(i+" 遍历控件");
                    var control = controls[i];
                    var bounds = control.bounds();
                    
                    // 检查控件是否位于目标区域内
                    if (isInsideTargetRegion(bounds)
                        // &&isSizeValid(bounds)
                    ) {
                        // console.log(i+" 检测到目标区域内的控件: " + control.toString());
    
                        // 确认控件仍然存在并且可以点击
                        if (control.clickable()) {
                            // 使用控件的中心点进行点击
                            clickCenterOfControl(control);
                            sleep(1000); // 等待一段时间以确保点击操作完成
                        } else {
                            // console.log("控件不可点击");
                        }
                        // 可选：点击后继续检测或退出循环
                        // break; // 如果只需要点击一次，可以在此处中断循环
                    }
                }
            } else{
                // console.log("无控件识别到了")
            }

            // 短暂休眠以避免过度占用CPU资源
            sleep(1500);
        } catch (e) {
            console.error("子线程发生错误: " + e);
            exit()
        }
    }
    // exit() exit会报错
}

function detectAndClickControlsByRoundsWith(round,fn) {
    if(round&&round<0) round=5
    var rr=0
    while (rr++<round) { // 持续检测
        console.log("round #"+rr)
        try {
            // 查找所有符合条件的按钮、视图和图片视图
            var buttons = className("android.widget.Button").find();
            var views = className("android.view.View").find();
            var imageViews = className("android.widget.ImageView").find();

            // 合并三个数组
            var controls = buttons.concat(views).concat(imageViews);

            if(controls){
                // console.log("width height:"+screenWidth+"  "+screenHeight)
                // for(var itt of controls){
                //     console.log(itt.bounds())
                // }
                for (var i = 0; i < controls.length; i++) {
                    // console.log(i+" 遍历控件");
                    var control = controls[i];
                    var bounds = control.bounds();
                    
                    // 检查控件是否位于目标区域内
                    if (isInsideTargetRegion(bounds)
                        // &&isSizeValid(bounds)
                    ) {
                        // console.log(i+" 检测到目标区域内的控件: " + control.toString());
    
                        // 确认控件仍然存在并且可以点击
                        if (control.clickable()) {
                            // 使用控件的中心点进行点击
                            clickCenterOfControl(control);
                            sleep(1000); // 等待一段时间以确保点击操作完成
                        } else {
                            // console.log("控件不可点击");
                        }
                        // 可选：点击后继续检测或退出循环
                        // break; // 如果只需要点击一次，可以在此处中断循环
                    }
                }
            } else{
                // console.log("无控件识别到了")
            }

            // console.log("start fn","fn_start")
            fn()
            // console.log("end fn","fn_end")
            // 短暂休眠以避免过度占用CPU资源
            sleep(1500);
        } catch (e) {
            console.error("子线程发生错误: " + e);
            exit()
        }
    }
    // exit() exit会报错
}


//初始化 检查分辨率，检查初始

/** 日期 */

function formatDate(now) {
    // toast(now)
    if (!now) {
        now = new Date()
    }
    var year = now.getFullYear();
    var month = now.getMonth() + 1;
    var date = now.getDate();
    var hour = now.getHours();
    var minute = now.getMinutes();
    var second = now.getSeconds();
    var res = year + "_" + month + "_" + date + "_" + hour + "_" + minute + "_" + second
    // console.log("from formatDate zutils "+res)
    return res;
}
 
function create2PointGenerator(rectWidth, rectHeight, distance,addX,addY) {
    if(!addX) addX=0
    if(!addY) addY=0
    return function generate() {
        // 确定可用方向
        const validDirections = [];
        if (rectWidth > distance) validDirections.push('horizontal');
        if (rectHeight > distance) validDirections.push('vertical');

        // 检查是否存在有效方向
        if (validDirections.length === 0) {
            throw new Error(`距离 ${distance} 超过矩形最大允许值`);
        }

        // 随机选择可用方向
        const direction = validDirections[Math.floor(Math.random() * validDirections.length)];
        
        let p1, p2;
        
        if (direction === 'horizontal') {
            // 水平方向：X坐标需要预留distance空间
            var x = Math.floor(Math.random() * (rectWidth - distance));
            var y = Math.floor(Math.random() * rectHeight);
            p1 = { x:x+addX, y:y+addY };
            p2 = { x: x + addX+distance, y:y+addY };
        } else {
            // 垂直方向：Y坐标需要预留distance空间
            var x = Math.floor(Math.random() * rectWidth);
            var y = Math.floor(Math.random() * (rectHeight - distance));
            p1 = { x:x+addX, y:y+addY };
            p2 = { x:x+addX, y:y+addY+distance };
        }

        return [p1, p2];
    };
}
//  /**
//  * 返回屏幕水平像素
//  */
// function getWidthPixels (){
//     let dm = context.getResources().getDisplayMetrics();
//     let wm = context.getSystemService(context.WINDOW_SERVICE);
//     wm.getDefaultDisplay().getRealMetrics(dm);
//     return dm.widthPixels
// }

// /**
//  * 返回屏幕纵向像素
//  */
// function getHeightPixels () {
//     let dm = context.getResources().getDisplayMetrics();
//     let wm = context.getSystemService(context.WINDOW_SERVICE);
//     wm.getDefaultDisplay().getRealMetrics(dm);
//     return dm.heightPixels
// }
// function easyRequestScreenCapture(){ 
//     const width = getWidthPixels(); // 获取当前方向下的宽度(px)
//     const height = getHeightPixels(); // 获取当前方向下的宽度(px)
//     const rotation = activity.getWindowManager().getDefaultDisplay().getRotation(); // 获取旋转角度
//     return rotation == 0 ? width < height: width > height 
// }
function s(arr, prefix) {
    arr.forEach(function(i) {
        // 参数解析（兼容ES5）
        var p, d, iv;
        // sleep(60000)
        if (typeof i === 'string') {
            p = i;
            d = 5000;
        } else if (Array.isArray(i)) {
            p = i[0];
            d = i[1] || 5000;
            iv = i[2];
        } else {
            p = i.p || i.path;
            d = i.d || i.delay || 5000;
            iv = i.i || i.interval;
        }

        // 前置等待
        if (iv) sleep(iv);

        // 执行操作
        if (p === "c") {
            screenCentralClick(d);
        } else if (p === "lc") {
            landScapeCentralClick(d);
        } else {
            var finalPath = prefix ? prefix+p :p; // 根据getPath参数决定是否转换路径
            clickTargetPicCentralFromPath(finalPath, d);
        }
    });
}
/* 使用示例 */
// s([
//     "play.png",           // 纯路径（使用默认5秒超时）
//     ["bag_1.png", 3e3],  // 数组简写（3秒超时）
//     ["reveal.png", , 1e3], // 空位占位符（默认超时+1秒间隔）
//     {p: "exe_1.png", i:500} // 对象简写
// ]);


module.exports = {
    getDate: function getDate() {
        return formatDate(new Date())
    },
    dirctions: {
        up: 1,
        down: 1,
        left: 1,
        right: 1
    },
    clickTargetPicCentral,
    clickTargetPicCentralFromPath,
    clickColorfulTargetPicCentralFromPath,
    swipeTargetPicLeft,
    swipeTargetPicLeftFromPath,
    PointInBackground,
    clickAllPicsCentral,
    clickAllPicsCentralFromPath,
    clickTargetPicLeftTop,
    clickTargetPicLeftTopFromPath,
    clickColorfulTargetPicLeftTop,
    clickColorfulTargetPicLeftTopFromPath,
    screenCentralClick, 
    clickFromPath, 
    startDurationAdDetection,
    startAdDetection,
    stopAdDetction,
    startAdDetectionRound,
    isAdDetctionThraedAlive,
    startBlockingAdDetectionRound,
    startBlockingAdDetectionRoundWith,
    repeatFunction,
    countDownRepeat,
    startBlockingDurationAdDetection,
    findSinglePicFromPathTo,
    findSingleColorfulPicFromPathTo,
    findSinglePicTo,
    findSingleColorfulPicTo,
    startBlockingAdDetection,
    // easyRequestScreenCapture,
    s,
    create2PointGenerator
};