import GameUtils from "../../Core/Utils/GameUtils";
import MapConfig from "./MapConfig";
import { BaseObj } from "../Obj/BaseObj";
import { TileType, Tile } from "../../Core/Dungeon/DungeonFactory";

// 用于表现地图
export class Map extends BaseObj {

    private _GirdType: {[nodeName: string]: cc.Prefab};

    constructor() {
        super();
        this.name = "Map";
        this.anchorX = 0;
        this.anchorY = 1;
        this.x = 0;
        this.y = 0;
    }
    
    public Init(mazeData: TileType[][], mapRes?: {[nodeName: string]: cc.Prefab}) {
        if (mapRes && mapRes.length)
            this._GirdType = mapRes;

        let width: number = mazeData[0].length;
        let height: number = mazeData.length;
        console.log(mazeData);
        let type: Tile;
        let tile: TileType;
        for (let i = 0; i < height; i++) {
            for (let j = 0; j < width; j++) {
                tile = mazeData[i][j];
                if (tile !== null) {
                    type = mazeData[i][j].type; 
                    // if (type === Tile.blank)
                    //     continue;
                    this.addChild(this.createGird(type, j, i));
                } else {
                    throw("地图数据错误。");
                }
            }
        } 

        this.setContentSize(cc.size(mazeData[0].length * MapConfig.GirdWidth ,mazeData.length * MapConfig.GirdHeight));
    }

    public set GirdType(v: {[nodeName: string]: cc.Prefab}) {
        if (!v && !v.length) 
            return;
        this._GirdType = v;
    }
    
    /// TODO 地图内存优化管理
    /// assetsManager
    private createGird(val: Tile, w_Pos: number, h_Pos: number): cc.Node {  
        let node: cc.Node;
        
        node = cc.instantiate(this._GirdType[(val).toString()]);
        node.position = GameUtils.TransGirdPosition(w_Pos, h_Pos, MapConfig.GirdWidth, MapConfig.GirdHeight);
        return node;
    }

    public UnInit(): void {
        this.destroy();
    }

}