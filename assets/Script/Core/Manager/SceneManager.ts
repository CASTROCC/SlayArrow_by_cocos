import { SingleBase } from "../Utils/SingleBase";
import MathUtils from "../Utils/MathUtils";
import MapConfig from "../../Game/Map/MapConfig";

export default class SceneManager extends SingleBase {

    private _battleLayer: cc.Node;
    private _uiLayer: cc.Node;
    private _effectLayer: cc.Node;
    private _panelLayer: cc.Node;
    private _mapCamera: cc.Node;
    private _windowSize: cc.Size;

    public get WindowSize(): cc.Size {
        return this._windowSize;
    }

    private _UIRoot: cc.Node;
    public get UIRoot(): cc.Node {
        return this._UIRoot;
    }

    constructor () {
        super();
    }

    public Init(): void {
        let scene: cc.Scene = cc.director.getScene();

        this._battleLayer = new cc.Node();
        scene.addChild(this._battleLayer, -1);
        this._InitBattle();

        this._InitMapCamera();

        if (scene) 
            this._UIRoot = scene.getChildByName("Canvas");
        
        this._AddtoStage();
    }

    private _AddtoStage(): void {
        
        this._uiLayer = new cc.Node();
        this._panelLayer = new cc.Node();
        this._effectLayer = new cc.Node();

        
        this.UIRoot.addChild(this._uiLayer);
        this.UIRoot.addChild(this._panelLayer);
        this.UIRoot.addChild(this._effectLayer);

        this._battleLayer.name = "BattleLayer";
        this._uiLayer.name = "UILayer";
        this._panelLayer.name = "PanelLayer";
        this._effectLayer.name = "EffectLayer";

        this.UIRoot.group = MapConfig.Group_UI;
    }

    private _InitMapCamera(): void {
        this._mapCamera = new cc.Node();
        let roleCamera: cc.Camera = this._mapCamera.addComponent(cc.Camera);
        roleCamera.cullingMask = 1; // 仅仅只渲染Map
        this._mapCamera.name = "MapCamera";
        this.BattleLayer.addChild(this._mapCamera);
    }

    private _InitBattle(): void {
        // 战斗场景毛点设置为左下角 方便计算
        this.BattleLayer.anchorX = 0;
        this.BattleLayer.anchorY = 1;
        this._windowSize = cc.director.getWinSize();
        
        this.BattleLayer.position = cc.v2( ~(this._windowSize.width >> 1) + 1, this._windowSize.height >> 1);
        this.BattleLayer.group = MapConfig.Group_Map;
    }


    public get BattleLayer(): cc.Node {
        return this._battleLayer;
    }
    
    public get UILayer(): cc.Node {
        return this._uiLayer;
    }

    public get PanelLayer(): cc.Node {
        return this._panelLayer;
    }

    public get EffectLayer(): cc.Node {
        return this._effectLayer;
    }

    public get MapCamera(): cc.Camera {
        return this._mapCamera.getComponent(cc.Camera);
    }
}
