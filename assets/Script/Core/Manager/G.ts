import EventManager from "./EventManager";
import GustureUtil from "../Utils/GustureUtils";
import TimerManager from "./TimerManager";
import ResourceManager from "./ResourceManager";
import SceneManager from "./SceneManager";

export default class G {

    public static get SceneMgr() {
        return SceneManager.ins();
    }

    public static get EventMgr() {
        return EventManager.ins();
    }

    public static get GusterMgr() {
        return GustureUtil.ins();
    }

    public static get TimerMgr() {
        return TimerManager.ins();
    }

    public static get ResMgr() {
        return ResourceManager.ins();
    }
}