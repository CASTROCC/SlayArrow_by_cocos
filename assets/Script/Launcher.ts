import { loadingType } from "./Core/Manager/ResourceManager";
import MapMgr from "./Game/Map/MapMgr";
import RoleMgr from "./Game/Obj/RoleMgr";
import SceneManager from "./Core/Manager/SceneManager";
import Level from "./Core/Dungeon/level";
import { DungeonFactory } from "./Core/Dungeon/DungeonFactory";
import { Role } from "./Game/Obj/Role";
import { test_start } from "./Debug/Test_Data";
const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    private _core: cc.Node;
    private _Assets: string = "Prefab/Guester";

    start () {
        // G.ResMgr.loadResByUrl(this._Assets, loadingType.None, this.complete.bind(this), this.progress.bind(this));
        (<SceneManager>SceneManager.ins()).Init();
        MapMgr.Ins.InizalizeMaze();
        RoleMgr.Ins.Init();
        //// 生成人物起始坐标
        RoleMgr.Ins.nowPos = DungeonFactory.Ins.getStair();
    }


    // private complete(asset: any): void {
    //     this._core = cc.instantiate(asset);
    //     this._core.setParent(this.node);
    //     // this._core.active = false; // 隐藏节点也会减少drawcall
    // }

    // private progress(num: number, total: number, item: any): void {
    //     console.log(num, total);
    // }

    // update (dt) {}
}
