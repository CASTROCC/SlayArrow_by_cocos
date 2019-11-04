import { SceneConfig } from "./SceneConfig";

export class SceneCtrl {
    
    private _currScene: number = 0;

    public set currScene(v: number) {
        if (typeof v == "undefined" || typeof v != "number") {
            return ;
        }

        if (v >= SceneConfig.length || v < 0) {
            return ;
        }

        // TODO
    }


    public preScene() {
        if(!this._currScene) {
            
        }
    }

    public nextScene() {
        if (this._currScene == SceneConfig.length - 1) {

        }
    }

}