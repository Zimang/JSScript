importClass(org.opencv.imgproc.Imgproc);
importClass(org.opencv.core.Core);
importClass(org.opencv.core.Rect);
importClass(org.opencv.core.Mat);
importClass(org.opencv.core.Point);
importClass(org.opencv.core.Size);
importClass(org.opencv.core.CvType);
importClass(org.opencv.core.Scalar);
importClass(org.opencv.imgcodecs.Imgcodecs);


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
    if (img == null || template == null) {
        throw new Error('ParamError');
    }
    options = MatchOptions.check(options);
    console.log('参数：', options);

    let largeMat = img.mat;
    let templateMat = template.mat;
    let largeGrayMat;
    let templateGrayMat;
    console.log("temp ", templateMat,"lar ",largeMat);
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
    console.log("tempG ", templateGrayMat,"larG ",largeGrayMat);
    // =================================================
    let finalMatches = [];
    for (let factor of options.scaleFactors) {
        let [fx, fy] = factor;
        let resizedTemplate = new Mat();
        
        console.log("templateGrayMat || templateMat ",templateGrayMat || templateMat);
        Imgproc.resize(templateGrayMat || templateMat, resizedTemplate, new Size(), fx, fy, Imgproc.INTER_LINEAR);
        // 执行模板匹配，标准化相关性系数匹配法
        let matchMat = new Mat();
        Imgproc.matchTemplate(largeGrayMat || largeMat, resizedTemplate, matchMat, Imgproc.TM_CCOEFF_NORMED);
        let currentMatches = _getAllMatch(matchMat, resizedTemplate, options.threshold, factor, options.region);
        console.log('缩放比：', factor, '可疑目标数：', currentMatches.length);
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

    const saveName = '/sdcard/Download/temp_'+getDate()+'.jpg';
    let img2 = images.matToImage(srcMat);
    images.save(img2, saveName);
    app.viewFile(saveName);
    img2.recycle();
}


function formatDate(now) {
    // toast(now)
    var year = now.getFullYear();
    var month = now.getMonth() + 1;
    var date = now.getDate();
    var hour = now.getHours();
    var minute = now.getMinutes();
    var second = now.getSeconds();
    var res=year + "_" + month + "_" + date + "_" + hour + "_" + minute + "_" + second
    console.log("from formatDate "+res)
    return res;
}
 

function getDate() {
   return formatDate(new Date())
}
 

function Utils() {
//    traverse 多多少少有点问题
//    var classNameSet = new Set(); // 用于存储已经打印过的className，避免重复打印
//    this.traverseViews=function traverseViews(view){
//        if (view) {
//            var className = view.className();
//            var bounds = view.bounds();
//
//            if (!this.classNameSet.has(className)) {
//              console.log(className, bounds);
//              this.classNameSet.add(className);
//            }
//
//            // 如果控件是容器类型，则继续遍历其子控件
//            if (view.childCount() > 0) {
//              for (var i = 0; i < view.childCount(); i++) {
//                var childView = view.child(i);
//                traverseViews(childView);
//              }
//            }
//        }
//    }
//    this.traverseAllViews=function _traverseAllViews(){
//        this.traverseViews(className("android.widget.FrameLayout").findOne());
//        this.classNameSet=new Set()
//    }

 

    this.matchTemplate=function _matchTemplate(img, template, options){
        return matchTemplate(img, template, options)
    }
    this.showMatchRectangle=function _showMatchRectangle(matches, srcMat, templateMat) {
        return showMatchRectangle(matches, srcMat, templateMat) 
    } 
    this.isOverlapping=function _isOverlapping(matches, newMatch){
        return isOverlapping(matches, newMatch)
    }
    // this.u_getAllMatch(tmResult, templateMat, threshold, factor, rect)=function __getAllMatch(tmResult, templateMat, threshold, factor, rect) {
    //     return _getAllMatch(tmResult, templateMat, threshold, factor, rect) 
    // }
    this.buildRegion=function _buildRegion(region, img) {
        return buildRegion(region, img) 
    }




    this.click = function (x, y) {
        return click(x, y)
    };

    this.clickRand = function (x, y, d) {
        return click(getRandInt(x, x + d), getRandInt(y, y + d))
    };

    this.clickCenter = function (widget) {
        if (!widget)
            return false;
        let rect = widget.bounds();
        return click(rect.centerX(), rect.centerY());
    };

    this.swipe = function (x1, y1, x2, y2, duration) {
        swipe(x1, y1, x2, y2, duration);
    };
    this.swipeRand = function (x1, y1, x2, y2, d, duration) {
        swipe(this.getRndInteger(x1 - d, x1 + d), this.getRndInteger(y1 - d, y1 + d), this.getRndInteger(x2 - d, x2 + d), this.getRndInteger(y2 - d, y2 + d), this.getRndInteger(800, 1000));
    };
    this.sleep = (second) => {
        sleep(second * 1000);
    };
    this.getRndInteger = function (min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };
    this.waitText = function (str, overtime) {
        var itemSleep = 500
        for (i = 0; i < 999; i++) {
            if (i * itemSleep > overtime) {
                return false
            }
            var obj = text(str).findOnce()
            log(obj)
            if (obj) {
                return true
            }
            sleep(itemSleep)
        }

        return false
    };

    this.waitImage = function (template, overtime) {
        var itemSleep = 500
        if(!files.exists(template)){
            return false
        }
        var temp = images.read(template)
        for (i = 0; i < 999; i++) {
            if (i * itemSleep > overtime) {
                return false
            }
            var img = captureScreen();
            images.saveImage(img, "/sdcard/1.jpg", "jpg");
            var bg = images.read("/sdcard/1.jpg")
            var point = matchTemplate(bg, temp, {
                threshold: 0.9,
                grayTransform: true,
                scaleFactors: [1, 0.9, 1.1, 0.8, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 1.9, 2.0]
            })
            if (point.length > 0) {
                bg.recycle()
                temp.recycle()
                return true
            }
            bg.recycle()
            sleep(itemSleep)
        }
        bg.recycle()
        temp.recycle()
        return false
    };
    this.waitImages = function (overtime,templates) {
        var itemSleep = 500
        for (i = 0; i < 999; i++) {
            if (i * itemSleep > overtime) {
                return false
            }
            var img = captureScreen();
            images.saveImage(img, "/sdcard/1.jpg", "jpg");
            var bg = images.read("/sdcard/1.jpg")
            for(let template = 0;  template < templates.length; template ++){

                var temp = images.read(templates[template])
                var point = matchTemplate(bg, temp, {
                    threshold: 0.8,
                    grayTransform: true,
                    scaleFactors: [1, 0.9, 1.1, 0.8, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 1.9, 2.0]
                })
                if (point.length > 0) {
                    bg.recycle()
                    temp.recycle()
                    return true
                }
                temp.recycle()
            }
            bg.recycle()
            sleep(itemSleep)
        }
        bg.recycle()
        temp.recycle()
        return false
    };

    this.getPointsByCapture = function (templates) {
        var img = captureScreen();
        images.saveImage(img, "/sdcard/1.jpg", "jpg");
        var bg = images.read("/sdcard/1.jpg");
        for(var template = 0;  template < templates.length; template ++){
            var temp = images.read(templates[template])
            var points = matchTemplate(bg, temp, {
                threshold: 0.8,
                grayTransform: true,
                scaleFactors: [1, 0.9, 1.1, 0.8, 1.2,1.3,1.4,1.5,1.6,1.7,1.8,2]
            })
            if (points.length>0) {
                bg.recycle()
                temp.recycle()
                log(points)
                return points
            }
            temp.recycle()
        }
        bg.recycle()
        return [];
    };

    this.getPointsByCaptureOptions = function (options,templates) {
        var img = captureScreen();
        images.saveImage(img, "/sdcard/1.jpg", "jpg");
        var bg = images.read("/sdcard/1.jpg");
        for(let template = 0;  template < templates.length; template ++){
            var temp = images.read(templates[template])
            var points = matchTemplate(bg, temp, options)
            if (points.length>0) {
                bg.recycle()
                temp.recycle()
                return points
            }
            temp.recycle()
        }
        bg.recycle()
        return [];
    };
}

module.exports = Utils;