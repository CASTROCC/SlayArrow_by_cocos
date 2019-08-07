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
export default class TypeWriter extends cc.Component {

    @property(cc.Label)
    showlabel: cc.Label = null;

    private _str: string[];
    private _isComplete: boolean = false;

    start() {
        this.setTypestr("嘻嘻哈哈，哼哼哈嘿，嘻嘻哈哈，哼哼哈嘿嘻嘻哈哈，哼哼哈嘿嘻嘻哈哈，哼哼哈嘿")
    }

    onEnable() {
        this.node.on(cc.Node.EventType.TOUCH_END, this.onlogic, this)
    }   

    onDisable() {
        this.node.off(cc.Node.EventType.TOUCH_END, this.onlogic, this)
    }

    setTypestr(v: string, width: number = 400): void {
        let totalstr = v
        this.node.anchorX = 0
        this.node.anchorY = 1
        this.node.width = width
        if (!totalstr) {
            this._isComplete = true
            return
        }
        this._isComplete = false
        this._str = totalstr.split('')
        this.schedule(this.updatelabelStr, .1)
    }

    onlogic(): void {
        if (this._isComplete) {
            this.node.active = false
        } else {
            this.unschedule(this.updatelabelStr)
            let surplus_str = this._str.join('')
            this.showlabel.string += surplus_str
            this._isComplete = true
        }
    }

    updatelabelStr(): void {
        if (!this._str.length) {
            this.unschedule(this.updatelabelStr)
            this._isComplete = true
        } else {
            let str = this._str.shift()
            this.showlabel.string += str
        }
        
    }
}
