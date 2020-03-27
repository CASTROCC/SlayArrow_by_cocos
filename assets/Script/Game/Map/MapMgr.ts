import Astar_s from "../../Astar/A_star_2.0";
import { Map } from "./Map";
import MapConfig from "./MapConfig";
import ResourceManager, { loadingType } from "../../Core/Manager/ResourceManager";
import RoleMgr, { RoleState } from "../Obj/RoleMgr";
import { TileType, DungeonFactory } from "../../Core/Dungeon/DungeonFactory";
import SceneManager from "../../Core/Manager/SceneManager";
import { test_Data } from "../../Debug/Test_Data";

/// 地图代理类 管理地图表现

export default class MapMgr {

    private _Map: Map;
    private _SourceData: TileType[][];
    private _Astar: Astar_s;

    constructor() {
        this._Map = new Map();
        this._Astar = Astar_s.ins();

        // TODO 抽象AssetManager
        this.loadMapRes();
    }

    public static Ins: MapMgr = new MapMgr();

    public get Map(): Map {
        return this._Map;
    }

    public loadMapRes(): void {
        ResourceManager.ins().loadResByDir("Map/1001", loadingType.None, (res: any) => {
            let temp = {};
            for (const item of res) {
                if (item instanceof cc.Prefab)
                    temp[item.name] = item;
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
        
        this._SourceData = DungeonFactory.Ins.genertor(width, height);
        this._Map.Init(this._SourceData);
        this._Astar.MapVo = this._SourceData;

        SceneManager.ins().BattleLayer.addChild(this._Map);
        this._Map.on(cc.Node.EventType.TOUCH_END, this.clickMap, this);
    }

    private clickMap(e: cc.Event.EventTouch): void {

        let clickPos: cc.Vec2 = e.getLocation();

        let mapPos = SceneManager.ins().ConverToMapPos(clickPos);
        let x = Math.floor(mapPos.x / MapConfig.GirdWidth);
        let y = Math.floor(mapPos.y / MapConfig.GirdHeight);

        let Path: cc.Vec2[] = this._Astar.Search(RoleMgr.Ins.nowPos, cc.v2(x, y));
        if(Path.length === 0) {
            cc.error("can't find road.");
            return ;
        }
        RoleMgr.Ins.EnterState(RoleState.Move, Path);
    }

}
