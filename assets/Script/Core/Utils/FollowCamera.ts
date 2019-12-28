import MathUtils from "./MathUtils";
import { BaseObj } from "../../Game/Obj/BaseObj";
import MapMgr from "../../Game/Map/MapMgr";

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
export default class FollowCamera extends cc.Component {

    // @property(cc.Node)
    // target: cc.Node = null;

    private _target: BaseObj;
    private _winSize: cc.Size;

    start() {
        this._winSize = cc.director.getWinSize();
    }

    onEnable() {
        // cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, (e: cc.Event.EventKeyboard)=>{
        //     console.log(e);
        //     if (e.keyCode === cc.macro.KEY.w) {
        //         this.target.y += 20;
        //     } else if (e.keyCode === cc.macro.KEY.s) {
        //         this.target.y -= 20;
        //     }else if (e.keyCode === cc.macro.KEY.a) {
        //         this.target.x -= 20;
        //     } else if (e.keyCode === cc.macro.KEY.d) {
        //         this.target.x += 20;
        //     }
        // }, this);
    }

    update (dt: number) {
        dt = Math.min(dt, .033);

        if (this._target) {
            
            let targetX: number = Math.max(this._winSize.width >> 1, this._target.x);
            let targetY: number = Math.min(-(this._winSize.height >> 1), this._target.y);

            targetX = Math.min(targetX, MapMgr.Ins.Map.width - (this._winSize.width >> 1));
            targetY = Math.max(targetY, ~(MapMgr.Ins.Map.height - (this._winSize.height >> 1)) + 1)
            this.node.x = MathUtils.lerp(this.node.x, targetX, dt * 10);
            this.node.y = MathUtils.lerp(this.node.y, targetY, dt * 10);
        }
    }

    public set target(v: BaseObj) {
        this._target = v;
    }

}
