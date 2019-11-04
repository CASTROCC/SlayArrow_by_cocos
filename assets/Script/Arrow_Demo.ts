import SlayArrow from "./Utils/SlayArrow";

// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Node)
    touchNode: cc.Node = null;

    @property(cc.Sprite)
    headSprite: cc.Sprite = null;

    @property(cc.Sprite)
    tailSprite: cc.Sprite = null;

    private _startPos: cc.Vec2 = cc.v2(0,0);
    private _slayArraw: SlayArrow;
    

    start () {
        this._slayArraw = new SlayArrow(this.headSprite, this.tailSprite);
        this.node.addChild(this._slayArraw);
        this._slayArraw.setActive(false);
        this.touchNode.on(cc.Node.EventType.TOUCH_START, this.onStart, this);
    }


    onStart(event: cc.Event.EventTouch): void {
        this._slayArraw.setActive(true);
        this._startPos = this.touchNode.convertToWorldSpaceAR(this._startPos);
        this._slayArraw.setArrowPos(this._startPos, event.getLocation());
        this.touchNode.on(cc.Node.EventType.TOUCH_MOVE, this.onDrag, this);
        this.touchNode.on(cc.Node.EventType.TOUCH_END, this.onEnd, this);
        this.touchNode.on(cc.Node.EventType.TOUCH_CANCEL, this.onEnd, this);
    }

    onDrag(event: cc.Event.EventTouch): void {
        let endPos = event.getLocation();
        this._slayArraw.setArrowPos(this._startPos, endPos);
    }

    onEnd(event: cc.Event.EventTouch): void {
        this.touchNode.off(cc.Node.EventType.TOUCH_MOVE, this.onDrag, this);
        this.touchNode.off(cc.Node.EventType.TOUCH_END, this.onEnd, this);
        this.touchNode.off(cc.Node.EventType.TOUCH_CANCEL, this.onEnd, this);
        this._startPos = cc.v2(0,0);
        this._slayArraw.setActive(false);
    }
}
