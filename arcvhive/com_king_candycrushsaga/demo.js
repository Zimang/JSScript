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
            return "./../../"+p
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
//临时脚本配置
// var Utils=require(getPathWithNum("utils",4))
// var zutils=require(getPathWithNum("customUtils",5))
// var utils = new Utils()
// mode=1

//打包脚本配置
var Utils=require(getPathWithNum("utils",3))
var zutils=require(getPathWithNum("customUtils",3))
var utils = new Utils()
mode=2



if (!requestScreenCapture()) {
    toast("请求截图失败");
    exit();
} 
function main(){
    
    // // warmup play
    console.log("start")
    app.launch("com.king.candycrushsaga")
    sleep(10000)
    zutils.clickTargetPicCentralFromPath(getPath('bt_acc_1.png'),100) 
    while(!zutils.clickTargetPicCentralFromPath(getPath('play_1.png'),1000)){
        console.log("didn't hit the play button")
    }
    sleep(1000)
    var top_b=0,butt_b=0,left_b=0,right_b=0
    zutils.findSingleColorfulPicFromPathTo((x,y,w,h)=>{
        butt_b=y+h/2;
        console.log(butt_b)
    },getPath('button_1.png'),100)

    
    zutils.findSingleColorfulPicFromPathTo((x,y,w,h)=>{
        left_b=x;
        console.log(left_b)
    },getPath('left_1.png'),100)

    zutils.findSingleColorfulPicFromPathTo((x,y,w,h)=>{
        right_b=x+w;
        console.log(right_b)
    },getPath('right_1.png'),100)

    zutils.findSingleColorfulPicFromPathTo((x,y,w,h)=>{
        top_b=y+h;
        console.log(top_b)
    },getPath('top_1.png'),100)
    console.log({
        t:top_b,
        l:left_b,
        r:right_b,
        b:butt_b,
    })
    const generator = zutils.create2PointGenerator(right_b-left_b, butt_b-top_b, 100,left_b,top_b);
 
    while(!zutils.findSingleColorfulPicFromPathTo(()=>{},getPath("end_1.png"),300)){
        if(zutils.clickTargetPicCentralFromPath(getPath("close_1.png"),100)&&
        zutils.findSingleColorfulPicFromPathTo(()=>{},getPath("events.png"),100)){
            break;
        }
        
        for(i=0;i<300;i++){ 
            [point1, point2] = generator();
        
            // console.log('Point1:',point1,' Point2:', point2); // 示例输出：{x: 123, y: 456}
            swipe(point1.x, point1.y, point2.x, point2.y, 10)
            //console.log('Point2:', point2); // 示例输出：{x: 223, y: 456}
        }
    }
    zutils.clickTargetPicCentralFromPath(getPath("close_1.png"),100)
    zutils.clickTargetPicCentralFromPath(getPath("close_1.png"),100)

}
runtime.getImages().initOpenCvIfNeeded();
main()