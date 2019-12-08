export default class SlayArrow extends cc.Node {
    
    private _linkNums: number = 20;
    private _headArrow: cc.Node;
    private _tailArrows: cc.Node[] = [];
    private _PI: number = 3.1415;

    constructor(headSprite: cc.Sprite, tailSprite: cc.Sprite) {
        super();
        if (!headSprite || !tailSprite) {
            console.error("ctor SlayArrow error.");
            return;
        }
        this.createArrows(headSprite, tailSprite);
        this._headArrow.active = false;
    }   

    /**
     * 设置箭头以贝塞尔曲线运动的起点和终点
     * @param startPos 
     * @param endPos 
     */
    public setArrowPos(startPos: cc.Vec2, endPos: cc.Vec2): void {
        //根据传入的起点和终点来计算两个控制点
        var ctrlAPos= cc.v2(0,0)
        var ctrlBPos= cc.v2(0,0)

        ctrlAPos.x = startPos.x+(startPos.x-endPos.x)*0.1 

        ctrlAPos.y = endPos.y-(endPos.y-startPos.y)*0.2
        
        ctrlBPos.y = endPos.y+(endPos.y-startPos.y)*0.1
        
        ctrlBPos.x = startPos.x-(startPos.x-endPos.x)*0.2
        
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
        let firstNodeAngle: number = Math.atan2(a.x, a.y) * 180 / this._PI + 270 ;
        (firstNodeAngle % 360 ) > 180 ? firstNodeAngle = 270 : firstNodeAngle = 90;

        // 根据贝塞尔曲线重新设置所有小箭头的位置及方向F

        let i = 0;
        let tempHead: cc.Node = this._tailArrows[0];
        do {
            let len = this._tailArrows.length;
            let t = i / (len - 1);
            
            let node: cc.Node = tempHead;

            let start: cc.Vec2 = getStartPos(startPos.x, startPos.y, t);
            let ctrlA: cc.Vec2 = getCtrlAPos(ctrlAPos.x, ctrlAPos.y, t).mulSelf(3);
            let ctrlB: cc.Vec2 = getCtrlBPos(ctrlBPos.x, ctrlBPos.y, t).mulSelf(3);
            let end: cc.Vec2 = getEndPos(endPos.x, endPos.y, t);
            let totalPos: cc.Vec2 = start.addSelf(ctrlA).addSelf(ctrlB).addSelf(end);
            
            let pos = this.convertToNodeSpaceAR(totalPos);
            node.position = pos;
            node.active = true;
            // node.opacity = 255 / (len - i ) + 160;
            
            // 更新箭头角度
            if (i === 0 ) {
                tempHead.angle = ~firstNodeAngle + 1 ;
            } else {
                var current = this._tailArrows[i];  
                var last = this._tailArrows[i - 1];     
                var lenVec: cc.Vec2 = current.position.sub(last.position);  
                
                var ra = Math.atan2(lenVec.x , lenVec.y );
                current.angle = ~(ra * 180 / this._PI + 270) + 1;
            }

            i++;
            tempHead = this._tailArrows[i];
        } while(tempHead);
    } 

    private createArrows(hs: cc.Sprite, ts: cc.Sprite): void {
        this._headArrow = new cc.Node();
        this._headArrow.addComponent(cc.Sprite).spriteFrame = hs.spriteFrame;
        this._headArrow.scale = 1.5;
        for (let i = 0; i < this._linkNums; i++) {
            let node: cc.Node = new cc.Node();
            node.addComponent(cc.Sprite).spriteFrame = ts.spriteFrame;
            node.scale = (i / this._linkNums) + .5;
            this._tailArrows.push(node);
            this.addChild(node);
        }
        this._tailArrows.push(this._headArrow);
        this.addChild(this._headArrow);
    }

    /**
     * 设置箭头状态
     * @param bool 
     */
    public setActive(bool: boolean) {
        this.active = bool;
    }
}