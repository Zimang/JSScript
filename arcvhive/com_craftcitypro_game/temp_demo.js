"auto"

let Thread = threads.start(function () {
    if (auto.service != null) {
        let Allow = textMatches(/(允许|立即开始|统一|START NOW)/).findOne(10 * 1000);
        if (Allow) {
            Allow.click();
        }
    }
});


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
// // //临时脚本配置
// var Utils=require(getPathWithNum("utils",4))
// var zutils=require(getPathWithNum("customUtils",5))
// // var zutils=require("./customUtils") //引索
// var utils = new Utils()
// mode=1

// 打包脚本配置
var Utils=require(getPathWithNum("utils",3))
var zutils=require(getPathWithNum("customUtils",3))
// var zutils=require("./customUtils") //引索
var utils = new Utils()
mode=2

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
//斜版
//转圈圈
var centerX = device.height/ 2;
var centerY = device.width/ 2;
 
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

var isGuid=true
function endJs() {
    files.createWithDirs("/sdcard/mock/autojsend");
}

function startJs() {
    files.createWithDirs("/sdcard/mock/autojsstart");
}

function doubleClick(_x,_y,_w,_h){ 
    var x=_x+(_w/2);
    var y=_y+(_h/2);
    click(x,y) 
    clog("点击一次"+x+" "+y)
    sleep(300) 
    clog("点击一次"+x+" "+y)
    click(x,y)
}

function doubleClick_20(x,y,w,h){ 
    clog("点击一次"+x+" "+y)
    click(x,y)  
    sleep(20)
    clog("点击一次"+x+" "+y)
    click(x,y) 
}


function doubleClick_si(x,y,w,h){ 
    var _x=x+(w/2);
    var _y=y+(h/2);
    clog("点击一次"+_x+" "+_y)

    click(_x,_y)  
    sleep(100) 
    click(_x,_y) 
}

function closeAd(){
    sleep(2000)
    zutils.startBlockingAdDetectionRound(1)
    zutils.fs([
        ["ok_1.png",100],
        // ["close_3.png",100],
        // ["close_1.png",100],
        // ["close_4.png",100],
        // ["close_2.png",100],
        ["back_3.png",100],
        ["back_2.png",100],
    ],getPath(""),doubleClick)

}
//com.craftcitypro.game.auto.js.apk

function drawCircleAndKillYourSelf(){// 获取屏幕的宽度和高度 
    var reversedGesturePoints = [];
    for (var i = gesturePoints.length - 1; i >= 0; i--) {
        reversedGesturePoints.push(gesturePoints[i]);
    } 
    zutils.repeatFunction(()=>{  
        gesture(1000, gesturePoints);
        clog("转圈圈一次")
    // },1)
    },10)
    clog("正转")
    zutils.repeatFunction(()=>{  
        gesture(1000, reversedGesturePoints);
        clog("转圈圈一次")
    // },1)
    },10)
    clog("反转")
}

if (!requestScreenCapture(true)) {
    toast("请求截图失败");
    exit();
}


function loopPlay(){
    
    // closeAd()
    sleep(1000)
    closeAd()
    // }else{
    
    if(zutils.clickTargetPicCentralFromPath(getPath("g_sign_2.png"))){
        clog("退出引导模式")
        isGuid=false
    }else{
        clog("进入引导模式")
        isGuid=true
    }
    drawCircleAndKillYourSelf()

    // }
}
function guid(){
    //进入就可能有广告
    if(isGuid){
        closeAd()
        zutils.fs([
            ["leave_on.png",500],
            ["leave_on_2.png",500],
            ["play_1.png",1000],//
            "ct_4.png",//
            ["ct_5.png",1000],//
            "lc",
        // ],getPath(""),doubleClick)

        // zutils.fs([
            ["ct_5.png",1000],//卡在这
            ["ct_6.png",1000],//卡在这
        // ],getPath(""),doubleClick_20)

        // zutils.fs([
            "lc",
            ["cut_3.png",1000],//
            ["play_2.png",2000],//
            ["play_3.png",1000]
        ],getPath(""),doubleClick)
    }
}

function singleTest(){
    zutils.startBlockingAdDetectionRound(1)
    zutils.fs([
        ["ok_1.png",100],
        ["close_3.png",100],
        ["close_1.png",100],
        ["close_4.png",100],
        ["close_2.png",100],
        ["back_3.png",100],
        ["back_2.png",100],
    ],getPath(""),doubleClick)

}

function main(){
    // singleTest()

    // // // warmup play
    console.log("start")
    app.launch("com.craftcitypro.game")
    sleep(15000)
    const endTimeMillis = Date.now() + getRandomInt(4 * 60 * 1000, 6 * 60 * 1000);
    const intervalRange = { min: 1000, max: 3000 };
    // 循环执行，直到当前时间超过结束时间
    while (Date.now() < endTimeMillis) { 
        guid()
        loopPlay()
        const sleepTime = getRandomInt(intervalRange.min, intervalRange.max);
        sleep(sleepTime);
    } 

}
runtime.getImages().initOpenCvIfNeeded();
startJs()
main()
endJs()