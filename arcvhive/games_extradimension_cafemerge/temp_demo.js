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
let proj="games_extradimension_cafemerge"
let projP="games.extradimension.cafemerge.autojs"
let projR="games.extradimension.cafemerge"
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


function left100(x,y,w,h){
    click(x-(w/2)-100,y)
    sleep(500)
}

function rightButtom(x,y,w,h){
    click(TAP.x*1.95,TAP.y*1.95)
    sleep(500)
}

function centerRight100(x,y,w,h){
    gesture(1000,[TAP.x,y],[TAP.x+100,y])
    // click(TAP.x*1.95,TAP.y*1.95)
    sleep(500)
}
function centerRight100Click(x,y,w,h){
    // gesture(1000,[TAP.x,y],[TAP.x+100,y])
    click(TAP.x+100,y)
    sleep(500)
}
 
function genZeroPointCol(x,y,w,h){
    // // gesture(1000,[TAP.x,y],[TAP.x+100,y])
    // click(TAP.x+100,y)
    // sleep(100)
    const boxWith=w
    const boxHight=h/9
    zeroP={
        x:x,
        y:y+4*boxHight,
        getP:function(px,py){
            return {
                x:zeroP.x+px*boxWith,
                y:zeroP.y-py*boxHight,
            }
        }
    }
}

let zeroP=undefined

// // //临时脚本配置 雷电
// // var Utils=require(getPathWithNum("utils",6))
// var zutils=require(getPathWithNum("customUtils",5))
// // var zutils=require("./customUtils") 引索
// // var utils = new Utils()
// mode=1

// // //临时脚本配置 蓝叠
// var Utils=require(getPathWithNum("utils",6))
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

let agreeOne1=new zutils.CachedBT(
    "cut_1_1.png",getPath(""),"条款1"
) 

let agreeTwo1=new zutils.CachedBT(
    "cut_1_2.png",getPath(""),"条款2"
) 

let submit2=new zutils.CachedBT(
    "cut_2_1.png",getPath(""),"接受"
) 
let sign4=new zutils.CachedBT(
    "cut_4_1.png",getPath(""),"标志1"
) 
let posOne5=new zutils.CachedBT(
    "cut_5_1.png",getPath(""),"位置1"
) 
let sign5=new zutils.CachedBT(
    "cut_5_2.png",getPath(""),"标志2"
) 
let posTwo5=new zutils.CachedBT(
    "cut_5_3.png",getPath(""),"位置2"
) 
let posOne6=new zutils.CachedBT(
    "cut_6_1.png",getPath(""),"位置3"
) 
let signOne6=new zutils.CachedBT(
    "cut_6_2.png",getPath(""),"标志3"
) 
let signTwo6=new zutils.CachedBT(
    "cut_6_3.png",getPath(""),"标志4"
) 
let posOne7=new zutils.CachedBT(
    "cut_7_1.png",getPath(""),"位置4"
) 
let posTwo7=new zutils.CachedBT(
    "cut_7_2.png",getPath(""),"位置5"
) 

let posThree7=new zutils.CachedBT(
    "cut_7_3.png",getPath(""),"位置6"
) 

let posFour7=new zutils.CachedBT(
    "cut_7_4.png",getPath(""),"位置7"
) 

let posFive7=new zutils.CachedBT(
    "cut_7_5.png",getPath(""),"位置8"
) 

let posSix7=new zutils.CachedBT(
    "cut_7_6.png",getPath(""),"位置9"
) 
let posOne8=new zutils.CachedBT(
    "cut_8_1.png",getPath(""),"位置10"
) 

let posTwo8=new zutils.CachedBT(
    "cut_8_2.png",getPath(""),"位置11"
) 
let sign9=new zutils.CachedBT(
    "cut_9_1.png",getPath(""),"标志5"
) 

let serve9=new zutils.CachedBT(
    "cut_9_2.png",getPath(""),"服务"
) 

let head10=new zutils.CachedBT(
    "cut_10_1.png",getPath(""),"头像"
) 
let taskMoney12=new zutils.CachedBT(
    "cut_12_1.png",getPath(""),"任务进度"
) 
let energy12=new zutils.CachedBT(
    "cut_12_8.png",getPath(""),"精力"
) 
let money12=new zutils.CachedBT(
    "cut_12_9.png",getPath(""),"钱"
) 
let dimond12=new zutils.CachedBT(
    "cut_12_10.png",getPath(""),"钻石"
) 

let shop12=new zutils.CachedBT(
    "cut_12_11.png",getPath(""),"商店"
) 
let cafe12=new zutils.CachedBT(
    "cut_12_6.png",getPath(""),"咖啡厅"
) 
let task12=new zutils.CachedBT(
    "cut_12_7.png",getPath(""),"任务"
) 
let close13=new zutils.CachedBT(
    "cut_13_1.png",getPath(""),"关闭1"
) 
let close14=new zutils.CachedBT(
    "cut_14_1.png",getPath(""),"关闭2"
) 
let close15=new zutils.CachedBT(
    "cut_15_1.png",getPath(""),"关闭3"
) 
let close17=new zutils.CachedBT(
    "cut_17_1.png",getPath(""),"关闭4"
) 
let house15=new zutils.CachedBT(
    "cut_16_1.png",getPath(""),"主页面"
) 

let googlePlay=new zutils.CachedBT(
    "cut_18_1.jpg",getPath(""),"主页面"
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

    if(!googlePlay.check()&&!agreeOne1.check()){
        if(googlePlay.existApply(no_action)){
            back()
            sleep(1000)
            back()
        }
    }

    if(agreeOne1.existApply(left100)){
        sleep(500)
        agreeTwo1.existApply(left100)
        sleep(500)
        submit2.existApply(ddclickCenter)
        sleep(500)//这里需要等待非常长的事件

        while(!sign4.existApply(rightButtom))   {
            zutils.s([
                "c"
            ],getPath(""))
            sleep(500)
        }  

        // sign4.existApply(rightButtom) //进入咖啡厅     
        sleep(500)          
        posOne5.existApply(centerRight100) //生成咖啡机
        sleep(500)
        posOne5.existApply(centerRight100Click) //点击咖啡机

        posThree7.existApply(genZeroPointCol)
        if(zeroP){ 
            let coffe=zeroP.getP(4,5)
            let coffeH=zeroP.getP(2,3)
            let coffeG=zeroP.getP(5,5)
            gesture(1000,[coffe.x,coffe.y],[coffeH.x,coffeH.y])
            sleep(500)
            gesture(1000,[coffeH.x,coffeH.y],[coffeG.x,coffeG.y])
            while(!serve9.existApply(ddclickCenter)){

            }
            sleep(1000)
            house15.existApply(ddclickCenter)
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
    cafe12.existApply(ddclickCenter)
    sleep(1000)
    house15.existApply(ddclickCenter)
}

function logic2() { 
    taskMoney12.existApply(ddclickCenter)
    sleep(500)
    close13.existApply(ddclickCenter)
}

function logic3() { 
    
}

//对于游戏我们只需要找到一个死循环即可
function singleLoop(){

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
            let NotNow = textMatches(/(|ALLOW)/).findOne(2000);
            if (NotNow) {
                NotNow.click();
                break
            }
        } 
        sleep(10 * 1000);
    }
});

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

    //follow的用法
    // zutils.follow([
    //     // ["cut_1_1.png",500],
    //     ()=>{
    //         clog("hha")
    //         return true;
    //     },
    // ],getPath(""),dclickCenter)

 
    // 
    //第一种方式
    // posTwo7.existApply(genZeroPoint)
    // if(zeroP){ 
    //     let coffe=zeroP.getP(4,5)
    //     let coffeH=zeroP.getP(2,3)
    //     let coffeG=zeroP.getP(5,5)
    //     gesture(1000,[coffe.x,coffe.y],[coffeH.x,coffeH.y])
    //     sleep(500)
    //     gesture(1000,[coffeH.x,coffeH.y],[coffeG.x,coffeH.y])
    // }
    
    //第二种方式
    // posThree7.existApply(genZeroPointCol)
    // if(zeroP){ 
    //     let coffe=zeroP.getP(4,5)
    //     let coffeH=zeroP.getP(2,3)
    //     let coffeG=zeroP.getP(5,5)
    //     gesture(1000,[coffe.x,coffe.y],[coffeH.x,coffeH.y])
    //     sleep(500)
    //     gesture(1000,[coffeH.x,coffeH.y],[coffeG.x,coffeG.y])
    // }
    // serve9.existApply(ddclickCenter) //可能点不动，链接上文循环

    // house15.existApply(ddclickCenter)
    // cafe12.existApply(ddclickCenter)
    // shop12.existApply(ddclickCenter)
    // dimond12.existApply(ddclickCenter)

    // //loop1
    // taskMoney12.existApply(ddclickCenter)
    // sleep(500)
    // close13.existApply(ddclickCenter)
 



    // task12.existApply(ddclickCenter) 找不到
    // energy12.existApply(ddclickCenter)
    // money12.existApply(ddclickCenter)
    // dimond12.existApply(ddclickCenter)
    

    
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