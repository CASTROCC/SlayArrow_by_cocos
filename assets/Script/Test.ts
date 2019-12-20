// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Node)
    touch: cc.Node = null;

    @property(cc.Node)
    sps: cc.Node = null;

    @property(cc.Camera)
    camera: cc.Camera = null;

    onEnable() {
        this.touch.on(cc.Node.EventType.TOUCH_END, (e: cc.Event.EventTouch)=>{
            let worldPos: cc.Vec2 = e.getLocation();
            console.log("w pos: ", worldPos);
            let t: cc.Vec2 = this.touch.convertToNodeSpaceAR(e.getLocation());

            // 将世界坐标转换为摄像机内坐标
            // this.camera.getWorldToCameraPoint(worldPos, t);
            console.log("c Pos :", t )
        }, this);
    }

    update (dt: number) {
        let mat: cc.Material = this.sps.getComponent(cc.Sprite).getMaterial(0);
        console.log(mat["_props"].range += .1);
    }
}
