import GameUtils from "../../Core/Utils/GameUtils";
import G from "../../Core/Manager/G";
import MapConfig from "./MapConfig";
import { BaseObj } from "../Obj/BaseObj";
import { TimerHandler } from "../../Core/Manager/TimerManager";

export enum MapType {
    NotCorss = 0,
    Start ,
    End ,    
    Cross
}
// 用于表现地图
export class Map extends BaseObj {

    private _GirdType: cc.Prefab[];

    constructor() {
        super();
        this.name = "Map";
        this.anchorX = 0;
        this.anchorY = 1;
        this.x = 0;
        this.y = 0;
    }
    
    public Init(mazeData: number[][], mapRes?: cc.Prefab[]) {
        if (mapRes && mapRes.length)
            this._GirdType = mapRes;
         
        
        // let widthMid: number = (mazeData[0].length + 1) >> 1;
        // let heightMid: number = (mazeData.length + 1) >> 1;

        // TODO 暂时只考虑地图格子为奇数的情况
        // let center: cc.Node = this.createGird(mazeData[heightMid][widthMid], 0, 0);
        // this.addChild(center);
        // for (let i = 1; i < heightMid - 1; i++) {
        //     let gu = this.createGird(mazeData[heightMid - i][0], 0, i);
        //     let gd = this.createGird(mazeData[heightMid + i][0], 0, -i);
        //     this.addChild(gu);
        //     this.addChild(gd);
        // }

        // for (let i = 1; i < widthMid - 1; i++) {
        //     let gu = this.createGird(mazeData[0][widthMid + i], i, 0);
        //     let gd = this.createGird(mazeData[0][widthMid - i], -i, 0);
        //     this.addChild(gu);
        //     this.addChild(gd);
        // }

        // for (let i = 1; i < heightMid - 1; i++) {
        //     for (let j = 1; j < widthMid - 1; j++) {
        //         let lDown: MapType = mazeData[heightMid + i][widthMid - j];
        //         let lUp: MapType = mazeData[heightMid - i][widthMid - j];
        //         let rDown: MapType = mazeData[heightMid + i][widthMid + j];
        //         let rUp: MapType = mazeData[heightMid - i ][widthMid + j];
                
        //         let ldNode: cc.Node = this.createGird(lDown, -j, -i);
        //         let luNode: cc.Node = this.createGird(lUp, -j, i);
        //         let rdNode: cc.Node = this.createGird(rDown, j, -i);
        //         let ruNode: cc.Node = this.createGird(rUp, j, i);

        //         this.addChild(ldNode);
        //         this.addChild(luNode);
        //         this.addChild(rdNode);
        //         this.addChild(ruNode);

        //     }
            
        // }

        let width: number = mazeData[0].length;
        let height: number = mazeData.length;

        let type: MapType;
        for (let i = 0; i < height; i++) {
            for (let j = 0; j < width; j++) {
                type = mazeData[i][j];
                this.addChild(this.createGird(type, j, i));
            }
        }

        this.setContentSize(cc.size(mazeData[0].length * MapConfig.GirdWidth ,mazeData.length * MapConfig.GirdHeight));
    }

    public set GirdType(v: cc.Prefab[]) {
        if (!v && !v.length) 
            return;
        this._GirdType = v;
    }
    
    /// TODO
    /// assetsManager
    private createGird(val: MapType, w_Pos: number, h_Pos: number): cc.Node {  
        // let node: BaseObj = new BaseObj(); 
        // let sprite: cc.Sprite = node.addComponent(cc.Sprite);
        let node: cc.Node;
        if(val === MapType.Cross || val === MapType.Start || val === MapType.End ) node = cc.instantiate(this._GirdType[1])
            // sprite.spriteFrame = this._GirdType[1];
            
        else if(val === MapType.NotCorss ) node = cc.instantiate(this._GirdType[0]);
            // sprite.spriteFrame = this._GirdType[0];

        node.position = GameUtils.TransGirdPosition(w_Pos, h_Pos, MapConfig.GirdWidth, MapConfig.GirdHeight);
        return node;
    }

    public UnInit(): void {
        this.destroy();
    }

}