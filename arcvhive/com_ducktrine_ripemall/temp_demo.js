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
let proj="com_ducktrine_ripemall"
let projP="com.ducktrine.ripemall.autojs"
let projR="com.ducktrine.ripemall"
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

function startGame(cx,cy,w,h){ 
    click(cx,cy+400)
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

let coti=new zutils.CachedBT(
    "cut_1_1.png",getPath(""),"继续游戏"
) 
let store=new zutils.CachedBT(
    "cut_2_1.png",getPath(""),"商店"
) 
let head1=new zutils.CachedBT(
    "cut_4_1.png",getPath(""),"引导头颅"
) 
let head2=new zutils.CachedBT(
    "cut_5_1.png",getPath(""),"游戏头颅"
) 
let reTry=new zutils.CachedBT(
    "cut_3_1.png",getPath(""),"重试"
) 
let coti2=new zutils.CachedBT(
    "cut_8_1.png",getPath(""),"重试"
)  
let boobs=new zutils.CachedBT(
    "cut_8_2.png",getPath(""),"重试"
)  
let skiP=new zutils.CachedBT(
    "cut_6_1.png",getPath(""),"重试"
) 
let latter=new zutils.CachedBT(
    "cut_7_1.png",getPath(""),"重试"
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
    latter.existApply(ddclickCenter)
    if(head1.existApply(startGame)){
        click(TAP.x,TAP.y)
        sleep(500)

        while(!reTry.existApply(ddclickCenter)&&!coti.existApply(ddclickCenter)&&!skiP.existApply(ddclickCenter)){
            clog("求索")
            zutils.repeatFunction(attack,3) 
            if(boobs.existApply(no_action)){
                click(TAP.x*0.8,TAP.y)
                sleep(800)
                click(TAP.x*0.8,TAP.y*0.7)
                sleep(1000)
                coti2.existApply(ddclickCenter)
            }
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
    while (true) {
        if (auto.service != null) {
            if(zutils.afollow([
                    ["t","Continue",0],  
            ]) ){
                break
            }
        } 
        sleep(10 * 1000);
    }
});

function attack(){ 

    gesture(1000,[TAP.x*1.8,TAP.y],[TAP.x*0.1,TAP.y],[TAP.x,TAP.y])
    sleep(500)
    gesture(1000,[TAP.x,TAP.y*0.5],[TAP.x,TAP.y*1.5],[TAP.x,TAP.y])
    sleep(500)

    gesture(1000,[TAP.x*0.1,TAP.y*0.5],[TAP.x*1.8,TAP.y*1.5],[TAP.x,TAP.y])
    sleep(500)
    gesture(1000,[TAP.x*1.8,TAP.y*0.5],[TAP.x*0.1,TAP.y*1.5],[TAP.x,TAP.y])
    sleep(500)

    // click(TAP.x*0.8,TAP.y)
    // sleep(800)
    // click(TAP.x*0.8,TAP.y*0.7)

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

    // boobs.existApply(ddclickCenter)

 
    coti2.existApply(ddclickCenter)
 


    // coti.existApply(ddclickCenter)
 
    // skiP.existApply(ddclickCenter)

    // latter.existApply(ddclickCenter)

    // while(!reTry.existApply(no_action)){
    //     clog("求索")
    // }
   

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