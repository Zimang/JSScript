"auto"
//mode
// 1.直连模拟器调试模式
// 2.打包进入apk,auto.js点击执行模式,相对路径
// 3.打包进入apk,auto.js点击执行模式,绝对路径，assests文件夹
// 4.打包进入apk,auto.js点击执行模式,相对路径，sample文件夹
// 5.直连模拟器调试模式,绝对路径，Pictures文件夹
var mode=1;
function getPath(p){
    switch(mode){
        case 5:
            return "/mnt/shared/Pictures/"+p
        case 4:
            return "/data/user/0/org.autojs.autoxjs/files/sample/"+p
        case 3:
            return "./"+p
        case 2:
            return "./assests/"+p //将临时的脚本使用的图片复制到assets文件夹后，使用图片请用mode 2
        case 1:
        default:
            return "/mnt/shared/Pictures/Screenshots/"+p
    }
}
function getPathWithNum(p,num){
    if(!num){
        return getPath(p)
    }
    mode=num
    return getPath(p)
}
function clog(msg){
    console.log(msg)
}
// // // //临时脚本配置
// var Utils=require(getPathWithNum("utils",4))
// var zutils=require(getPathWithNum("customUtils",5))
// // var zutils=require("./../customUtils") //引索
// var utils = new Utils()
// mode=1

// 打包脚本配置
var Utils=require(getPathWithNum("utils",3))
var zutils=require(getPathWithNum("customUtils",3))
// var zutils=require("./../customUtils") //引索
var utils = new Utils()
mode=2

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

if (!requestScreenCapture()) {
    toast("请求截图失败");
    exit();
}

var centerX = device.width / 2;
var centerY = device.height / 2;
 
// var radius = rad; //200
var radius = 200; //200
 
var points = 20; 
var gesturePoints = [];
for (var i = 0; i <= points; i++) {
    var angle = (i / points) * 2 * Math.PI; // 计算角度
    var x = centerX + radius * Math.cos(angle); // 计算 x 坐标
    var y = centerY + radius * Math.sin(angle); // 计算 y 坐标
    gesturePoints.push([x, y]); 
}
var reversedGesturePoints = [];
for (var i = gesturePoints.length - 1; i >= 0; i--) {
    reversedGesturePoints.push(gesturePoints[i]);
}

// function drawCircle(rad,round){// 获取屏幕的宽度和高度 
//     var centerX = device.width / 2;
//     var centerY = device.height / 2;
     
//     var radius = rad;
     
//     var points = 50; 
//     var gesturePoints = [];
//     for (var i = 0; i <= points; i++) {
//         var angle = (i / points) * 2 * Math.PI; // 计算角度
//         var x = centerX + radius * Math.cos(angle); // 计算 x 坐标
//         var y = centerY + radius * Math.sin(angle); // 计算 y 坐标
//         gesturePoints.push([x, y]); 
//     }

//     zutils.repeatFunction(()=>{  
//         gesture(1000, gesturePoints);
//         clog("转圈圈一次")
//     },round)
// }
function drawCircleAndKillYourSelf(){// 获取屏幕的宽度和高度 
 
    var reversedGesturePoints = [];
    for (var i = gesturePoints.length - 1; i >= 0; i--) {
        reversedGesturePoints.push(gesturePoints[i]);
    } 
    zutils.repeatFunction(()=>{  
        gesture(1000, gesturePoints);
        clog("转圈圈一次")
    },10)
    clog("正转")
    zutils.repeatFunction(()=>{  
        gesture(1000, reversedGesturePoints);
        clog("转圈圈一次")
    },1)
    clog("反转-自杀")
}
var gt=false
var nn=false
function dismissButt(){
    
    // var delay=200;
    // // var path=[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4]
    // var path=[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4]
    // var current = className("android.widget.FrameLayout").findOne();
    // if(!current){
    //     clog("路径无效")
    //     if(delay){
    //         sleep(delay)
    //     }
    //     return;
    // }
    // for (var i = 0; i < path.length; i++) { 
    //     clog(current)
    //     // clog("路径方号#"+i)
    //     if(current.childCount()<path[i]){
    //         clog("路径无效")
    //         if(delay){
    //             sleep(delay)
    //         }
    //         return;
    //     }
    //     clog("d "+path[i])
    //     current = current.child(path[i]);
    //     clog("dd"+path[i])
    // }
    // current.click();
    // if(delay){
    //     sleep(delay)
    // }
}
function starPlay(){ 
    if(zutils.clickTargetPicCentralFromPath(getPath("start.png"),100)
        // &&zutils.clickColorfulTargetPicCentralFromPath(getPath("skull_1.png"),500)
    ){  
        //必定是游戏画面
        // drawCircle(200,20) 
        drawCircleAndKillYourSelf()
    }
    zutils.startBlockingAdDetectionRound(6)  
     
    if(zutils.clickTargetPicCentralFromPath(getPath("exit_1.png"),100)){
        clog("结束了一把游戏") 
        sleep(1000)
        return
    } 
    if(!nn){
        if(zutils.clickTargetPicCentralFromPath(getPath("not_now.png"),100)){
            clog("nn")
            nn=true
        }
    }
    if(!gt){
        if(zutils.clickTargetPicCentralFromPath(getPath("gt.png"),100)){
            clog("gt");
            gt=true
        }
    }
    zutils.clickTargetPicCentralFromPath(getPath("ad_1.png"),100)
    zutils.startBlockingAdDetectionRoundWith(4,dismissButt)  
}

function main(){
    
    // // warmup play
    console.log("start")
    app.launch("io.voodoo.paper2")
    sleep(5000) 
    
    const endTimeMillis = Date.now() + getRandomInt(3 * 60 * 1000, 5 * 60 * 1000);
    const intervalRange = { min: 1000, max: 3000 };
    // 循环执行，直到当前时间超过结束时间
    while (Date.now() < endTimeMillis) { 
        starPlay()
        const sleepTime = getRandomInt(intervalRange.min, intervalRange.max);
        sleep(sleepTime);
    } 
    // dismissButt()
    
    // zutils.clickTargetPicCentralFromPath(getPath("ad_1.png"),100)
}
runtime.getImages().initOpenCvIfNeeded();
main()