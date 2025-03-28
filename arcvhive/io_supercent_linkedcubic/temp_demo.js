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
// let proj="com.slowmo.twinvolley.autojs"
let proj="com_slowmo_twinvolley"
function getPath(p){
    switch(mode){
        case 5:
            return "/mnt/shared/Pictures/"+p
        case 7:
            return "/sdcard/script_res/"+proj+"/"+p
        case 8:
            return "/sdcard/script_res/"+proj+"/assests/"+p
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
// // //临时脚本配置 雷电
// // var Utils=require(getPathWithNum("utils",6))
// var zutils=require(getPathWithNum("customUtils",5))
// // var zutils=require("./customUtils") 
// // var utils = new Utils()
// mode=1

// // //临时脚本配置 蓝叠
// // var Utils=require(getPathWithNum("utils",6))
// var zutils=require(getPathWithNum("customUtils",7))
// // var zutils=require("./customUtils") 
// // var utils = new Utils()
// mode=8

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
let pg_1="com.android.permissioncontroller:id/permission_allow_button"
let pg_2="com.android.packageinstaller:id/permission_allow_button"

function dclickCenter(x,y,w,h){
    click(x+(w/2),y+(h/2))
    sleep(100)
    click(x+(w/2),y+(h/2))
}
function clickBoxBelow(x,y,w,h){ 
    click(x+(w/2),y+(h/2)+h)
}
var drawer= zutils.drawCircleGen(200,100) 
var isGuid=true
function guid(){
    zutils.ids([
        [pg_1,100],
        [pg_2,100],
    ])
    // zutils.follow([
    //     ["s_1.png",200],
    //     //开始游戏了
    //     ["c",200],
    //     ["s_1.png",200],
    // ],getPath(""),dclickCenter)

    if(zutils.clickTargetPicCentralFromPath(getPath("s_1.png"))){
        while(!zutils.clickTargetPicCentralFromPath(getPath("f_1.png"))&&
        !zutils.clickTargetPicCentralFromPath(getPath("f_2.png"))){
            drawer.drawCircle(3)
        }
        
        zutils.fs([ 
            ["c",200],
            ["t_2.png",1000],
            ["t_1.png",1000]
        ],getPath(""),clickBoxBelow) 
        zutils.follow([  
            ["s_4.png",200],
            ["s_5.png",200],
            ["s_6.png",200],
        ],getPath(""),dclickCenter)
    }
    if(zutils.clickTargetPicCentralFromPath(getPath("s_7.png"))){
        // while(!zutils.clickTargetPicCentralFromPath(getPath("f_1.png"))){
        //     drawer.drawCircle(3)
        // }
        
        zutils.follow([ 
            ["s_8.png",200],
            ["s_9.png",200],
            ["s_11.png",200],
        ],getPath(""),dclickCenter)
    }
}



// 定义三个无副作用的逻辑函数
function logic1() { 
    zutils.follow([ 
        ["L1_1.png",200],
        ["L1_2.png",200],
        ["L1_3.png",200],
    ],getPath(""),dclickCenter)
}

function logic2() { 
    
    zutils.screenCentralClick(200,false) 
    while(!zutils.clickTargetPicCentralFromPath(getPath("f_1.png"))&&
        !zutils.clickTargetPicCentralFromPath(getPath("f_2.png"))){
        drawer.drawCircle(3)
    }
     
    zutils.fs([ 
        ["c",200],
        ["t_2.png",200],
        ["t_1.png",200],
    ],getPath(""),clickBoxBelow) 
}

function logic3() { 
    zutils.follow([ 
        ["L2_1.png",200],
        ["L2_2.png",200],
    ],getPath(""),dclickCenter)
    
}
const logics = [logic1, logic2, logic3]
const randomLogic = () => {
    return logics[Math.floor(Math.random() * logics.length)]
}
function loopPlay(){
    for(var i=0;i<3;i++){  //1:3不快不慢
        randomLogic()()
    } 
}


function singleTest(){ 
    zutils.follow([ 
        ["t_2.png",1000]
    ],getPath(""),clickBoxBelow) 
}
if (!requestScreenCapture()) {
    toast("请求截图失败");
    exit();
}
function main(){
    
    // singleTest()
    
    // // // warmup play
    console.log("start")
    app.launch("io.supercent.linkedcubic")
    sleep(5000)

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