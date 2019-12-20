import GameUtils from "../Utils/GameUtils";
import TimerManager from "./TimerManager";
import { SingleBase } from "../Utils/SingleBase";
/**
 * created by superman
 * 消息代理及分帧处理类
 */
export type Event = {
    Func: Function,
    thiz: any,
    isOnce: boolean
}

export class Msg {
    msgName: string;
    args: any;

    public dispose() {
        this.msgName = null;
        this.args = null;
    }
}
export default class EventManager extends SingleBase implements IEventManager {
    private _eventsPool: {[name: string]: Event[]};
    private _nextFrameEventsPool: {[name: string]: Event[]};    
    private _dealEvents: Msg[];
    
    protected _MaxDealConst: number = 500;
    protected _msgPool: Msg[];

    constructor () {
        super();
        this._eventsPool = {};
        this._nextFrameEventsPool = {};
        this._dealEvents = [];
        this._msgPool = [];
    }

    /**
     * 注册事件
     * @param EventName 
     * @param Func 
     * @param thiz 
     */
    public addEventListener(EventName: string, Func: Function, thiz: any): void {
        if (!Func || !thiz) {
            console.error("args is Empty!");
            return;
        }

        let event: Event = {
            Func: Func,
            thiz: thiz,
            isOnce: false
        } as Event;
        
        let events: Event[] = this._getEventListener(EventName, this._eventsPool);
        if (events) {
            events.push(event);
        } else {
            this._eventsPool[EventName] = [];
            this._eventsPool[EventName].push(event);
        }
    }   


    /**
     * 注册单次执行事件
     * @param EventName 
     * @param Func 
     * @param thiz 
     */
    public once(EventName: string, Func: Function, thiz: any): void {

        if (!Func || !thiz) {
            console.error("args is Empty!");
            return;
        }

        let event: Event = {
            Func: Func,
            thiz: thiz,
            isOnce: true
        } as Event;
        
        let events: Event[] = this._getEventListener(EventName, this._eventsPool);
        if (events) {
            events.push(event);
        } else {
            this._eventsPool[EventName] = [];
            this._eventsPool[EventName].push(event);
        }
    }


    /**
     * 添加需要分帧处理的事件
     * @param EventName 
     * @param Func 
     * @param thiz 
     */
    public addNFrameEventListener(EventName: string, Func: Function, thiz: any): void {
        if (!Func || !thiz) {
            console.error("args is Empty!");
            return;
        }

        let event: Event = {
            Func: Func,
            thiz: thiz,
        } as Event;
        
        let events: Event[] = this._getEventListener(EventName, this._nextFrameEventsPool);
        if (events) {
            events.push(event);
        } else {
            this._nextFrameEventsPool[EventName] = [];
            this._nextFrameEventsPool[EventName].push(event);
        }
    }

    /**
     * 激活需要处理的消息, 处理方式为分帧处理
     * @param EventName 
     * @param args 
     */
    public dispatchNFrameEventListener(EventName: string, ...args: any[]): void {
        let msg: Msg = this._msgPool.pop() || new Msg();
        msg.msgName = EventName;
        msg.args = args;
        this._dealEvents.push(msg);
        // 如果当前帧发来需处理的消息太多 尽量优先执行 但执行某函数超时后, 如果剩下还未处理完成的函数 将剩下的待处理消息延迟到下一帧逻辑开始时执行
        if (!this._dealMsg() && this._dealEvents.length > 0) 
            TimerManager.ins().doNext(this._dealMsg, this);
    }

    /**
     * 移除事件
     * @param EventName 
     */
    public removeEventListener(EventName: string): void {
        let events: Event[] = this._getEventListener(EventName, this._eventsPool);
        if (events) {
            while(events.length)
                events.shift();

            events = null;
            delete this._eventsPool[EventName];
        }
    }

    /**
     * 激活事件
     * @param EventName 
     * @param args 
     */
    public dispatchEventListener(EventName: string, ...args: any[]): void {
        let events: Event[] = this._getEventListener(EventName, this._eventsPool);
        for (let i = events.length - 1; i >= 0 ; i--) {
            let e = events[i];
            if (e.Func && e.thiz)
                e.Func.apply(e.thiz, args);
            
            if (e.isOnce)
                events.splice(i,1);
        }
    }

    /**
     * 移除所有事件
     */
    public removeAllEventListener(): void {
        let keys: string[] = Object.keys(this._eventsPool);
        for (const key of keys) {
            this.removeEventListener(key);
        }
    }

    /**获取消息注册的方法 */
    private _getEventListener(EventName: string, pool: {[name: string]: Event[]} = this._eventsPool): Event[] {
        if (typeof EventName == undefined) 
            return null;
        let events: Event[] = pool[EventName];
        if (!events) 
            return null;
        if (!(events instanceof Array)) {
            events = null;
            delete this._eventsPool[EventName];
        }
        return events;
    }

    /**处理消息 */
    private _dealMsg(): boolean {
        let Msgs: Msg;
        let events: Event[];
        let s: number = GameUtils.GetTime();

        let deal: Function = () => {
            Msgs = this._dealEvents.shift();
            if (!Msgs) return true;  // 全部执行完毕
            events = this._getEventListener(Msgs.msgName, this._nextFrameEventsPool);
            if (!events) return true;

            for (const e of events) {
                if (e.Func && e.thiz) 
                    e.Func.apply(e.thiz, Msgs.args);
            }

            Msgs.dispose();
            this._msgPool.push(Msgs);

            if (GameUtils.GetTime() - s > this._MaxDealConst) 
                return false;
            else 
                return deal();
        }
        return deal();
        
    }
}