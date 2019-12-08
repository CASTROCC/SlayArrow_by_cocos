import G from "./Core/Manager/G";
import { loadingType } from "./Core/Manager/ResourceManager";
const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    private _core: cc.Node;
    private _Assets: string = "Prefab/Guester";

    start () {
        G.ResMgr.loadResByUrl(this._Assets, loadingType.None, this.complete.bind(this), this.progress.bind(this));
    }


    private complete(asset: any): void {
        this._core = cc.instantiate(asset);
        this._core.setParent(this.node);
        // this._core.active = false; // 隐藏节点也会减少drawcall
    }

    private progress(num: number, total: number, item: any): void {
        console.log(num, total);
    }

    // update (dt) {}
}
