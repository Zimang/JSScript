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
let proj="com_mbit_callerid_dailer_spamcallblocker"
let projP="com.mbit.callerid.dailer.spamcallblocker.autojs"
let projR="com.mbit.callerid.dailer.spamcallblocker"
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
let TAP={x:device.width/2,y: device.height/ 2}

var isGuid=true
function grant(){
    zutils.ids([
        [pg_1,100],
        [pg_2,50], 
    ])
    // var result = shell("pm grant  "+projR+" android.permission.READ_SMS", true); 
    // var result = shell("pm grant  "+projR+" android.permission.READ_CALL_LOG", true); 
    // var result = shell("pm grant  "+projR+"  android.permission.ANSWER_PHONE_CALLS", true); 
    // var result = shell("pm grant  "+projR+"  android.permission.RECEIVE_MMS", true); 
    // var result = shell("pm grant  "+projR+"  android.permission.RECEIVE_SMS", true); 
    // var result = shell("pm grant  "+projR+"  android.permission.SEND_SMS", true); 
    // var result = shell("pm grant  "+projR+"  android.permission.CALL_PHONE", true); 
    // var result = shell("pm grant  "+projR+"  android.permission.WRITE_CONTACTS", true); 
    // var result = shell("pm grant  "+projR+"  android.permission.WRITE_CALL_LOG", true); 
    // var result = shell("pm grant  "+projR+"  android.permission.PROCESS_OUTGOING_CALLS", true); 
    // var result = shell("pm grant  "+projR+"  android.permission.RECORD_AUDIO", true); 
    // var result = shell("pm grant  "+projR+"  android.permission.READ_CONTACTS", true); 
    // var result = shell("pm grant  "+projR+"  android.permission.READ_CONTACTS", true); 
    // var result = shell("pm grant  "+projR+"  android.permission.READ_PHONE_STATE", true); 
    // var result = shell("pm grant  "+projR+" android.permission.SYSTEM_ALERT_WINDOW", true);  
}
function guid(){
    grant()

    zutils.afollow([
        ["t", "English (US)",0],
        ["t", "NEXT",0,1500],
        ["t", "Next",0,1500],
        ["t", "Next",0,1500],
        ["t", "Start",1000,1000],
    ])

    //远程模拟器的配置
    zutils.afollow([
        ["t", "Set Now",0], 
        ["t", "Caller ID & spam app",0,1500], 
        ["t", "Caller ID Name",0,1500], 
        ()=>{sleep(1500);back();clog(1);sleep(800); return true},
        ()=>{sleep(1500);back();clog(1);sleep(800); return true},
        // ["i","Navigate up",1500],
        // ["i","Navigate up",1500],
    ])

    zutils.afollow([
        ["i","com.mbit.callerid.dailer.spamcallblocker:id/btnCallLogsPermissions",0],
        ["i","com.mbit.callerid.dailer.spamcallblocker:id/btnAllow",0,1500],
        ["i","com.android.permissioncontroller:id/permission_allow_button",0,1500],
        ["i","com.android.permissioncontroller:id/permission_allow_button",1000,1000], 
    ])
    zutils.afollow([
        ["i","com.mbit.callerid.dailer.spamcallblocker:id/btnContactsPermissions",0],
        ["i","com.mbit.callerid.dailer.spamcallblocker:id/btnAllow",0,1500],
        ["i","com.android.permissioncontroller:id/permission_allow_button",1000,1000], 
    ])
    zutils.afollow([
        ["t","Next",0],  
        ["i","com.mbit.callerid.dailer.spamcallblocker:id/tvCountryCode",1000,1000],
    ])
    zutils.afollow([
        ["i","com.mbit.callerid.dailer.spamcallblocker:id/edtSearch",0],
        ()=>{setText("+86");sleep(1500); return true},
        // ()=>{input("+86");sleep(1500); return true},
        ["t","China",1000,1000], 
    ])
    zutils.afollow([
        ["t","Enter Number",1500], 
        ()=>{setText("19371725291");sleep(1500);return true},
        // ()=>{input("19371725291");sleep(1500);return true},
    ])
    zutils.afollow([
        ["t","Continue",0],  
        ["i","com.mbit.callerid.dailer.spamcallblocker:id/btnContinue",0,1500],
        ["i","com.mbit.callerid.dailer.spamcallblocker:id/btnAllowSync",0,1500],
        ["t","Next",1000,1000],  
    ])
 

    //本地模拟器的配置
    // zutils.afollow([
    //     // ["i","com.mbit.callerid.dailer.spamcallblocker:id/btnCallLogsPermissions",500],
    //     // ["t", "Set Now",1500], 
    //     ["t", "Caller ID Name",1500], 
    //     // ["Don’t ask again",1500], 
    //     ["t", "SET AS DEFAULT",1500], 
    // ])
    // //本地模拟器的配置
    zutils.ts([
        // ["i","com.mbit.callerid.dailer.spamcallblocker:id/btnCallLogsPermissions",500],
        // ["t", "Set Now",1500], 
        ["Set Now",500], 
        ["ALLOW",500], 
        ["Allow",500], 
        // ["Don’t ask again",1500], 
        // ["SET AS DEFAULT",1500], 
    ])

    // zutils.afollow([
    //     ["i","com.mbit.callerid.dailer.spamcallblocker:id/btnContactsPermissions",500],
    //     ["t", "Set Now",1500], 
    //     ["t", "Caller ID Name",1500], 
    //     // ["Don’t ask again",1500], 
    //     ["t", "SET AS DEFAULT",1500], 
    // ])
    // zutils.afollow([ 
    //     ["t", "Set Now",500], 
    //     ["t", "Caller ID Name",1500], 
    //     // ["Don’t ask again",1500], 
    //     ["t", "SET AS DEFAULT",1500], 
    //     ["i","com.mbit.callerid.dailer.spamcallblocker:id/btnDefaultSpamApp",1500],
    //     ["t","Set Now",1500],
    //     ["t","Caller ID Name",1500], 
    //     ["t","SET AS DEFAULT",1500], 
    //     ["t","Next",1500],
    //     ["i","com.mbit.callerid.dailer.spamcallblocker:id/tvCountryCode",1500],
    //     ["i","com.mbit.callerid.dailer.spamcallblocker:id/edtSearch",1500],
    //     ()=>{Input("+86");return true},
    //     ["t","China",1500], 
    //     ["t","Enter Number",1500], 
    //     ()=>{Input("19371725291");return true},
    //     ["t","Continue",1500],  
    //     ["i","com.mbit.callerid.dailer.spamcallblocker:id/btnContinue",1500],
    //     ["i","com.mbit.callerid.dailer.spamcallblocker:id/btnAllowSync",1500],
    //     ["t","Next",1500],  
    // ]) 
}
function shift(){ 
    // swipe(TAP.x,TAP.y,TAP.x,TAP.y-400,200) 
    gesture(1000,[TAP.x,TAP.y],[TAP.x,TAP.y-500])   
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
    zutils.tfollow([
        ["Incoming",200],
        ["Outgoing",200],
        ["Missed",200],
        ["Recent",200],
    ])
}

function logic2() { 
    zutils.tfollow([
        ["Contacts",200],
        ["Message",200],
        ["Block",200],
        ["Setting",200],
        ["Calls",200],
    ])

}

function logic3() { 
    zutils.idfollow([
        "ivMore",
        "c"
    ])
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
    var result = shell("pm grant  "+projR+" android.permission.READ_SMS", true); 
    var result = shell("pm grant  "+projR+" android.permission.READ_CALL_LOG", true); 
    var result = shell("pm grant  "+projR+"  android.permission.ANSWER_PHONE_CALLS", true); 
    var result = shell("pm grant  "+projR+"  android.permission.RECEIVE_MMS", true); 
    var result = shell("pm grant  "+projR+"  android.permission.RECEIVE_SMS", true); 
    var result = shell("pm grant  "+projR+"  android.permission.SEND_SMS", true); 
    var result = shell("pm grant  "+projR+"  android.permission.CALL_PHONE", true); 
    var result = shell("pm grant  "+projR+"  android.permission.WRITE_CONTACTS", true); 
    var result = shell("pm grant  "+projR+"  android.permission.WRITE_CALL_LOG", true); 
    var result = shell("pm grant  "+projR+"  android.permission.PROCESS_OUTGOING_CALLS", true); 
    var result = shell("pm grant  "+projR+"  android.permission.RECORD_AUDIO", true); 
    var result = shell("pm grant  "+projR+"  android.permission.READ_CONTACTS", true); 
    var result = shell("pm grant  "+projR+"  android.permission.READ_CONTACTS", true); 
    var result = shell("pm grant  "+projR+"  android.permission.READ_PHONE_STATE", true); 
    var result = shell("pm grant  "+projR+" android.permission.SYSTEM_ALERT_WINDOW", true);  

    // if(result.code == 0){
    // toast("执行成功");
    // }else{
    // toast("执行失败！请到控制台查看错误信息");
    // }

    // app.launch(projR) 

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
    
    // singleTest()
    
    // // warmup play
    console.log("start")
    app.launch(projR)
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