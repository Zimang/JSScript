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
let proj="master_city_building_craft_block_community"
let projP="master.city.building.craft.block.community.autojs"
let projR="master.city.building.craft.block.community"
let projRR="master.city.building.craft.block.community"
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
var zutils=require(getPathWithNum("customUtils",7))
// var zutils=require("./customUtils") 
// var utils = new Utils()
mode=8

// 打包脚本配置
// var Utils=require(getPathWithNum("utils",3))
// var zutils=require(getPathWithNum("customUtils",3))
// var utils = new Utils()
// mode=2

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
// var drawer= zutils.drawCircleGen(200,100) 
//1/4小圆
const movementDrawer=zutils.createCircleDrawer(
    (TAP.y)/2,TAP.x+(TAP.x)/2,
    150,100
)

const viewDrawer=zutils.createCircleDrawer(
    TAP.y,TAP.x,
    150,100
)






function grant(){
    zutils.ids([
        [pg_1,100],
        [pg_2,50], 
    ])
}
function guid(){
    grant()
    zutils.follow([
        ["s_1.png",1000],
    ],getPath(""),dclickCenter)
}
function shift(){ 
    // swipe(TAP.x,TAP.y,TAP.x,TAP.y-400,200) 
    gesture(1000,[TAP.x,TAP.y],[TAP.x,TAP.y-500])   
}

var adDetector=zutils.createAdDetector(getPathWithNum("ad_whitelist.json",7))

// 定义三个无副作用的逻辑函数
function logic1() { 
    movementDrawer.drawCircle(5,1000)
}

function logic2() { 
    viewDrawer.drawCircle(5,1000)

}

function logic3() { 
    
}
const logics = [logic1, logic2, logic3]
const randomLogic = () => {
    return logics[Math.floor(Math.random() * logics.length)]
}
function loopPlay(){ 
    if(currentPackage()==projRR){
        for(var i=0;i<3;i++){  //1:3不快不慢
            randomLogic()()
        } 
    }
}

const StructureDetector = {
    // 可配置的结构模板（根据游戏场景扩展）
    templates: [
        { // Unity游戏常见结构
            parentType: 'FrameLayout',
            childRules: {
                'FrameLayout': 2,
                'RelativeLayout': 1,
                'SurfaceView': 1 // Unity视图容器
            }
        },
        { // Cocos2D游戏常见结构
            parentType: 'RelativeLayout',
            childRules: {
                'GLSurfaceView': 1,
                'ImageView': 2
            }
        }
    ],

    // 主检测方法
    detectScene: function() {
        const candidates = this.findPossibleParents();
        return candidates.some(parent => 
            this.templates.some(template => 
                this.matchTemplate(parent, template)
            )
        );
    },

    // 查找可能的父容器
    findPossibleParents: function() {
        return className('FrameLayout').find().filter(layout => 
            layout.childCount() >= 3
        );
    },

    // 模板匹配逻辑
    matchTemplate: function(parent, template) {
        // 检查父容器类型
        if (parent.className() !== template.parentType) return false;

        // 统计子组件类型
        const typeCount = parent.children()
            .reduce((acc, child) => {
                const type = child.className().split('.').pop(); // 取短类名
                acc[type] = (acc[type] || 0) + 1;
                return acc;
            }, {});

        // 对比模板规则
        return Object.entries(template.childRules)
            .every(([type, count]) => typeCount[type] === count);
    },

    // 调试方法：打印当前结构
    printStructure: function(parent) {
        if(!!parent) return
        const structure = parent.children()
            .map(child => child.className().split('.').pop())
            .sort();
        console.log(`发现结构: ${structure.join(' + ')}`);
    }
};


function singleTest(){ 
    // zutils.clickFromPath([0, 1, 0, 0, 0, 0, 0, 1, 1])
    // app.launch(projR)
    // guid()
    // logic1()
    // logic2()
    // logic3() 
    // clog(currentPackage())
    // let comp= id("advertisement-card-wrapper").findOne(1000)
    // let comp = idMatches(/.*advertisement-card-wrapper$/).findOne(1000);
    // if(comp){
    //     clog(comp)
    // }else{
    //     clog("not found")
    // }
    // clog("start")
    // if(adDetector.isAdNow()){
    //     clog("存在广告")
    // }
    //unitySurfaceView

    // let selClassic = text('abc').clickable().centerX(0.5).boundsInside(0.2, 0.05, -1, -1).action('CLICK', 'SET_TEXT', 'LONG_CLICK');
    // pickup(selClassic);

    
    // auto();
    // inspect();
    // let w = pickup({ filter: w => w.children().length > 5 });
    // console.log(w.find().length); /* e.g. 20 */
    console.log(app.autojs.versionName); // 应输出 ≥ 6.2.0
    
//     const parent = StructureDetector.findPossibleParents()[0];
//     StructureDetector.printStructure(parent);
}
if (!requestScreenCapture(true)) {
    toast("请求截图失败");
    exit();
}
function main(){ 
    // singleTest()
    
    // // warmup play
    console.log("start")
    app.launch(projRR)
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