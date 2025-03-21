"auto"
var Utils=require("../../../utils")
var zutils=require("../../../customUtils")

var utils = new Utils()
// plugins.extend('Math');

if (!requestScreenCapture()) {
    toast("请求截图失败");
    exit();
} 

function showMatchDemo(tar,eyesOn){
    let largeImage = images.read(eyesOn);
    let template = images.read(tar);
  
    console.log('大图尺寸:', [largeImage.getWidth(), largeImage.getHeight()]);
    console.log('模板尺寸:', [template.getWidth(), template.getHeight()]);
    let startTs = Date.now();
    let result =utils.matchTemplate(largeImage, template, {
      threshold: 0.85,
      region: [100, 100],
      grayTransform: false,
      scaleFactors: [1, 0.9, 1.1, 0.8, 1.2],
      max: 1
    });
    console.log('找图耗时：', (Date.now() - startTs) / 1000);
    console.log(result);
    // 将结果画框展示
    utils.showMatchRectangle(result, largeImage.mat, template.mat);
    template.recycle();
    largeImage.recycle();
}

function main(){ 
  
    var screenW=device.width

    app.launch("com.scopely.monopolygo")
    console.log(zutils.getDate())
    sleep(20000)
    console.log(zutils.getDate())

    if(zutils.swipeTargetPicLeft(images.read("./assests/25_2_26_b_1.png"),1000)){
        //(-215:Assertion failed) _img.size().height <= _templ.size().height && _img.size().width <= _templ.size().width in function 'matchTemplate'
        zutils.clickTargetPicCentral(images.read("./assests/_20250225_165437.JPG"),0)
    }
    sleep(20000) 
    zutils.screenCentralClick(5000) 


    zutils.clickTargetPicCentral(images.read("./assests/_20250226_154712.JPG"),1000)
 
    zutils.screenCentralClick(5000) 
    zutils.screenCentralClick(5000) 
    zutils.screenCentralClick(5000) 

    console.log("click screen central")
    zutils.clickAllPicsCentral(images.read("./assests/Screenshot_20250226-155042.png"),10000,5)
    zutils.clickAllPicsCentral(images.read("./assests/Screenshot_20250226-155042.png"),5000,5)
 
    
    zutils.screenCentralClick(5000) //5
    zutils.screenCentralClick(5000) 

    zutils.clickTargetPicCentral(images.read("./assests/Screenshot_20250226-161156.png"),4000)
 
    zutils.screenCentralClick(5000) //7 太快了
    zutils.screenCentralClick(5000)  //8

    zutils.clickTargetPicCentral(images.read("./assests/hat.png"),5000)
    zutils.clickTargetPicCentral(images.read("./assests/go.png"),10000)
    zutils.clickTargetPicCentral(images.read("./assests/go.png"),10000)


    zutils.screenCentralClick(5000)  //9
    zutils.screenCentralClick(20000)  
    zutils.screenCentralClick(5000)   //11
    zutils.clickTargetPicCentral(images.read("./assests/church_1.png"),15000)


    zutils.screenCentralClick(10000)   
    zutils.clickTargetPicCentral(images.read("./assests/take.png"),15000)

    zutils.screenCentralClick(10000)   //13
    zutils.screenCentralClick(10000)   
    zutils.screenCentralClick(10000)    //15  到这里可能就结束了,剩下的内容就是随机的了

    // zutils.clickTargetPicCentral(images.read("./assests/go.png"),10000)
    // zutils.clickTargetPicCentral(images.read("./assests/go.png"),10000)
    // zutils.clickTargetPicCentral(images.read("./assests/go.png"),10000)
    // zutils.clickTargetPicCentral(images.read("./assests/go.png"),10000)

    // zutils.screenCentralClick(10000)    //16 打打打 打劫
    // zutils.clickAllPicsCentral(images.read("./assests/bankFlip.png"),10000,5,5000)

    // zutils.clickTargetPicCentral(images.read("./assests/take.png"),8000)


    // zutils.screenCentralClick(10000) //17

    // zutils.clickTargetPicCentral(images.read("./assests/go.png"),10000)
    // zutils.clickTargetPicCentral(images.read("./assests/go.png"),10000)
    // zutils.clickTargetPicCentral(images.read("./assests/go.png"),10000)
    // zutils.screenCentralClick(10000)//18
    // zutils.clickTargetPicCentral(images.read("./assests/go.png"),10000)
    // zutils.clickTargetPicCentral(images.read("./assests/go.png"),10000)
    // zutils.clickTargetPicCentral(images.read("./assests/go.png"),10000)
    // zutils.clickTargetPicCentral(images.read("./assests/go.png"),10000)

    // zutils.clickTargetPicCentral(images.read("./assests/castle_1.png.png"),10000)
    // zutils.clickTargetPicCentral(images.read("./assests/take.png"),8000)


    // zutils.clickTargetPicCentral(images.read("./assests/go.png"),10000)
    // zutils.clickTargetPicCentral(images.read("./assests/go.png"),10000)
    // zutils.clickTargetPicCentral(images.read("./assests/go.png"),10000)
    // zutils.clickTargetPicCentral(images.read("./assests/go.png"),10000)
    // zutils.clickTargetPicCentral(images.read("./assests/go.png"),10000)
    // zutils.clickTargetPicCentral(images.read("./assests/go.png"),10000)
    // zutils.clickTargetPicCentral(images.read("./assests/go.png"),10000)
    // zutils.clickTargetPicCentral(images.read("./assests/go.png"),10000)

    // //第二次打劫
    // zutils.clickAllPicsCentral(images.read("./assests/bankFlip.png"),10000,7,5000)

    // zutils.clickTargetPicCentral(images.read("./assests/take.png"),8000)
    // zutils.clickTargetPicCentral(images.read("./assests/2build.png"),8000)

    sleep(2000)
    toast("end")
}

runtime.getImages().initOpenCvIfNeeded();
main()