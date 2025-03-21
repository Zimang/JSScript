"auto"
var Utils=require("../../../utils")
var zutils=require("../../../customUtils")
var utils = new Utils()
// plugins.extend('Math');

if (!requestScreenCapture()) {
    toast("请求截图失败");
    exit();
} 

var privateAllSet=false

function main(){
    
    // // warmup play
    app.launch("in.crossy.daily_crossword")
    sleep(12000)
    zutils.clickTargetPicLeftTopFromPath("./assests/button_ok.png",2000)
    zutils.clickTargetPicCentralFromPath("./assests/button_conti.png",2000)
    zutils.clickTargetPicCentralFromPath("./assests/button_conti.png",2000)
    zutils.screenCentralClick(8000) 
     

    while(zutils.clickTargetPicCentralFromPath("./assests/button_yes_acc.png",2000)) {
        sleep(3000)
        console.log("check privacey polivcy")
    }
    var count=0;
    while(true){
        count++;
        while(zutils.clickColorfulTargetPicCentralFromPath("./assests/button_ad.png",5000)) {
            sleep(3000)
            console.log("check ad prepared")
            if(zutils.clickTargetPicCentralFromPath("./assests/button_play_now.png",100)){
                console.log("play now")
                break;
            }
        }
        if(zutils.clickColorfulTargetPicCentralFromPath("./assests/ad_running_out.png",200)) {
            console.log("add is running out")
            back()
            break;
        }
        //ad_running_out.png
        if(!privateAllSet){
            //paly now 可能抓不到广告 
            //可能没有隐私 第三次的时候出现了隐私选项
            console.log("check years old")
            privateAllSet= zutils.clickTargetPicCentralFromPath("./assests/under_13.png",5000)
        }
        console.log("click and sleep")
        zutils.clickTargetPicCentralFromPath("./assests/button_play_now.png",90000)
        console.log("detect now #index "+count) 
        zutils.startBlockingAdDetectionRound(4)  
        zutils.clickTargetPicCentralFromPath("./assests/button_ok_2.png",2000)

    }
    console.log("ad numbers = "+count) 
    back()
    back()
    zutils.clickTargetPicLeftTopFromPath("./assests/button_ok.png",2000)
    zutils.repeatFunction(()=>{
        zutils.clickTargetPicLeftTopFromPath("./assests/show_letters_5.png",2000)
        zutils.clickTargetPicLeftTopFromPath("./assests/button_conti.png",2000)
    },4)
    sleep(8000)
    back()
    back()
    
}
 

runtime.getImages().initOpenCvIfNeeded();
main()