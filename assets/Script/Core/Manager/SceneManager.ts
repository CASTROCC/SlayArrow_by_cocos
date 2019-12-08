export default class SceneManager {

    private _layers: Array<cc.Node>;

    private static _instance: SceneManager;
    public static ins(): SceneManager {
        if (!this._instance)
            this._instance = new SceneManager();
        return this._instance;
    }

    constructor () {

        this._layers = [];
        this.Init();
    }


    private Init(): void {
        this._sceneLayer = new cc.Node();
        this._uiLayer = new cc.Node();
        this._effectLayer = new cc.Node();
        this._panelLayer = new cc.Node();
        

        // this._sceneLayer.getContentSize(cc.)
        // TODO setSize  
    }

    private _sceneLayer: cc.Node;
    private _uiLayer: cc.Node;
    private _effectLayer: cc.Node;
    private _panelLayer: cc.Node;


    public get sceneLayer(): cc.Node {
        return this._sceneLayer;
    }
    
    public get uiLayer(): cc.Node {
        return this._uiLayer;
    }

    public get effectLayer(): cc.Node {
        return this._effectLayer;
    }

    public get panelLayer(): cc.Node {
        return this._panelLayer;
    }
}
