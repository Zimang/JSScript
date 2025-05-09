"auto"
let Thread = threads.start(function () {
    if (auto.service != null) {
        let Allow = textMatches(/(允许|立即开始|统一|START NOW)/).findOne(10 * 1000);
        if (Allow) {
            Allow.click();
        }
    }
}); 
var mode=1;
let proj="academy_gocrypto_trading"
let projP="academy.gocrypto.trading.autojs"
let projR="academy.gocrypto.trading"
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
function backForGoogleProtect(x,y,w,h){
    back()
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
// var zutils=require(getPathWithNum("customUtils",5))
// // var zutils=require("./customUtils") 引索 
// mode=1

// // //临时脚本配置 蓝叠 
// var zutils=require(getPathWithNum("customUtils",7)) 
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
let TAP={x:device.width/2,y: device.height/ 2,
    cl:function(){
        click(this.x,this.y)
    },
    clp:function(a,b){
        click(this.x*a,this.y*b)
    },
}
//横板
// let TAP={y:device.width/2,x: device.height/ 2,
//     cl:function(){
//         click(this.x,this.y)
//     },
//     clp:function(a,b){
//         click(this.x*a,this.y*b)
//     },}
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
        ["t","This device isn’t Play Protect certified",0,0,backForGoogleProtect]
    ])
    zutils.afollow([
        ["t","Sign in to find the latest Android apps, games, movies, music, & more",0,0,backForGoogleProtect]
    ])
    zutils.afollow([
        ["t","Confirm selection",0,0], 
    ])
    zutils.afollow([ 
        ["t","Continue",0,0],
    ])
    zutils.afollow([
        ["i","academy.gocrypto.trading:id/skipButton",0,0],
        // ["t","Continue",0,800],
    ])
    zutils.afollow([
        ["i","academy.gocrypto.trading:id/okButton",0,0],
        // ["t","Continue",0,800],
    ]) 
    zutils.afollow([
        ["t","Claim Reward",0,0,clickBakc],
        // ["t","Continue",0,800],
    ]) 
}
function shift(){ 
    // swipe(TAP.x,TAP.y,TAP.x,TAP.y-400,200) 
    gesture(1000,[TAP.x,TAP.y],[TAP.x,TAP.y-500])  
    // press(TAP.x*0.75,TAP.y*1.5,1000)  
}
function clickBakc(x,y,w,h){
    click(55,100)
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
    zutils.afollow([
        ["t","Trading",0,0],
        ["t","Tournament",0,800],
        ["t","Mining",0,800],
        ["t","Profile",0,800],
        ["t","Lobby",1000,800],
    ])
}

function logic2() { 

    zutils.afollow([
        ["i","academy.gocrypto.trading:id/adBonusTextView",0,0],
        // ["t","Continue",0,800],
    ])
}

function logic3() { 
    
    zutils.afollow([
        ["i","academy.gocrypto.trading:id/dailyRewardTextView",0,0],
        // ["t","Continue",0,800],
    ])
}

//对于游戏我们只需要找到一个死循环即可
function singleLoop(){

}


let der=zutils.createCircleDrawer(TAP.x,TAP.y,200,800) 
let c2p=zutils.create2PointGenerator(TAP.x*2,TAP.y,200,0,TAP.y*0.7)
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
                    ["t","ALLOW",0],  
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


function scrp(){
    var dddd= c2p()
    gesture(1000,[dddd[0].x,dddd[0].y],[dddd[1].x,dddd[1].y]) 
}
function sscrp(){
    var i=0
    var times=getRandomInt(10,30)
    for(i;i<times;i++){
        //判断可动
        if(tests[1].existApply(no_action)||!tests[2].existApply(no_action)){  
            break
        }

        var dddd= c2p()
        if(i%2==1){
            gesture(getRandomInt(700,800),[dddd[0].x,dddd[0].y],[dddd[1].x,dddd[1].y]) 
        }else{
            gesture(getRandomInt(700,800),[dddd[1].x,dddd[1].y],[dddd[0].x,dddd[0].y])
        } 
    }
}

function forkYou(){
    gs([ [400, 1070]
        , [530, 1070]
        , [530, 1200]
        , [680, 1200]
    ],1000,500) 

    while (!tests[2].existApply(ddclickCenter)) {
        cclick([[910,94],[910,94],[910,94]],500) 
    }
    app.launch(projR) 
    广告
    afollow的用法
    zutils.afollow([
        ["t","Continue",0],  
        ["i","com.mbit.callerid.dailer.spamcallblocker:id/btnContinue",0,1500],
        ["i","com.mbit.callerid.dailer.spamcallblocker:id/btnAllowSync",0,1500],
        ["t","Next",1000,1000],  
    ])

    zutils.afollow([
        ["c",tests[34],0,0,ddclickCenter],
        ["c",tests[21],0,8000,dabove],
        ["c",tests[25],1000,2000,ddclickCenter],
    ]) 
    TAP.clp(0.1,0.2) //超市
    TAP.clp(0.1,0.1) //设置
    TAP.clp(0.1,0.4) //skin
    TAP.clp(0.1,0.5) // noadd
    TAP.clp(1.75,0.15) // close
    TAP.clp(1.6,0.55) // close setting

    sscrp() 
    der.drawCircle(20)
    follow的用法
    zutils.follow([
        // ["cut_1_1.png",500],
        ()=>{
            clog("hha")
            return true;
        },
    ],getPath(""),dclickCenter)

    if(!levelButtom.existApply(no_action,false)){
        zutils.enableDPICache(false)
    }
    
    找色ffe300 
    while(true){ 
        img = captureScreen()
        images.saveImage(img, "/sdcard/1.jpg", "jpg");
        source = images.read("/sdcard/1.jpg");
        images.rotate(source, 180)
        sleep(2000)
        pointM = findMultiColors(source, "#ffe300", [
            [10, 10, "#ffe300"],  // 主颜色点 (x=0,y=0) 的右侧 10px, 下方 10px 必须是绿色
            [-10, 10, "#ffe300"],    // 主颜色点的右侧 20px, 下方 20px 必须是蓝色
            [10, -10, "#ffe300"],    // 主颜色点的右侧 20px, 下方 20px 必须是蓝色
            [-10, -10, "#ffe300"],    // 主颜色点的右侧 20px, 下方 20px 必须是蓝色
        ],{region: [0, TAP.y*0.45, device.width, device.height-TAP.y*0.45],
            threshold: 40
        }); 
        attack(pointM)
        source.recycle()
        if(!pointM&&noThanks.existApply(ddclickCenter)){
            break
        }
    } 

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
    

    zutils.clickFromPath([0, 1, 0, 0, 0, 0, 0, 1, 1])
    guid()
    logic1()
    logic2()
    logic3() 
}
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

var pointM,img,source
function singleTest(){ 
    guid()
    // logic1()
    // logic2()
    // logic3() 
    // singleLoop()
}

function gs(arr,step,inter){
    for (let i = 0; i < arr.length-1; i++) {
        gesture(step,arr[i],arr[i+1])
        sleep(inter)
    }
}
function cclick(arr,inter){
    for (let i = 0; i < arr.length; i++) {
        click(arr[i][0],arr[i][1])
        sleep(inter)
    }
}


function getSE() {
    // 1. 获取屏幕截图
    let source =zutils.safeCaptureClone(); // ImageWrapper 类型
    if (!source) {
        toast("截图失败");
        return;
    }

    // 2. 原图查色
    let pointM = images.findMultiColors(source, "#ffe300", [
        [10, 10, "#ffe300"],
        [-10, 10, "#ffe300"],
        [10, -10, "#ffe300"],
        [-10, -10, "#ffe300"],
    ], {
        region: [0, 150, device.width, device.height -300],
        // threshold: 100
    });

    if (!pointM) {
        toast("原图找色失败");
        safeRecycle(source)
        return;
    }

    // 3. 翻转后处理
    let bitmap = source.getBitmap();                      // ImageWrapper → Bitmap
    let flippedBitmap = flipImageVertically(bitmap);     // 翻转 Bitmap
    let flippedImage = ImageWrapper.ofBitmap(flippedBitmap); // Bitmap → ImageWrapper

    images.saveImage(flippedImage, "/sdcard/2.jpg", "jpg");
    // 4. 翻转图查色
    let pointN = images.findMultiColors(flippedImage, "#ffe300", [
        [10, 10, "#ffe300"],
        [-10, 10, "#ffe300"],
        [10, -10, "#ffe300"],
        [-10, -10, "#ffe300"],
    ], {
        region: [0, 150, device.width, device.height -300],
        // threshold: 40
    });
 
    safeRecycle(source)
    safeRecycle(flippedImage) 

    if (pointN) { 
        let res = {
            x1:pointM.x, 
            y1:pointM.y ,
            x2: TAP.x * 2 - pointN.x ,
            y2: TAP.y * 2 - pointN.y
        };
        clog(res);
        // fuzzGestrue(1500,res.x1,res.y1,res.x2,res.y2)
        return res;
    }

    return undefined;
}

function fuzzGestrue(t,x1,y1,x2,y2){
    if(x1){
        gesture(t, [x1+getRandomInt(-20,20),y1+getRandomInt(-20,20)], [x2+getRandomInt(-20,20),y2+getRandomInt(-20,20)]);

    }
}
function isRevealed(){
    let source = zutils.safeCaptureClone(); // ImageWrapper 类型
    if (!source) {
        toast("截图失败");
        return;
    }

    // 2. 原图查色
    let pointM = images.findMultiColors(source, "#ffe300", [
        [10, 10, "#ffe300"],
        [-10, 10, "#ffe300"],
        [10, -10, "#ffe300"],
        [-10, -10, "#ffe300"],
    ], {
        region: [0, TAP.y * 0.45, device.width, device.height - TAP.y * 0.45],
        // threshold: 40
    });

    safeRecycle(source) 
    if (!pointM) { 
        return false;
    }else{
        return true
    }
}




if (!requestScreenCapture(false)) {
    toast("请求截图失败");
    exit();
}
function main(){
    console.log("start")
    
    adapt()
    // zutils.setColorFulSearch(true)
    // singleTest()
    
    // 记得打包要切换路径
    // 记得很横板要切换截图模式
    // // warmup play
    app.launch(projR)
   // app.startActivity({ 
   //     packageName: "academy.gocrypto.trading",
   //     className: "包名.LauncherActivity"
   //   });

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