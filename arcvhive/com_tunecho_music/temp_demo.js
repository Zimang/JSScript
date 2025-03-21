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
// 6.直连模拟器调试模式,绝对路径，Pictures文件夹  v6
var mode=1;
function getPath(p){
    switch(mode){
        case 5:
            return "/mnt/shared/Pictures/"+p
        case 4:
            return "/data/user/0/org.autojs.autoxjs/files/sample/"+p 
        case 6:
            return "/data/user/0/org.autojs.autoxjs.v6/files/sample/"+p 
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
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function clog(msg){
    console.log(msg)
}
// // //临时脚本配置
// var Utils=require(getPathWithNum("utils",6))
// var zutils=require(getPathWithNum("customUtils",5))
// // var zutils=require("./customUtils")
// // var utils = new Utils()
// mode=1

// 打包脚本配置
var Utils=require(getPathWithNum("utils",3))
var zutils=require(getPathWithNum("customUtils",3))
var utils = new Utils()
mode=2

function endJs() {
    files.createWithDirs("/sdcard/mock/autojsend");
}

function startJs() {
    files.createWithDirs("/sdcard/mock/autojsstart");
}


// 定义三个无副作用的逻辑函数
// function logic1() { 

// }

// function logic2() { 

// }

// function logic3() { 
    
// }

function logic1() { 
    // zutils.ts([
    //     ["Playlists",1000],
    //     ["Equalizer",1000],
    //     ["Local",1000],
    // ])
    clog("逻辑1")
    zutils.clickFromPath([0, 1, 0, 0, 0, 0, 0, 1, 1],1000)
    zutils.clickFromPath([0, 1, 0, 0, 0, 0, 0, 1, 2],1000)
    zutils.clickFromPath([0, 1, 0, 0, 0, 0, 0, 1, 0],500)
}

function logic2() { 
    clog("逻辑2")
    let btC="com.tunecho.music:id/btnBack"
    let btS="com.tunecho.music:id/imageViewEnd2"

    zutils.ids([
        [btS,500],
        [btC,500],
    ])
}

function logic3() { 
    clog("逻辑3")
    let btS="com.tunecho.music:id/btnSearch"
    let btC="com.tunecho.music:id/btnCancel"
    zutils.ids([
        [btS,500],
        [btC,500],
    ])
    
}
const logics = [logic1, logic2, logic3]
const randomLogic = () => {
    return logics[Math.floor(Math.random() * logics.length)]
}

var isGuid=true
function guid(){
    //id的API可能存在问题
    var pbutton="com.android.packageinstaller:id/permission_allow_button"
    var bt2="com.tunecho.music:id/btn2"
    var bt3="com.tunecho.music:id/btn3"
    var bt1="com.android.permissioncontroller:id/permission_allow_button"
    var bt0="com.android.permissioncontroller:id/permission_allow_button"
    var btm1="com.tunecho.music:id/btnAllow"
    // id("com.tunecho.music:id/btn2").findOne(500).click()
    // id("com.tunecho.music:id/btn2").findOne(500).click()
    // id("com.tunecho.music:id/btn3").findOne(500).click()
    // id(pbutton).findOne(500).click()
    zutils.ids([
        bt0,
        bt1,
        pbutton,
        btm1,
        bt2,
        bt2,
        bt3,
        pbutton,
    ])
}

function loopPlay(){
    randomLogic()()
}


function singleTest(){ 
    // zutils.clickFromPath([0, 1, 0, 0, 0, 0, 0, 1, 1])
    logic3()
}

if (!requestScreenCapture(true)) {
    toast("请求截图失败");
    exit();
}
function main(){
    // singleTest()
    
    // // warmup play
    console.log("start")
    app.launch("com.tunecho.music")
    sleep(5000)

    const endTimeMillis = Date.now() + getRandomInt(4 * 60 * 1000, 6 * 60 * 1000);
    const intervalRange = { min: 1000, max: 3000 };
    // 循环执行，直到当前时间超过结束时间
    while (Date.now() < endTimeMillis) { 
        guid()
        loopPlay()
        const sleepTime = getRandomInt(intervalRange.min, intervalRange.max);
        // sleep(sleepTime);
    } 
}
runtime.getImages().initOpenCvIfNeeded();
startJs()
main()
endJs()