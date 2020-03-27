// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

import { BaseObj } from "../Game/Obj/BaseObj";

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    // private _path: cc.Vec2[] = [];
    // private _mapDebugPanel: BaseObj;

    // public setPath(v: cc.Vec2[]) {
    //     this._path = v;

    //     this.node.removeAllChildren();
    // }
}
