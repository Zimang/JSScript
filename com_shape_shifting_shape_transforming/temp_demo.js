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
let proj="com_shape_shifting_shape_transforming"
let projP="com.shape.shifting.shape.transforming.autojs"
let projR="com.shape.shifting.shape.transforming"
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
    click(centerX,centerY)
    sleep(100) 
}
//to the right
function threeButtom(centerX,centerY,w,h){
    let ran=getRandomInt(1,3)
    if(ran==1){
        click(TAP.x*0.5, centerY)
    }else if(ran==2){
        click(TAP.x, centerY)
    }else if(ran==3){
        click(TAP.x*1.5, centerY)
    } 
    sleep(1500)
}
function testClick(centerX,centerY,w,h){
    clog("直升飞机")
    click(centerX,centerY)
    sleep(100) 
    click(centerX,centerY)
    sleep(100) 
}
function dddclickCenter(centerX,centerY,w,h){
    click(centerX,centerY)
    sleep(100) 
    click(centerX,centerY)
}
//为了点击开始
function ddclickCeiling(centerX,centerY,w,h){
    click(centerX,centerY+100)
    sleep(100) 
}
function ddclickCeilingLong(centerX,centerY,w,h){
    click(centerX,centerY+200)
    sleep(100) 
}
function ddclickCeil(centerX,centerY,w,h){
    click(centerX,centerY-60)
    sleep(100) 
}
 
function ddclickRight(centerX,centerY,w,h){
    click(centerX+100,centerY)
    sleep(100) 
}
 
function no_action(x,y,w,h){
 
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
/**
 * 可以找到的的图片
 * 3_1,3_2
 */
let thanksGetButtom=new zutils.CachedBT(
    "cut_3_1.png",getPath("")
) 
let noThanksGetButtom=new zutils.CachedBT(
    "cut_9_1.png",getPath("")
) 
let levelButtom=new zutils.CachedBT(
    "cut_1_2.png",getPath("")
) 
let vanceButtom=new zutils.CachedBT(
    "cut_11 - 副本.png",getPath("")
) 

let moneyAdButtom=new zutils.CachedBT(
    "cut_3_2.png",getPath("")
) 
// yellow man
let tapButtom=new zutils.CachedBT(
    "cut_2_1.png",getPath("")
) 

let exitButtom=new zutils.CachedBT(
    "cut_4_2.png",getPath("")
) 

let flyButtom=new zutils.CachedBT(
    "cut_12 - 副本 (3).png",getPath("")
) 
let flyButtom2=new zutils.CachedBT(
    "cut_14_7.png",getPath("")
) 
let hand1=new zutils.CachedBT(
    "cut_10 - 副本.png",getPath("")
) 
let hand2=new zutils.CachedBT(
    "cut_12 - 副本.png",getPath("")
) 
let tankButtom=new zutils.CachedBT(
    "cut_7_1.png",getPath("")
) 
let replayButtom=new zutils.CachedBT(
    "cut_8_1.png",getPath("")
) 
let startSign=new zutils.CachedBT(
    "cut_6_1.png",getPath("")
) 
let center=new zutils.CachedBT(
    "cut_13 - 副本 (3).png",getPath("")
) 
let run=new zutils.CachedBT(
    "cut_13 - 副本 (3) - 副本.png",getPath(""),"001x人"
) 
let left=new zutils.CachedBT(
    "cut_13 - 副本 (2).png",getPath(""),"001x车"
) 
let right=new zutils.CachedBT(
    "cut_13 - 副本.png",getPath(""),"001x船"
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
}
function shift(){ 
    // swipe(TAP.x,TAP.y,TAP.x,TAP.y-400,200) 
    // gesture(1000,[TAP.x,TAP.y],[TAP.x,TAP.y-500])  
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
    adapt()
    // zutils.screenCentralClick(0)
    // sleep(200)
    // tapButtom.existApply(ddclickCenter)
    // sleep(10000)
    // startSign.existApply(ddclickCeiling)
    // sleep(500)
    // levelButtom.existApply(ddclickCeiling)
    // sleep(500)
    // vanceButtom.existApply(ddclickCeilingLong)
    // sleep(500)
    exitButtom.existApply(ddclickCenter)
    

    if(startSign.existApply(ddclickCeiling)
        ||levelButtom.existApply(ddclickCeiling)
        ||vanceButtom.existApply(ddclickCeilingLong) ){


        if(!levelButtom.existApply(no_action,false)){
            zutils.enableDPICache(false)
        }
        
        clog("round")
        var flag=false 
        while(!thanksGetButtom.existApply(dddclickCenter)
        &&!moneyAdButtom.existApply(ddclickCeilingLong)){


            run.existApply(threeButtom) 
            left.existApply(threeButtom) 
            right.existApply(threeButtom) 
            flyButtom2.existApply(threeButtom) 
 
 
            clog(run)
            clog(left)
            clog(right)
 
            clog("playing")
            // hand1.existApply(ddclickCenter)
            // hand2.existApply(ddclickCenter)
            if(replayButtom.existApply(ddclickCenter)){
                flag=true
                
                clog("replaying exit")
                break
            }
            if(noThanksGetButtom.existApply(ddclickCenter)){
                break
            } 
        }
        if(flag){
            flag=false
            while(!exitButtom.existApply(ddclickCenter)){
                clog("replaying round")
                sleep(1000) //广告
            } 
        }

    }

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

function adapt(){
    // if(levelButtom.locate()){
    //     clog(zutils.getCachedInfo())
    //     zutils.enableDPICache(true)
    // }

    //测试
    // zutils.enableDPICache(true,[1,1])
    zutils.autoCachedBT(true)
}

function singleTest(){
    // app.launch(projR) 
    //广告
    //afollow的用法
    // zutils.afollow([
    //     ["t","Continue",0],  
    //     ["i","com.mbit.callerid.dailer.spamcallblocker:id/btnContinue",0,1500],
    //     ["i","com.mbit.callerid.dailer.spamcallblocker:id/btnAllowSync",0,1500],
    //     ["t","Next",1000,1000],  
    // ])
    adapt()
    moneyAdButtom.existApply(ddclickCeilingLong)
    // hand1.existApply(ddclickCenter)
    // zutils.screenCentralClick(0)
    // sleep(200)
    // tapButtom.existApply(ddclickCenter)
    // sleep(10000) 

    //follow的用法
    // zutils.follow([
    //     // ["cut_1_1.png",500],
    //     ()=>{
    //         clog("hha")
    //         return true;
    //     },
    // ],getPath(""),dclickCenter)

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
function main(){
    console.log("start")
    
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
endJs()