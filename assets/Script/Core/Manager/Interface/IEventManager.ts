interface IEventManager {
    /**添加事件监听 */
    addEventListener(EventName: string, Func: Function, thiz: any): void;
    /**添加需要分帧处理的事件监听 */
    addNFrameEventListener(EventName: string, Func: Function, thiz: any): void;
    /**激活分帧事件 */
    dispatchNFrameEventListener(EventName: string, ...args: any[]): void;
    /**移除事件 */
    removeEventListener(EventName: string): void;
    /**激活事件 */
    dispatchEventListener(EventName: string, ...args: any[]): void;
    /**移除所有事件(常规) */
    removeAllEventListener(): void;
    /**注册单次事件 */
    once(EventName: string, ...args: any[]): void;
}