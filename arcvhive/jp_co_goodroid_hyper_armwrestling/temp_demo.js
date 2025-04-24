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
let proj="jp_co_goodroid_hyper_armwrestling"
let projP="jp.co.goodroid.hyper.armwrestling.autojs"
let projR="jp.co.goodroid.hyper.armwrestling"
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
var zutils=require(getPathWithNum("customUtils",3)) 
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
let TAP={x:device.width/2,y: device.height/ 2,cl:function(){
    click(this.x,this.y)
}}
//横板
// let TAP={y:device.width/2,x: device.height/ 2}
// let bt_1=new zutils.CachedBT(
//     "cut_1_1.png",getPath("")
// ) 

let test=new zutils.CachedBT(
    "cut_1_1.png",getPath(""),"buttom 1"
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
    zutils.afollow([  
        ["c",tests[11],0,0,ddclickCenter],  //重启OK
        ()=>{ 
            sleep(1000)
            app.launch(projR)
            return true
        },
    ])   

    if(zutils.afollow([
        ["c",tests[23],0,0,no_action],
    ])&&!zutils.afollow([
        ["c",tests[15],0,0,no_action],  
    ])){ 
        while(zutils.afollow([
            ["c",tests[23],0,0,no_action],
        ])){
            check2Color("#ff383a","#ffff46",p2p)  
            if(zutils.afollow([["c",tests[23],0,0,no_action],])){
                gesture(200,[TAP.x,TAP.y],[TAP.x,TAP.y+100],[TAP.x,TAP.y+100],[TAP.x,TAP.y]) 
            }
        } 

        while(!zutils.afollow([
            ["c",tests[1],0,0,ddclickCenter], //play
        ])){
            zutils.afollow([
                ["c",tests[4],0,0,ddclickCenter], //拉车
            ]) 
            zutils.afollow([
                ["c",tests[8],0,0,ddclickCenter], //claim
            ])
            zutils.afollow([
                ["c",tests[3],0,0,ddclickCenter], //next stage
            ])
        }   
      
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

    if(zutils.afollow([
        ["c",tests[15],0,0,no_action],  
    ])){
        gesture(200,[TAP.x,TAP.y],[TAP.x,TAP.y+100],[TAP.x,TAP.y+100],[TAP.x,TAP.y])  
        zutils.afollow([
            ["c",tests[15],0,0,()=>{
                clickClock()
                gesture(200,[TAP.x,TAP.y],[TAP.x,TAP.y+100],[TAP.x,TAP.y+100],[TAP.x,TAP.y]) 
                return true
            }],  
            ["c",tests[15],0,0,()=>{
                clickStrong()
                gesture(200,[TAP.x,TAP.y],[TAP.x,TAP.y+100],[TAP.x,TAP.y+100],[TAP.x,TAP.y]) 
                return true
            }],  
            ["c",tests[15],0,0,()=>{
                clickFire()
                gesture(200,[TAP.x,TAP.y],[TAP.x,TAP.y+100],[TAP.x,TAP.y+100],[TAP.x,TAP.y]) 
                return true
            }],  
        ])  
        sleep(1000)
        replay()
    }   
    
}


let der=zutils.createCircleDrawer(TAP.x,TAP.y,200,800) 
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
    sleep(1500)
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
// 假设 zutils.CachedBT 构造函数已存在
var tests = []; // 可变数组

tests.push(
    new zutils.CachedBT(
        "nono.png", // 对齐
        getPath(""),      // 路径（假设 getPath 已定义）
        "no button " // 标签：button 1, button 2, ...
    )
);
// 假设要创建 5 个 CachedBT 实例
for (var i = 1; i < 35; i++) {
    tests.push(
        new zutils.CachedBT(
            (i ) + ".png", // 文件名：1.png, 2.png, ..., 5.png
            getPath(""),      // 路径（假设 getPath 已定义）
            "button " + (i) // 标签：button 1, button 2, ...
        )
    );
} 
const mthre=0.33
function p2p(p1,p2,len){
    if(!len) len=800
    gesture(len,[p1.x, p1.y],lerpL(p1,p2,mthre))
    // gesture(len,lerpL(p1,p2,mthre),[p1.x, p1.y],)
}
function lerp(p1,p2,thre){
    return {
        x:p1.x+(p2.x-p1.x)*thre,
        y:p1.y+(p2.y-p1.y)*thre,
    }
}
function lerpL(p1,p2,thre){
    return [p1.x+(p2.x+10-p1.x)*thre,p1.y+(p2.y-10-p1.y)*thre,] 
}
function clickClock(){
    click(250,1520)
    sleep(200)
}
function clickStrong(){
    click(550,1520)
    sleep(200)
}
function clickFire(){
    click(820,1520)
    sleep(200)
}
function replay(){
    click(990,110)
    sleep(200)
}
var pointM,img,source
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

    // gesture(500,[TAP.x,TAP.y],[TAP.x,TAP.y+100])
    
 
    // der.drawCircle(20)
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
    
    //找色ffff46 
    // while(true){ 
    //     img = captureScreen()
    //     images.saveImage(img, "/sdcard/1.jpg", "jpg");
    //     source = images.read("/sdcard/1.jpg");

    //     sleep(2000)
    //     pointM = findMultiColors(source, "#ffff46", [
    //         [5, 5, "#ffff46"],  // 主颜色点 (x=0,y=0) 的右侧 10px, 下方 10px 必须是绿色
    //         [-5, 5, "#ffff46"],    // 主颜色点的右侧 20px, 下方 20px 必须是蓝色
    //         [5, -5, "#ffff46"],    // 主颜色点的右侧 20px, 下方 20px 必须是蓝色
    //         [-5, -5, "#ffff46"],    // 主颜色点的右侧 20px, 下方 20px 必须是蓝色
    //     ],{region: [0, TAP.y*0.45, device.width, device.height-TAP.y*0.45],
    //         threshold: 40
    //     }); 
    //     if(pointM){
    //         clog(pointM)
    //     }else{
    //         clog("没有找到")
    //     }
    //     source.recycle()
    //     if(!pointM&&noThanks.existApply(ddclickCenter)){
    //         break
    //     }
    // } 


    // zutils.clickFromPath([0, 1, 0, 0, 0, 0, 0, 1, 1])
    guid()
    // logic1()
    // logic2()
    // logic3() 
    // singleLoop()
}

function checkColor(color,fn){ 
    source = captureScreen() 

    sleep(2000)
    pointM = findMultiColors(source, color, [
        [5, 5, color],  // 主颜色点 (x=0,y=0) 的右侧 10px, 下方 10px 必须是绿色
        [-5, 5, color],    // 主颜色点的右侧 20px, 下方 20px 必须是蓝色
        [5, -5, color],    // 主颜色点的右侧 20px, 下方 20px 必须是蓝色
        [-5, -5, color],    // 主颜色点的右侧 20px, 下方 20px 必须是蓝色
    ],{region: [0, TAP.y*0.3, device.width, device.height-TAP.y*0.3],
        //region: [x, y, w, h]
        threshold: 40
    }); 
    if(pointM){
        clog(pointM)
        if(fn){
            fn(pointM.x,pointM.y) 
        }
    }else{
        clog("没有找到")
    }
    source.recycle()  
}
function check2Color(color1,color2,fn){ 
    source = captureScreen() 

    // sleep(500)
    pointM = findMultiColors(source, color1, [
        [5, 5, color1],  // 主颜色点 (x=0,y=0) 的右侧 10px, 下方 10px 必须是绿色
        [-5, 5, color1],    // 主颜色点的右侧 20px, 下方 20px 必须是蓝色
        [5, -5, color1],    // 主颜色点的右侧 20px, 下方 20px 必须是蓝色
        [-5, -5, color1],    // 主颜色点的右侧 20px, 下方 20px 必须是蓝色
    ],{region: [0, TAP.y*0.3, device.width, device.height-TAP.y*0.3],
        //region: [x, y, w, h]
        threshold: 40
    }); 

    pointN = findMultiColors(source, color2, [
        [5, 5, color2],  // 主颜色点 (x=0,y=0) 的右侧 10px, 下方 10px 必须是绿色
        [-5, 5, color2],    // 主颜色点的右侧 20px, 下方 20px 必须是蓝色
        [5, -5, color2],    // 主颜色点的右侧 20px, 下方 20px 必须是蓝色
        [-5, -5, color2],    // 主颜色点的右侧 20px, 下方 20px 必须是蓝色
    ],{region: [0, TAP.y*0.3, device.width, device.height-TAP.y*0.3],
        //region: [x, y, w, h]
        threshold: 40
    }); 



    if(pointM){
        clog(pointM) 
    }else{
        clog("没有找到"+color1)
    }
    if(pointN){
        clog(pointN) 
    }else{
        clog("没有找到"+color2)
    }

    if(pointM&&pointN&&fn){
        fn(pointM,pointN)
    }
    source.recycle()  
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