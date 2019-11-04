import GameUtils from "./GameUtils";

export default class EffectUtils {
    /**
     * 两节点间相互淡入淡出效果
     * @param start 淡出节点
     * @param end 淡入节点
     */

    public static fadeToggleNode(start: cc.Node, end: cc.Node, time: number = 1.0, call?: () => void, target?: any) {
        let Ain = cc.fadeIn(time);
        let Aout = cc.fadeOut(time)
        start.runAction(Aout)
        let a3 = cc.callFunc(() => {
            start.stopAction(Aout)
            start.active = false
            end.active = true
            if (call && target) {
                call.call(target)
            }
        }, this);
        end.active = true
        end.opacity = 0
        end.runAction(cc.sequence(Ain, a3))
    }

    public static _isShaking: boolean = false;
    public static _shakePos: cc.Vec2[] = [cc.v2(-4, 0), cc.v2(4, 0), cc.v2(-4, 0)];
    public static _maxCount: number = 0;
    public static _shakeCount: number = 0;
    public static _callFunc: Function;
    public static _callTarget: any;
    public static _lastPos: cc.Vec2;
    public static _node: cc.Node;
    public static onFrame(dt: number) {
        if (this._shakeCount >= this._maxCount) {
            if (!this._node) return;
            this.stopShake();
            return;
        }
        let currPos: cc.Vec2 = this._shakePos[this._shakeCount % this._shakePos.length];
        let newPos: cc.Vec2 = this._lastPos.add(currPos)
        this._node.position = newPos
        this._shakeCount++;
    }
    /**
     * 抖动节点
     * @param node  
     * @param call 
     * @param target 
     * @param repeatCount 
     */
    public static shakeFrameId = null;
    public static shakeNode(node: cc.Node, call?: () => void, target?: any, repeatCount: number = 3): void {
        if (this._isShaking) {
            return;
        }
        this._isShaking = true;
        this._maxCount = this._shakePos.length * repeatCount;
        this._callFunc = call;
        this._callTarget = target;
        this._lastPos = node.position;
        this._node = node;
        this.shakeFrameId = window.requestAnimationFrame(this.onFrame.bind(this));
    }


    private static _scaleNode: cc.Node;
    private static _scaleMaxWidth: number;
    private static _lerpWidth: number;
    private static _peroty: string;
    private static _scaleFunc: () => void;
    private static _scaleFuncthiz: any;
    private static _isonScale: boolean = false;
    /**
     * 缓动拉伸节点 
     * @param node 
     * @param maxNum 
     * @param addLerp 
     * @param peroty 
     * @param func 
     * @param thiz 
     */
    public static scaleFrameId = null;
    public static scaleNodeWidthByMaxNum(node: cc.Node, maxNum: number, addLerp: number = 20, peroty: string = "width", func?: () => void, thiz?: any,): void {
        if (this._isonScale) {
            return;
        }
        this._scaleNode = node
        this._scaleMaxWidth = maxNum
        this._lerpWidth = addLerp
        this._peroty = peroty
        this._scaleFunc = func
        this._scaleFuncthiz = thiz;
        this._isonScale = true;
        this.scaleFrameId = window.requestAnimationFrame(this.onScaleWidth.bind(this));
    }

    private static onScaleWidth(dt: number): void {
        
        if (this._scaleNode[this._peroty] >= this._scaleMaxWidth) {
            this.stopScaleWidthByNum();
        }
        if (this._peroty && this._scaleNode) {
            this._scaleNode[this._peroty] += this._scaleMaxWidth * dt * 1.5;
        } else {
            this.stopScaleWidthByNum();
        }
    }
    /**
     * 停止拉长
     */
    public static stopScaleWidthByNum(): void {
        this._isonScale = false;
        if (this._scaleFunc && this._scaleFuncthiz) {
            this._scaleFunc.call(this._scaleFuncthiz);
        }
        this._scaleNode =  null;
        this._scaleMaxWidth =  null;
        this._lerpWidth =  null;
        this._peroty = null;
        this._scaleFunc =  null;
        this._scaleFuncthiz =  null;
        window.cancelAnimationFrame(this.scaleFrameId);
    }

    /**
     * 停止节点抖动
     */
    public static stopShake() {
        if (!this._isShaking) return;
        this._node.position = this._lastPos;
        window.cancelAnimationFrame(this.shakeFrameId);
        if (this._callFunc && this._callTarget) this._callFunc.call(this._callTarget)
        this._isShaking = false
        this._maxCount = 0
        this._shakeCount = 0
        this._callFunc = null
        this._callTarget = null
        this._lastPos = null
        this._node = null
    }

    public static _isBlinking: boolean = false
    public static _blinkingCount: number = 0
    public static _blinkNode: cc.Node = null
    public static _blinkFunc: () => void
    public static _blinkcallTarget: any = null
    public static _blinkFlag: boolean = false
    public static _disBlink: number = 0
    public static _totalRepeat: number = 0

    // 闪烁节点
    public static onBlink() {
        if (this._totalRepeat >= this._blinkingCount) {
            if (!this._blinkNode || !this._isBlinking) return
            this.stopBlink()
            return;
        }
        if (this._blinkFlag) {
            this._blinkNode.opacity += this._disBlink
            if (this._blinkNode.opacity >= 255) {
                this._totalRepeat++
                this._blinkFlag = false;
            }

        } else {
            this._blinkNode.opacity -= this._disBlink
            if (this._blinkNode.opacity <= 0) {
                this._totalRepeat++
                this._blinkFlag = true;
            }
        }
    }
    
    // 停止闪烁
    public static stopBlink() {
        this._disBlink = 0;
        this._totalRepeat = 0;
        this._isBlinking = false;
        this._blinkingCount = 0;
        this._blinkFlag = false;
        window.cancelAnimationFrame(this.blinkFrameId);
        if ( this._blinkFunc && this._blinkcallTarget ) {
            this._blinkNode.opacity = 255 ;
            this._blinkFunc.call(this._blinkcallTarget);
            this._blinkFunc = null;
            this._blinkcallTarget = null;
            this._blinkNode = null;
        }
    }
    /**
     * 通过节点的透明度闪烁节点
     * @param node 
     * @param call 
     * @param target 
     * @param repeatCount 重复次数 
     * @param disBlink 差值
     */
    public static blinkFrameId = null;
    public static blinkNodebyOpcity(node: cc.Node, call?: () => void, target: any = null, repeatCount: number = 3, disBlink: number = 25): void {
        if (!node || this._isBlinking) {
            return
        }
        this._blinkingCount = repeatCount;
        this._blinkNode = node;
        this._blinkFunc = call;
        this._blinkcallTarget = target;
        this._isBlinking = true;
        this._disBlink = disBlink;
        this._totalRepeat = 0
        window.requestAnimationFrame(this.onBlink.bind(this));
    }

    /**
     * 指定时间内缩减宽度
     * @param node 
     * @param duration 
     * @param func 
     * @param thiz 
     */
    public static cutShortWidthByEase(node: cc.Node, duration: number, func?: Function, thiz?: any) {
        let finished = cc.callFunc(() => {
            if (func && thiz) func.call(thiz);
        }, this);
        setInterval(()=>{

        }, );
        let act: cc.Action = cc.sequence(cc.scaleTo( duration, 0, 1), finished);
        node.runAction(act);
    }

    /**
     * 节点淡入出效果
     * @param node 淡入节点
     */
    public static fadeNode(node: cc.Node, call?: () => void, target?: any, constime: number = 0.5, isReverse: boolean = false) {
        if (!node) {
            console.error(`fadeNode error, not node`)
            return
        }
        let opa: number = 255;
        if (!isReverse) {
            node.opacity = 0
            node.active = true;
            opa = 255;
        } else {
            node.opacity = 255;
            node.active = true;
            opa = 0;
        }
        let finished = cc.callFunc(() => {
            if (call && target) call.call(target);
        }, this);
        let act: cc.Action = cc.sequence(cc.fadeTo( constime, opa), finished);
        node.runAction(act);
    }

    /**
     * 更换同级两节点的层级关系
     * @param start 
     * @param end 
     */
    public static swapeNodeIndex(start: cc.Node, end: cc.Node) {
        if (start.getParent() != end.getParent()) {
            console.error("两节点不属于同一节点.");
            return;
        }
        let childs: cc.Node[] = start.getParent().children;
        let startIndex: number = childs.indexOf(start);
        let endIndex: number = childs.indexOf(end);
        childs[startIndex] = end;
        childs[endIndex] = start;
    }


    /**
     * 将某一节点移动到目标位置
     * @param node 需要移动节点
     * @param pos 目标位置
     * @param callBack 回掉
     */
    public static moveNodeToPos(node: cc.Node, pos: cc.Vec2, callBack: () => void = null, target: any = null, 
                                speed: number = 0.2, isScale: boolean = false, zIndex: number = 999) {
        let lastIndex: number = node.zIndex;
        node.zIndex = zIndex;
        let finished = cc.callFunc(() => {
            node.zIndex = lastIndex
            if (callBack && target) {
                callBack.call(target);
            }
        }, target);
        if (isScale) {
            let scaleAct = cc.scaleTo(0.25, 0.2);
            node.runAction(scaleAct);
        }
        let action: cc.Action = cc.sequence(cc.moveTo(speed, pos), finished);
        node.runAction(action);
        return action
    }

    /**
     * 缓动放大
     * @param node 目标节点
     */
    public static scaleByEsca(node: cc.Node): void {
        if (!node) return;
        node.scale = 0;
        let act = cc.scaleTo(1, 1.2);
        act.easing(cc.easeElasticInOut(1.0));
        node.runAction(act);
    }   

    /**
     * 晃动的将目标节点移动至指定位置
     * @param node 
     * @param endPos 
     * @param func 
     * @param thiz 
     */
    public static shakeMoveByRotate(node: cc.Node, endPos: cc.Vec2, func?: () => void, thiz?: any) {
        if (!node) {
            cc.log("shakeByRotate is not node!");
            return;
        }
        this.shakeByRotate(node);

        let actMove = cc.moveTo(2.5, endPos);
        let actFunc = cc.callFunc(()=>{
            if (func && thiz) {
                func.call(thiz);
            }
        }, this);
        let act3 = cc.sequence(actMove, actFunc);

        node.runAction(act3);
    }

    /**
     * 晃动节点
     * @param node 
     */
    public static shakeByRotate(node: cc.Node) {
        if (!node) {
            cc.log("shakeByRotate is not node!");
            return;
        }
        let act = cc.rotateTo(.7, 3);
        // act.easing(cc.easeElasticInOut(1.0));
        let act1 = cc.rotateTo(.7, -3);
        // act1.easing(cc.easeElasticInOut(1.0));
        let act2 = cc.sequence(act, act1).repeatForever();

        node.runAction(act2);
    }

    /**
     * 浮动节点
     * @param node 
     */
    public static floorNode(node: cc.Node): void {
        if (!node) {
            cc.log("shakeByRotate is not node!");
            return;
        }
        let upDis: cc.Vec2 = cc.v2(0, 8);
        let downDis: cc.Vec2 = cc.v2(0, -5);
        let startPos: cc.Vec2 = node.position;
        let act = cc.moveTo(.7, startPos.addSelf(upDis));
        // act.easing(cc.easeElasticInOut(1.0));
        let act1 = cc.moveTo(.7, startPos.addSelf(downDis));
        // act1.easing(cc.easeElasticInOut(1.0));
        let act2 = cc.sequence(act, act1).repeatForever();

        node.runAction(act2);
    }



     /**
     * 节点拉宽
     * @param node 目标节点
     */
    public static scaleWidth(node: cc.Node, func?: () => void, thiz?: any, sx: number = 1, time: number = .8): void {
        if (!node) return;
        node.scaleX = 0;
        let act = cc.scaleTo(time, sx);
        let a = cc.callFunc(()=>{
            func.call(thiz);
        }, this);
        let s = cc.sequence([act,a]);
        node.runAction(s);
    }

    /**
     * 缩放出现面板
     * @param node 
     * @param call 
     * @param target 
     * @param times 
     * @param bigTime 
     * @param smallTime 
     */
    public static showPanelByScale(node: cc.Node, call?: () => void, target?: any, times: number = 2, bigTime: number = 0.1, smallTime: number = 0.2): any {
        if (!node) return
        node.scale = 0
        if(!node.active) node.active = true;
        let act = cc.scaleTo(bigTime, 1.2);
        let act2 = cc.scaleTo(smallTime, 1);
        let sq = cc.sequence(act, act2);
        let repeat = sq.repeat(times);
        let call1 = cc.callFunc(() => {
            if (call && target) call.call(target)
        });
        let sq2 = cc.sequence(repeat, call1);
        return node.runAction(sq2);
    }

    /**
     * 节点放大缩小动效
     * @param node 
     * @param call 
     * @param target 
     * @param times 
     */
    public static scaleRepeatAction(node: cc.Node, call?: () => void, target?: any, times: number = 2, bigTime: number = 0.1, 
                    smallTime: number = 0.2, eScaleRate: number = 0.8): any {
        if (!node) return
        let sx: number = node.scaleX , 
            sy = node.scaleY, 
            eSx = sx * eScaleRate, 
            eSy = eScaleRate * sy
        if (!node.active) node.active = true
        if (times === 1) node.scale = 0 
        let act = cc.scaleTo(bigTime, sx, sy)
        let act2 = cc.scaleTo(smallTime, eSx, eSy)
        let sq = cc.sequence(act, act2)
        let repeat = sq.repeat(times)
        let call1 = cc.callFunc(() => {
            node.scaleX = sx
            node.scaleY = sy
            if (call && target) call.call(target)
        })
        let sq2 = cc.sequence(repeat, call1)
        return node.runAction(sq2)
    }

    /**
     * 闪烁节点
     * @param node 
     * @param call 
     * @param target 
     */
    public static blinkAction(node: cc.Node, call?: () => void, target?: any): any {
        if (!node) return
        node.opacity = 255;
        let act = cc.blink(2, 6)
        let calFunc = cc.callFunc(() => {
            if (call && target) call.call(target)
        }, this)
        let tact = cc.sequence(act, calFunc)
        return node.runAction(tact)
    }

    /**
     * 置灰节点下的所有节点， 自行决定是否响应事件
     * @param node 
     * @param isGray 
     * @param isInfluenclick 
     */
    public static setGrayNode(node: cc.Node, isGray: boolean, isInfluenclick: boolean = false) {

        let temp: cc.Node[] = GameUtils.getAllChildNode(node);
    
        for (let i = 0; i < temp.length; i++) {
            const node: cc.Node = temp[i];
            let sps: cc.Sprite = node.getComponent(cc.Sprite);
            sps && sps.setState(Number(isGray));
        }

        if (isInfluenclick) {
            if (isGray) node.pauseSystemEvents(true);
            else node.resumeSystemEvents(true);
        }
    }

    /**
     * 图片反转替换效果
     * @param target 
     * @param come 
     * @param func 
     * @param handler 
     * @param fromTimes 
     * @param comeTimes 
     */
    public static reversalToggle(target: cc.Node, come: cc.Sprite, func?:Function, handler?: any ,fromTimes: number = .2, comeTimes: number = .3): any {
        let tsps: cc.Sprite = target.getComponent(cc.Sprite);
        if (!tsps) {
            console.error("target is not find cc.Sprite.");
            return;
        }
        let act_1: any = cc.scaleTo(fromTimes, 0, 1);
        let act_2: any = cc.callFunc(()=>{
            tsps.spriteFrame = come.spriteFrame;
        }, this);
        let act_3: any = cc.scaleTo(comeTimes, 1, 1);
        let act_call: any = cc.callFunc(()=>{
            if (func && handler) {
                func.call(handler);
            }
        }, target);
        return target.runAction(cc.sequence([act_1,act_2, act_3, act_call]));
    }

    /**
     * 创建半透明暗影遮罩
     * @param panel 
     */
    public static drawRectMask(panel: cc.Node, x: number = -960, y: number = -540, w: number = 1920, h: number = 1080): void {
        if (!panel) {
            console.error("not Panel on drawRectMask.");
            return;
        }
        let gis: cc.Graphics = panel.getComponent(cc.Graphics);
        if (!gis) {
            panel.addComponent(cc.Graphics);
        }
        gis.clear();
        gis.rect(x, y, w, h);
        gis.fillColor = cc.color(0,0,0,120);
        gis.fillRect();
    }
}