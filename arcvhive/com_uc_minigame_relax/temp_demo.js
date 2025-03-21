"auto"
let Thread = threads.start(function () {
    if (auto.service != null) {
        let Allow = textMatches(/(允许|立即开始|统一|START NOW)/).findOne(10 * 1000);
        if (Allow) {
            Allow.click();
        }
    }
});
//10.0.2.2
//mode
// 1.直连模拟器调试模式
// 2.打包进入apk,auto.js点击执行模式,相对路径
// 3.打包进入apk,auto.js点击执行模式,绝对路径，assests文件夹
// 4.打包进入apk,auto.js点击执行模式,相对路径，sample文件夹
// 5.直连模拟器调试模式,绝对路径，Pictures文件夹
// 6.直连模拟器调试模式,绝对路径，Pictures文件夹  v6
var mode=1;
let proj="com_uc_minigame_relax"
let projN="com.uc.minigame.relax.autojs"
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
// // //临时脚本配置 雷电
// // var Utils=require(getPathWithNum("utils",6))
// var zutils=require(getPathWithNum("customUtils",5))
// // var zutils=require("./customUtils") 引索
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
let pg_3="com.android.permissioncontroller:id/permission_allow_foreground_only_button"

function doubleClick(_x,_y,_w,_h){ 
    var x=_x+(_w/2);
    var y=_y+(_h/2);
    click(x,y) 
    clog("点击一次"+x+" "+y)
    sleep(100) 
    clog("点击一次"+x+" "+y)
    click(x,y)
}
function cclcik(_x,_y,_w,_h){ 
    var x=_x+(_w/2);
    var y=_y+(_h/2);
    for(var i=0;i<50;i++){
        click(x,y) 
        sleep(50)
    }
    // clog("点击一次"+x+" "+y)
    // sleep(100) 
    // clog("点击一次"+x+" "+y)
    // click(x,y)
}
function sClick(_x,_y,_w,_h){ 
    var x=_x+(_w/2);
    var y=_y+(_h/2);
    click(x,y) 
    clog("点击一次"+x+" "+y) 
}
var isGuid=true
function guid(){

    

    zutils.ids([
        [pg_1,100],
        [pg_2,50],
        [pg_3,50],
    ])
    zutils.follow([
        ["s_1.png",1000],
        ["s_3.png",1000],
        ["s_7.png",1000],
    ],getPath(""),sClick)

    while(zutils.clickTargetPicCentralFromPath(getPath("b_2.png"))){
        //点击level实现操作
    }
    while(!zutils.clickTargetPicCentralFromPath(getPath("b_3.png"))){
        zutils.follow([
            ["s_1.png",1000],
            ["s_3.png",1000],
            ["s_7.png",1000],
        ],getPath(""),sClick)
        
        zutils.id([
            [pg_1,100],
            [pg_2,50],
            [pg_3,50],
        ])
        zutils.clickTargetPicCentralFromPath(getPath("s_12.png"))
        zutils.clickTargetPicCentralFromPath(getPath("s_3.png"))
        zutils.clickTargetPicCentralFromPath(getPath("s_7.png"))
        zutils.clickTargetPicCentralFromPath(getPath("s_7_e.png"))

        zutils.findSinglePicFromPathTo(cclcik,getPath("b_2_e.png"),0)
    }
    zutils.findSinglePicFromPathTo((_x,_y,_w,_h)=>{
        clog("cao")
        click(_x+(_w/2),_y+(_h/2)+_h)
    },getPath("b_3.png"),0)
    clog("cao")
    // zutils.clickTargetPicCentralFromPath(getPath("s_10.png"))
    zutils.clickTargetPicCentralFromPath(getPath("s_11.png"))
    // zutils.clickTargetPicCentralFromPath(getPath("s_12.png"))
 
}

// 定义三个无副作用的逻辑函数
function logic1() { 

}

function logic2() { 

}

function logic3() { 
    
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
    // zutils.clickFromPath([0, 1, 0, 0, 0, 0, 0, 1, 1])
    // logic3()
    guid()
}
if (!requestScreenCapture(false)) {
    toast("请求截图失败");
    exit();
}
function main(){
    
    // singleTest()
    
    // // warmup play
    console.log("start")
    app.launch("com.uc.minigame.relax")
    sleep(6000)

    const endTimeMillis = Date.now() + getRandomInt(4 * 60 * 1000, 6 * 60 * 1000);
    const intervalRange = { min: 1000, max: 3000 };
    // 循环执行，直到当前时间超过结束时间
    while (Date.now() < endTimeMillis) { 
        guid()
        // loopPlay()
        const sleepTime = getRandomInt(intervalRange.min, intervalRange.max);
        sleep(sleepTime);
    } 
}
runtime.getImages().initOpenCvIfNeeded();
startJs()
main()
endJs()