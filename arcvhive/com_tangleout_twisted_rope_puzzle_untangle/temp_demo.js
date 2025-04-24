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
let proj="com_tangleout_twisted_rope_puzzle_untangle"
let projP="com.tangleout.twisted.rope.puzzle.untangle.autojs"
let projR="com.tangleout.twisted.rope.puzzle.untangle"
function getPath(p){
    switch(mode){
        case 5:
            return "/mnt/shared/Pictures/"+p
        case 7:
            // /storage/emulated/0/脚本/com_slowmo_twinvolley/com_slowmo_twinvolley
            return "/storage/emulated/0/脚本/"+proj+"/"+proj+"/"+p
        case 8:
            return "/storage/emulated/0/脚本/"+proj+"/"+proj+"/assests/"+p
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
function dclickCenter(x,y,w,h){
    click(x+(w/2),y+(h/2))
    sleep(100) 
}
function ddclickCenter(centerX,centerY,w,h){
    click(centerX,centerY)
    sleep(100) 
}
  
 
function no_action(x,y,w,h){
 
}
function agree(x,y,w,h){
    click(TAP.x*1.9,y+20)
} 
function sissor(x,y,w,h){
    click(x-TAP.x*0.3,y+20)
}

function right2Left(){ 
    // swipe(TAP.x,TAP.y,TAP.x,TAP.y-400,200) 
    gesture(1000,[TAP.x,TAP.y],[0,TAP.y])  
    sleep(500)
    return true
    // press(TAP.x*0.75,TAP.y*1.5,1000)  
}

// // //临时脚本配置 雷电
// // var Utils=require(getPathWithNum("utils",6))
// var zutils=require(getPathWithNum("customUtils",5))
// // var zutils=require("./customUtils") 引索
// // var utils = new Utils()
// mode=1

// // //临时脚本配置 蓝叠
// // var Utils=require(getPathWithNum("utils",6))
// var zutils=require(getPathWithNum("customUtils",7))
// // var zutils=require("./customUtils") 引索
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
let c_1="XXX自定义"
//竖版
let TAP={x:device.width/2,y: device.height/ 2}
//横板
// let TAP={y:device.width/2,x: device.height/ 2}
// let bt_1=new zutils.CachedBT(
//     "cut_1_1.png",getPath("")
// ) 

let test=new zutils.CachedBT(
    "cut_1_1.png",getPath(""),"buttom 1"
) 
let level5=new zutils.CachedBT(
    "cut_6_1.png",getPath(""),"buttom 1"
) 

let re1=new zutils.CachedBT(
    "cut_6_2.png",getPath(""),"buttom 1"
) 

let re2=new zutils.CachedBT(
    "cut_7_1.png",getPath(""),"buttom 1"
) 

var isGuid=true
function grant(){
    // zutils.ids([
    //     [pg_1,100],
    //     [pg_2,50], 
    // ])
}
function guid(){
    grant()
    
    zutils.afollow([["t","Continue",0], ]) 
    if(mo.existApply(genZeroPointCol)){
        drag(zeroP.getP(3,3),zeroP.getP(1,1))

        while(!get30.existApply(ddclickCenter) ){
    
        }
        sleep(2000)
 
        while(!get30.existApply(ddclickCenter) ){ 
            sleep(1000)
            clog("第二关")
            if(prePlaySign.existApply(no_action)){
                drag(zeroP.getP(2,1),zeroP.getP(0,3))
                sleep(500)
                drag(zeroP.getP(1,2),zeroP.getP(3,4))
            } 
        }
        sleep(10000)
 
        while(!get30.existApply(ddclickCenter) ){  
            
            sleep(1000)
            clog("第三关")
            if(v8.existApply(no_action)){
                drag(zeroP.getP(1,1),zeroP.getP(3,0))
                sleep(500)
                drag(zeroP.getP(2,1),zeroP.getP(0,3))
                sleep(500)
                drag(zeroP.getP(3,2),zeroP.getP(0,0)) 
            }
        } 
        sleep(10000)

        while(!get15.existApply(ddclickCenter) ){  

            claim.existApply(ddclickCenter)
            sleep(1500)
            v8.existApply(sissor) 
            sleep(1500)
            gesture(2000,[TAP.x,TAP.y*0.8],[TAP.x,TAP.y*1.8])
            sleep(1000) 
            clog("第四关")
            if(v8.existApply(no_action)){
                drag(zeroP.getP(0,2),zeroP.getP(1,1))
                sleep(500)
                drag(zeroP.getP(0,1),zeroP.getP(2,2))
                sleep(500) 
            } 
        }
        sleep(1500)
    }
    
}
function shift(){ 
    // swipe(TAP.x,TAP.y,TAP.x,TAP.y-400,200) 
    gesture(1000,[TAP.x,TAP.y],[TAP.x,TAP.y-500])  
    // press(TAP.x*0.75,TAP.y*1.5,1000)  
}

// 检查当前页面结构是否满足游戏界面
// function checkADTime(){
//     sleep(500)
//     let comp = idMatches(/.*content$/).findOne(1000);
//     clog("检查是否为广告"+comp.childCount())

//     if(comp){
//         var count1=0
//         var count2=0
//         var count3=0
//         for(var i=0;i<comp.childCount();i++){
//             // clog(comp.child(i)) 
//             // clog(comp.child(i).id())
//             clog(comp.child(i).className())  
//             let cn=comp.child(i).className()
//             if(cn=="android.widget.RelativeLayout"){
//                 count1++
//             }else if(cn=="android.widget.FrameLayout"){
//                 count2++
//             } 
//             clog("###############################")
//         }
//         return count1===1&&count2===2
//     }
//     return false
// }

// 定义三个无副作用的逻辑函数
function logic1() { 

}

function logic2() { 

}

function logic3() { 
    
}

//对于游戏我们只需要找到一个死循环即可
function singleLoop(){
    if(level5.existApply(no_action)){
        if(zeroP){
            drag(zeroP.getP(1,1),zeroP.getP(0,1))
            sleep(500)
            drag(zeroP.getP(2,1),zeroP.getP(3,1))
            click(TAP.x*1.68,TAP.y*0.15)
            sleep(500)
            re2.existApply(ddclickCenter)
        }
    }
}

function adapt(){ 
 
    zutils.autoCachedBT(true)
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
//后台线程可以做些事情
var backGroundWork = threads.start(function() {
    // while (true) {
    //     if (auto.service != null) {
    //         if(zutils.afollow([
    //                 ["t","ALLOW",0],  
    //         ]) ){
    //             break
    //         }
    //     } 
    //     sleep(10 * 1000);
    // }
});
let zeroP=undefined
function genZeroPointCol(x,y,w,h){
    // // gesture(1000,[TAP.x,y],[TAP.x+100,y])
    // click(TAP.x+100,y)
    // sleep(100)
    const boxWith=w/2
    const boxHight=h/2
    zeroP={
        x:x-boxWith,
        y:y+4*boxHight,
        getP:function(px,py){
            return {
                x:zeroP.x+px*boxWith,
                y:zeroP.y-py*boxHight,
            }
        }
    }
    clog(zeroP)
    clog(boxWith)
    clog(boxHight)
}

function mock(){ 
    const boxWith=182
    const boxHight=183
    zeroP={
        x:266,
        y:1389,
        getP:function(px,py){
            return {
                x:zeroP.x+px*boxWith,
                y:zeroP.y-py*boxHight,
            }
        }
    }
}

function drag(start,end){
    gesture(2000,[start.x,start.y],[end.x,end.y])
    sleep(500)
}

function scan(arr){ 
    var img = captureScreen();
    images.saveImage(img, "/sdcard/1.jpg", "jpg");
    var source = images.read("/sdcard/1.jpg");
    
    if(zeroP){
        arr.forEach(function(i){
            var p=zeroP.getP(i.x,i.y)
            var color = images.pixel(source, p.x, p.y);
            clog("坐标:("+p.x+","+p.y+") 是否空 "+isColorInRange(color))
        });
    }
    source.recycle()
}

function generateGrid(width, height) {
    let coords = [];
    for (let x = 0; x < width; x++) {
        for (let y = 0; y < height; y++) {
            coords.push({x: x, y: y});
        }
    }
    return coords;
}

let get30=new zutils.CachedBT(
    "cut_2_1.png",getPath(""),"mo"
) 
let get15=new zutils.CachedBT(
    "cut_5_1.png",getPath(""),"mo"
) 
let mo=new zutils.CachedBT(
    "cut_1_1.png",getPath(""),"mo"
) 
let playSign=new zutils.CachedBT(
    "cut_4_2.png",getPath(""),"mo"
) 
let prePlaySign=new zutils.CachedBT(
    "cut_1_2.png",getPath(""),"mo"
) 

let claim=new zutils.CachedBT(
    "cut_3_1.png",getPath(""),"mo"
) 
let grid = generateGrid(4, 6); 


let v8=new zutils.CachedBT(
    "cut_4_1.png",getPath(""),"mo"
) 
function singleTest(){
    // app.launch(projR) 
    click(TAP.x*1.68,TAP.y*0.15)
    re1.existApply(no_action,false)
    re2.existApply(no_action,false)
    // zutils.afollow([["t","Continue",0], ]) 
    // mock() 
    
    //广告
    //afollow的用法
    // zutils.afollow([
    //     ["t","Continue",0],  
    //     ["i","com.mbit.callerid.dailer.spamcallblocker:id/btnContinue",0,1500],
    //     ["i","com.mbit.callerid.dailer.spamcallblocker:id/btnAllowSync",0,1500],
    //     ["t","Next",1000,1000],  
    // ])

    //follow的用法
    // zutils.follow([
    //     // ["cut_1_1.png",500],
    //     ()=>{
    //         clog("hha")
    //         return true;
    //     },
    // ],getPath(""),dclickCenter)

    // if(!levelButtom.existApply(no_action,false)){
    //     zutils.enableDPICache(false)
    // }

    // zutils.clickFromPath([0, 1, 0, 0, 0, 0, 0, 1, 1])
    // guid()
    // logic1()
    // logic2()
    // logic3() 
}

if (!requestScreenCapture(false)) {
    toast("请求截图失败");
    exit();
}

function rgbToHsv(r, g, b) {
    r /= 255; g /= 255; b /= 255;
    let max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h, s, v = max;
    let d = max - min;
    s = max === 0 ? 0 : d / max;
    if (max === min) {
        h = 0;
    } else {
        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h *= 60;
    }
    return [h, s, v];
}

function isColorInRange(color) {
    let [r, g, b] = [colors.red(color), colors.green(color), colors.blue(color)];
    let [h, s, v] = rgbToHsv(r, g, b);
    return (
        h >= 33.33 && h <= 36.61 &&
        s >= 0.131 && s <= 0.351 &&
        v >= 0.871 && v <= 0.988
    );
}
function main(){
    console.log("start")
    
    adapt()
    // singleTest()
    
    // 记得打包要切换路径
    // 记得很横板要切换截图模式
    // // warmup play
    app.launch(projR)
    sleep(5000)

    const endTimeMillis = Date.now() + getRandomInt(4 * 60 * 1000, 6 * 60 * 1000);
    const intervalRange = { min: 1000, max: 3000 };
    // 循环执行，直到当前时间超过结束时间
    while (Date.now() < endTimeMillis) { 
        guid()
        loopPlay()
        singleLoop()
        const sleepTime = getRandomInt(intervalRange.min, intervalRange.max);
        sleep(sleepTime);
    } 
    console.log("edn")
}
runtime.getImages().initOpenCvIfNeeded();
startJs()
main()
threads.shutDownAll();
endJs()