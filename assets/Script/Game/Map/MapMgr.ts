import Astar_s from "../../Astar/A_star_2.0";
import { Map, MapType } from "./Map";
import MapConfig from "./MapConfig";
import { MazeFactory } from "../../MazeFactory";
import { loadingType } from "../../Core/Manager/ResourceManager";
import G from "../../Core/Manager/G";
import { BaseObj } from "../Obj/BaseObj";
import RoleMgr, { RoleState } from "../Obj/RoleMgr";
import SceneManager from "../../Core/Manager/SceneManager";

/// 地图代理类 管理地图表现

export default class MapMgr {

    private _Map: Map;
    private _SourceData: number[][];
    private _Astar: Astar_s;

    constructor() {
        this._Map = new Map();
        this._Astar = Astar_s.ins();

        // TODO 抽象AssetManager
        this.loadMapRes();
    }

    public static Ins: MapMgr = new MapMgr();

    public loadMapRes(): void {
        G.ResMgr.loadResByDir("Map/1001", loadingType.None, (res: any) => {
            let temp = [];
            for (const item of res) {
                if (item instanceof cc.Prefab)
                    temp.push(item)
            }
            this._Map.GirdType = temp;
        });
    }

    public UnInit(): void {
        this._Map.off(cc.Node.EventType.TOUCH_START, this.clickMap, this);
        this._Map.UnInit();
    }

    public InizalizeMaze(): void {
        let width: number = MapConfig.MapWidth, 
            height: number = MapConfig.MapHeight;
        if (MapConfig.MapWidth % 2 == 0) 
            width = MapConfig.MapWidth - 1;
        if (MapConfig.MapWidth % 2 == 0) 
            height = MapConfig.MapHeight - 1;
        
        this._SourceData = MazeFactory.Ins.CreateMaze(width, height);
        this._Astar.MapVo = this._SourceData;
        
        this._Map.Init(this._SourceData);

        G.SceneMgr.BattleLayer.addChild(this._Map);
        this._Map.on(cc.Node.EventType.TOUCH_END, this.clickMap, this);
    }

    private clickMap(e: cc.Event.EventTouch): void {

        let worldPos: cc.Vec2 = e.getLocation();
        let clickPos: cc.Vec2 = this._Map.convertToNodeSpaceAR(worldPos);
        
        // (<SceneManager>G.SceneMgr).MapCamera.getWorldToCameraPoint(worldPos, clickPos);

        // clickPos = this._Map.convertToNodeSpaceAR(clickPos);
        let x: number = Math.floor(clickPos.x / MapConfig.GirdWidth);
        let y: number = Math.floor(((1080 - clickPos.y) ) / MapConfig.GirdHeight);
        if(this._SourceData[y][x] === MapType.NotCorss ) {
            cc.error("can't find road.");
            return ;
        }
        let Path: cc.Vec2[] = this._Astar.Search(RoleMgr.Ins.nowPos, cc.v2(x, y));
        if(Path.length === 0) {
            cc.error("can't find road.");
            return ;
        }
        RoleMgr.Ins.EnterState(RoleState.Move, Path);
    }

    // private async moveRes(path: cc.Vec2[]) {
    //     let pos: cc.Vec2 = path.shift();
    //     if (!pos) return;

    //     this.isMoving = true ;
    //     await this.movePosimes(pos);

    //     this.nowPos = pos;
    //     this.isMoving = false;
    //     this.moveRes(path);
    // }

    // private movePosimes(pos: cc.Vec2): Promise<Function> {
    //     return new Promise((reslove) => {
    //         let position = cc.v2( this.cross.width * pos.x + this.cross.width / 2, - (this.cross.height * pos.y + this.cross.height / 2) );
    //         let roleAction = cc.moveTo(this.moveDuration, position)
    //         let callAction = cc.callFunc(()=>{
    //                 reslove();
    //         } , this );
    //         this.role.runAction(cc.sequence([roleAction, callAction]));
    //         reslove();
    //     });
    // }

}
