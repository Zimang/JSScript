"auto"

var Utils=require("./../../utils")
var zutils=require("./../../customUtils")
const Ariadne = require('./../../Ariadne.js');
 
const ariadne = new Ariadne();

// 创建 playCard（指定索引和属性）
ariadne.createPlayCard(1, "pre", async () => {
    if (!requestScreenCapture()) {
        toast("请求截图失败");
        exit();
    } 
    app.launch("com.scopely.monopolygo")
    console.log(zutils.getDate())
  }, {
    delayBefore: 1000, // 执行前延迟 1 秒
    tags: ["basic"],
});
  
ariadne.createPlayCard(2, "点击屏中央", async () => {
    zutils.screenCentralClick(5000) 
  }, {
    delayAfter: 4000, 
    delayBefore: 4000,  
    tags: ["basic"],
});
  
runtime.getImages().initOpenCvIfNeeded();
// 配置阶段顺序
ariadne.configure(["tutorial", "stateMachine", "advanced", "stateMachine"]);

// 启动框架
ariadne.start();