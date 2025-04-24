"auto"

const { s } = require("./customUtils");

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
let proj="games_rivvy_monstersurvivors"
let projP="games.rivvy.monstersurvivors.autojs"
let projR="games.rivvy.monstersurvivors"
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
    sleep(500) 
}
 
function no_action(x,y,w,h){
    sleep(500)
}

function clickScreenCentral(x,y,w,h){
    click(TAP.x,TAP.y)
}
function backExit(x,y,w,h){
    click(TAP.x*0.1,TAP.y*1.98)
}
function up100(x,y,w,h){
    click(x,y-100)
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

var backGroundWork = threads.start(function() {
    while (true) {
        if (auto.service != null) {
            let NotNow = textMatches(/(|NOT NOW)/).findOne(2000);
            if (NotNow) {
                NotNow.click();
                break
            }
        } 
        sleep(10 * 1000);
    }
});
let playButtom1=new zutils.CachedBT(
    "cut_1_1.png",getPath(""),"play buttom"
) 
let backButtom2=new zutils.CachedBT(
    "cut_2_1.png",getPath(""),"back buttom"
) 

let selectButtom2=new zutils.CachedBT(
    "cut_2_2.png",getPath(""),"select buttom"
) 

let how2PlayButtom3=new zutils.CachedBT(
    "cut_3_2.png",getPath(""),"How to play"
) 

let tap2PlayButtom3=new zutils.CachedBT(
    "cut_3_2.png",getPath(""),"tap to start"
) 


let staticsAd4=new zutils.CachedBT(
    "cut_4_centeral_click_1.png",getPath(""),"数据与广告"
) 
//可以找到
let quate4=new zutils.CachedBT(
    "cut_4_centeral_click_2.png",getPath(""),"问号"
) 
let staticsDiomand5=new zutils.CachedBT(
    "cut_5_1.png",getPath(""),"数据与钻石"
) 

let inventory5=new zutils.CachedBT(
    "cut_5_2.png",getPath(""),"inventory"
) 

//可以找到
let shop5=new zutils.CachedBT(
    "cut_5_3.png",getPath(""),"shop"
) 

let gameOver6=new zutils.CachedBT(
    "cut_6_1.png",getPath(""),"Game over"
) 

let homeMenue6=new zutils.CachedBT(
    "cut_6_2.png",getPath(""),"Home Menue"
) 
let mutipleReward6=new zutils.CachedBT(
    "cut_6_3.png",getPath(""),"广告奖励翻倍"
) 

let hero6=new zutils.CachedBT(
    "cut_6_4.png",getPath(""),"hero Balancio"
) 
let unlock7=new zutils.CachedBT(
    "cut_7_1.png",getPath(""),"解锁新功能"
) 
let toContinue7=new zutils.CachedBT(
    "cut_7_2.png",getPath(""),"tap to continue"
) 

let back8=new zutils.CachedBT(
    "cut_8_1.png",getPath(""),"新功能返回"
) 
let quaote8=new zutils.CachedBT(
    "cut_8_2.png",getPath(""),"新功能问号"
) 
//可以找到，点击有响应
let wave10=new zutils.CachedBT(
    "cut_10_2.png",getPath(""),"wave"
) 
let yDie11=new zutils.CachedBT(
    "cut_11_1.png",getPath(""),"死亡"
) 
let renovate11=new zutils.CachedBT(
    "cut_11_2.png",getPath(""),"复活广告 "
) 
let turnDownRenovate11=new zutils.CachedBT(
    "cut_11_3.png",getPath(""),"拒绝复活 "
) 

let select12=new zutils.CachedBT(
    "cut_12_1.png",getPath(""),"技能点升级选择 "
) 
let close12=new zutils.CachedBT(
    "cut_12_2.png",getPath(""),"技能点升级关闭 "
) 
let close15=new zutils.CachedBT(
    "cut_15_1.png",getPath(""),"装备升级关闭 "
) 
let bargin14=new zutils.CachedBT(
    "cut_14 _1.png",getPath(""),"新人付费礼包 "
) 
let arm8=new zutils.CachedBT(
    "cut_8_4.png",getPath(""),"手臂 "
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
    toContinue7.existApply(ddclickCenter)
    quaote8.existApply(backExit)
    arm8.existApply(backExit)
    bargin14.existApply(up100)
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
    // shop5.existApply(no_action)
    // wave10.existApply(ddclickCenter)
    // homeMenue6.existApply(ddclickCenter)
    if(playButtom1.existApply(ddclickCenter)){
        sleep(1000) 
        if(selectButtom2.existApply(ddclickCenter)){
    // // // homeMenue6.existApply(ddclickCenter)
    // // // toContinue7.existApply(ddclickCenter)
    // // // quaote8.existApply(backExit)
    // // // bargin14.existApply(up100)

            while(!homeMenue6.existApply(ddclickCenter)){
                clog("检查返回桌面")
                wave10.existApply(ddclickCenter)
                while(!shop5.existApply(no_action)&&
                !homeMenue6.existApply(no_action)){
                    clog("检查返回桌面以及商店")
                    clog("点击中心")
                    zutils.s([
                        "c",
                        "c",
                    ],getPath(""))  
                    select12.existApply(ddclickCenter)
                    close15.existApply(ddclickCenter) 
                    sleep(500)
                    // close12.existApply(ddclickCenter)
                }
                clog("点击wave")
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
 
    zutils.autoCachedBT(true)
}


function singleTest(){
    arm8.existApply(no_action)
    // app.launch(projR) 
    //广告
    //afollow的用法
    // zutils.afollow([
    //     ["t","Continue",0],  
    //     ["i","com.mbit.callerid.dailer.spamcallblocker:id/btnContinue",0,1500],
    //     ["i","com.mbit.callerid.dailer.spamcallblocker:id/btnAllowSync",0,1500],
    //     ["t","Next",1000,1000],  
    // ])

    // adapt()
    // toContinue7.existApply(ddclickCenter)
    // quaote8.existApply(backExit)

    // wave10.existApply(ddclickCenter)
    // homeMenue6.existApply(ddclickCenter)
 
    
    // selectButtom2.existApply(ddclickCenter)

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