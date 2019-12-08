interface ITimerManager {
    /**获取游戏开始到目前的帧数 */
    getFrameId(): number;
    /**获取当前unix时间戳 */
    getCurrTime(): number;
    /**延迟执行 */
    doTimerDelay(startTime: number, delay: number, repeat: number, method: Function, methodObj: any, onFinish: Function, fobj: any): void;
    /**定时执行 */
    doTimer(delay: number, repeat: number, method: Function, methodObj: any, onFinish: Function, fobj: any): void;
    /**下一帧执行 */
    doNext(method: Function, methodObj: any): void;
    /**清理某一定时方法 */
    remove(method: Function, methodObj: any): void;
    /**清理某一对象身上的定时器 */
    removeAll(methodObj: any): void;
    /**检测对象是否包含定时器 */
    isExists(method: Function, methodObj: any): boolean;
}