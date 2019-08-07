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

    @property(cc.Node)
    clon_arrow_0: cc.Node = null;

    @property(cc.Node)
    clon_arrow_1: cc.Node = null;

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    protected maxList: number = 20

    private _nodelist: cc.Node[] = []
    private _startPos: cc.Vec2 = cc.v2(0,0);
    

    start () {
        this.createArrows()
        this.touchNode.on(cc.Node.EventType.TOUCH_START, this.onStart, this)
    }


    onStart(event: cc.Event.EventTouch): void {
        this._startPos = this.touchNode.convertToWorldSpaceAR(this._startPos)
        this.touchNode.on(cc.Node.EventType.TOUCH_MOVE, this.onDrag, this)
        this.touchNode.on(cc.Node.EventType.TOUCH_END, this.onEnd, this)
        this.touchNode.on(cc.Node.EventType.TOUCH_CANCEL, this.onEnd, this)
    }

    onDrag(event: cc.Event.EventTouch): void {
        let pos = event.getLocation()
        this.reset(this._startPos, pos)
    }

    onEnd(event: cc.Event.EventTouch): void {
        this.touchNode.off(cc.Node.EventType.TOUCH_MOVE, this.onDrag, this)
        this.touchNode.off(cc.Node.EventType.TOUCH_END, this.onEnd, this)
        this._startPos = cc.v2(0,0)
        for (let i = 0; i < this._nodelist.length; i++) {
            const node: cc.Node = this._nodelist[i]
            node.active = false 
        }
    }

    createArrows(): void {
        for (let i = 0; i < this.maxList; i++) {
            let node: cc.Node = cc.instantiate(this.clon_arrow_1)
            this._nodelist.push(node)
            node.scale = (i / this.maxList) + 0.5
            node.zIndex = i
            this.node.addChild(this._nodelist[i])
        }
        let topArrow = cc.instantiate(this.clon_arrow_0)
        topArrow.setParent(this.node)
        topArrow.zIndex = this.maxList
        topArrow.scale = 1.5
        this._nodelist.push(topArrow)
    }

    reset(startPos: cc.Vec2, endPos: cc.Vec2): void {
        //根据传入的起点和终点来计算两个控制点
        var ctrlAPos= cc.v2(0,0)
        var ctrlBPos= cc.v2(0,0)

        ctrlAPos.x = startPos.x+(startPos.x-endPos.x)*0.1 

        ctrlAPos.y = endPos.y-(endPos.y-startPos.y)*0.2
        
        ctrlBPos.y = endPos.y+(endPos.y-startPos.y)*0.3
        
        ctrlBPos.x = startPos.x-(startPos.x-endPos.x)*0.3
        
        var getStartPos = function (x: number, y: number, t: number): cc.Vec2 {
            return cc.v2(x*(1-t)*(1-t)*(1-t), y*(1-t)*(1-t)*(1-t))
        }

        var getCtrlAPos = function (x: number, y: number, t: number): cc.Vec2 {
            return cc.v2(x*t*(1-t)*(1-t), y*t*(1-t)*(1-t))
        }

        var getCtrlBPos = function (x: number, y: number, t: number): cc.Vec2 {
            return cc.v2(x*t*t*(1-t), y*t*t*(1-t))
        }

        var getEndPos = function (x: number, y: number, t: number): cc.Vec2 {
            return cc.v2(x*t*t*t, y*t*t*t)
        }

        let a: cc.Vec2 = endPos.sub(startPos)
        let firstNodeAngle: number = Math.atan2(a.x, a.y) * 180 / Math.PI + 270 ;
        (firstNodeAngle % 360 ) > 180 ? firstNodeAngle = 270 : firstNodeAngle = 90

        let updateAngle = (index: number)=>{
            if (index === 0 ) {
                this._nodelist[index].rotation = firstNodeAngle  
            } else {
                var current = this._nodelist[index]    
                var last = this._nodelist[index - 1]     
                var lenVec: cc.Vec2 = current.position.sub(last.position)  
                
                var ra = Math.atan2(lenVec.x , lenVec.y )
                current.rotation = ra *180 /Math.PI + 270
            }
        }

        // 根据贝塞尔曲线重新设置所有小箭头的位置及方向
        for (let i = 0; i < this._nodelist.length; i++) {

            let t = i / (this._nodelist.length - 1)
            
            let node: cc.Node = this._nodelist[i]

            let start: cc.Vec2 = getStartPos(startPos.x, startPos.y, t) 
            let ctrlA: cc.Vec2 = getCtrlAPos(ctrlAPos.x, ctrlAPos.y, t).mulSelf(3)
            let ctrlB: cc.Vec2 = getCtrlBPos(ctrlBPos.x, ctrlBPos.y, t).mulSelf(3)
            let end: cc.Vec2 = getEndPos(endPos.x, endPos.y, t)
            let totalPos: cc.Vec2 = start.addSelf(ctrlA).addSelf(ctrlB).addSelf(end)
            
            let pos = this.node.convertToNodeSpaceAR(totalPos)
            node.position = pos
            node.active = true
            node.opacity = 255 / (this.maxList - i ) + 160
            updateAngle(i)
        }

    } 
    

    // update (dt) {}
}
