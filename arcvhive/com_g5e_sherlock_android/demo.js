"auto"
//mode
// 1.直连模拟器调试模式
// 2.打包进入apk,auto.js点击执行模式,相对路径
// 3.打包进入apk,auto.js点击执行模式,绝对路径，assests文件夹
// 4.打包进入apk,auto.js点击执行模式,相对路径，sample文件夹
// 5.直连模拟器调试模式,绝对路径，Pictures文件夹
var mode=1;
function getPath(p){
    switch(mode){
        case 5:
            return "/mnt/shared/Pictures/"+p
        case 4:
            return "/data/user/0/org.autojs.autoxjs/files/sample/"+p
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
function clog(msg){
    console.log(msg)
}
// // //临时脚本配置
// var Utils=require(getPathWithNum("utils",4))
// var zutils=require(getPathWithNum("customUtils",5))
// var utils = new Utils()
// mode=1

// 打包脚本配置
var Utils=require(getPathWithNum("utils",3))
var zutils=require(getPathWithNum("customUtils",3))
var utils = new Utils()
mode=2



if (!requestScreenCapture(true)) {
    toast("请求截图失败");
    exit();
}
function main(){
    // warmup play 
    app.launch("com.g5e.sherlock.android")
    sleep(50000) 

    zutils.clickFromPath( [0, 0, 0, 0, 1, 0, 0, 0, 0, 1],20000)
    zutils.repeatFunction(()=>{
        zutils.screenCentralClick(1000,true)
    },20)     
    sleep(8000) 

    /** 缩写 */
    zutils.s([
        "hat_1.jpg",
        "mirror_1.png",
    ],getPath(""))
    
    // while(!zutils.clickColorfulTargetPicCentralFromPath(getPath("volin_1.png"),100)){
    while(!zutils.clickTargetPicCentralFromPath(getPath("volin_1.png"),100)){
        clog("小提琴动图难找")
    }
    // "volin_1.png",


    zutils.s([
        ["lc",1000],
        "ink_1.png",
        ["continue_2.png",8000],
        "lc",
        "lc",
        "lc",
        ["lc",8000],
        ["play.png",10000],
        "bag_1.png",
        "reveal.png",
        "exe_1.png",
    ],getPath(""))

 /**缩写 */


    // zutils.clickTargetPicCentralFromPath(getPath("hat_1.jpg"),5000)
    // zutils.clickTargetPicCentralFromPath(getPath("mirror_1.png"),5000)
    // zutils.clickTargetPicCentralFromPath(getPath("volin_1.png"),5000)

    // zutils.screenCentralClick(1000,true)
    // zutils.clickTargetPicCentralFromPath(getPath("ink_1.png"),5000)
    // zutils.clickTargetPicCentralFromPath(getPath("continue_2.png"),8000)
    // zutils.repeatFunction(()=>{
    //     zutils.screenCentralClick(5000,true)
    // },4)     
    // sleep(8000) 

    // zutils.clickTargetPicCentralFromPath(getPath("play.png"),5000)
    // zutils.clickTargetPicCentralFromPath(getPath("bag_1.png"),5000)
    // zutils.clickTargetPicCentralFromPath(getPath("reveal.png"),5000)
    // zutils.clickTargetPicCentralFromPath(getPath("exe_1.png"),5000)
    zutils.clickColorfulTargetPicCentralFromPath(getPath("play.png"),5000)
 
}
runtime.getImages().initOpenCvIfNeeded();
main()