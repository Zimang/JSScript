"auto"
//mode
// 1.直连模拟器调试模式
// 2.打包进入apk,auto.js点击执行模式,相对路径
// 3.打包进入apk,auto.js点击执行模式,绝对路径，assests文件夹
// 4.打包进入apk,auto.js点击执行模式,相对路径，sample文件夹
// 5.直连模拟器调试模式,绝对路径，Pictures文件夹
var mode = 1;
function getPath(p) {
    switch (mode) {
        case 5:
            return "/mnt/shared/Pictures/" + p
        case 4:
            return "/data/user/0/org.autojs.autoxjs/files/sample/" + p
        case 3:
            return "./../../" + p
        case 2:
            return "./assests/" + p //将临时的脚本使用的图片复制到assets文件夹后，使用图片请用mode 2
        case 1:
        default:
            return "/mnt/shared/Pictures/Screenshots/" + p
    }
}
function getPathWithNum(p, num) {
    if (!num) {
        return getPath(p)
    }
    mode = num
    return getPath(p)
}
function clog(msg) {
    console.log(msg)
}
// // //临时脚本配置
var Utils = require(getPathWithNum("utils", 4))
var zutils = require(getPathWithNum("customUtils", 5))
var utils = new Utils()
mode = 1

// 打包脚本配置
// var Utils=require(getPathWithNum("utils",3))
// var zutils=require(getPathWithNum("customUtils",3))
// var utils = new Utils()
// mode=2

s = zutils.s

if (!requestScreenCapture()) {
    toast("请求截图失败");
    exit();
}

 
class HexNode {
    constructor(q, r, x, y) {
      this.logical = { q, r };  // 逻辑坐标（允许小数）
      this.position = { x, y }; // 实际屏幕坐标（像素）
      this.neighbors = new Array(6).fill(null);
    }
  }
  
  class HexGrid {
    constructor(originX, originY, hexSize) {
      this.origin = { x: originX, y: originY }; // 屏幕原点坐标
      this.size = hexSize;                     // 六边形边长
      this.nodes = new Map();
      this.directions = [
        { q: 0, r: -1 },   // 0: 上
        { q: 1, r: -0.5 }, // 1: 右上
        { q: 1, r: 0.5 },  // 2: 右下
        { q: 0, r: 1 },    // 3: 下
        { q: -1, r: 0.5 }, // 4: 左下
        { q: -1, r: -0.5 } // 5: 左上
      ];
    }
  
    // 逻辑坐标 → 实际坐标转换
    calculatePosition(q, r) {
      const x = this.origin.x + this.size * 1.5 * q;
      const y = this.origin.y + this.size * Math.sqrt(3) * (r + q/2);
      return { x, y };
    }
  
    // 生成指定层数的网格
    build(layers) {
      // 创建中心节点
      const centerPos = this.calculatePosition(0, 0);
      const center = new HexNode(0, 0, centerPos.x, centerPos.y);
      this.nodes.set('0,0', center);
  
      // 使用队列进行广度优先遍历
      const queue = [{ node: center, layer: 0 }];
      
      while (queue.length > 0) {
        const current = queue.shift();
        if (current.layer >= layers) continue;
  
        // 遍历六个方向
        for (let dir = 0; dir < 6; dir++) {
          const d = this.directions[dir];
          const newQ = current.node.logical.q + d.q;
          const newR = current.node.logical.r + d.r;
          const key = `${newQ},${newR}`;
  
          // 创建新节点
          if (!this.nodes.has(key)) {
            const pos = this.calculatePosition(newQ, newR);
            const newNode = new HexNode(newQ, newR, pos.x, pos.y);
            this.nodes.set(key, newNode);
            queue.push({ node: newNode, layer: current.layer + 1 });
          }
  
          // 建立双向连接
          const neighbor = this.nodes.get(key);
          current.node.neighbors[dir] = neighbor;
          neighbor.neighbors[(dir + 3) % 6] = current.node;
        }
      }
    }
  
    // 根据逻辑坐标获取节点
    getNode(q, r) {
      return this.nodes.get(`${q},${r}`);
    }
  }
  
  // 使用示例
  const grid = new HexGrid(400, 300, 50); // 原点(400,300)，边长50px
  grid.build(2); // 生成2层网格
  
  // 验证坐标计算
  console.log(grid.getNode(0, 0).position);   // {x:400, y:300} 中心
  console.log(grid.getNode(1, -0.5).position); // 右上节点
  // 计算值：
  // x = 400 + 50 * 1.5 * 1 = 475
  // y = 300 + 50*√3*(-0.5 + 0.5) = 300
  // → {x:475, y:300}
  
  console.log(grid.getNode(1, 0.5).position); // 右下节点
  // x = 400 + 50 * 1.5 * 1 = 475
  // y = 300 + 50 * 1.732*(0.5 + 0.5) ≈ 386.6
  // → {x:475, y:386.6}

  
function main() {

    // // warmup play
    // console.log("start")
    app.launch("com.fruit.hexa.sort")
    sleep(20000)
    var hex_1,hex_2,hex_3,tar_1
    var bh,bw

    //找筹码
    while(!zutils.findSingleColorfulPicFromPathTo((x,y,w,h)=>{
            tar_1=[x+(w/2),y-(h/2)]
        },getPath("tar.png"),100)){
        clog("这里有动图所以可能找不到 tar")
    }
    zutils.findSinglePicFromPathTo((x,y,w,h)=>{
        bh=h;bw=w;hex_3=[x+(w/2),y-(h/2)]
        clog("找到 le6")
    },getPath("le6.png"),100)
    zutils.findSinglePicFromPathTo((x,y,w,h)=>{
        hex_2=[x+(w/2),y-(h/2)]
        clog("找到 le4")
    },getPath("le4.png"),100)
    zutils.findSinglePicFromPathTo((x,y,w,h)=>{
        hex_1=[x+(w/2),y-(h/2)]
        clog("找到 le2")
    },getPath("le2.png"),100)

    hex_1=[2*hex_2[0]-hex_3[0],hex_2[1]]

    //初始化棋盘
    while(!zutils.findSingleColorfulPicFromPathTo((x,y,w,h)=>{
        tar_1=[x+(w/2),y-(h/2)]
    },getPath("tar.png"),100)){
    clog("这里有动图所以可能找不到 tar")
}

    gesture(1000,
        hex_1,
        [tar_1[0], tar_1[1] + bh]
    )
    gesture(1000,
        hex_2,
        [tar_1[0]-bw, tar_1[1] + bh*1.5]
    )
    sleep(2000)
    gesture(1000,
        hex_3,
        [tar_1[0], tar_1[1] + bh]
    )


    s([
    ])

}
runtime.getImages().initOpenCvIfNeeded();
main()