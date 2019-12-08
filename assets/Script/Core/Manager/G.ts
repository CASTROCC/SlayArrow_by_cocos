import EventManager from "./EventManager";
import GustureUtil from "../Utils/GustureUtils";
import TimerManager from "./TimerManager";
import ResourceManager from "./ResourceManager";

export default class G {

    private static _EventMgr: EventManager;

    private static _GusterMgr: GustureUtil;

    private static _TimerMgr: TimerManager;

    private static _ResMgr: ResourceManager;

    public static get EventMgr() {
        if (!this._EventMgr)
            this._EventMgr = EventManager.ins();
        return this._EventMgr;
    }

    public static get GusterMgr() {
        if (!this._GusterMgr)
            this._GusterMgr = GustureUtil.ins();
        return this._GusterMgr;
    }

    public static get TimerMgr() {
        if (!this._TimerMgr)
            this._TimerMgr = TimerManager.ins();
        return this._TimerMgr;
    }

    public static get ResMgr() {
        if (!this._ResMgr)
            this._ResMgr = ResourceManager.ins();
        return this._ResMgr;
    }
}