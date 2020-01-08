import { BaseGameEntity } from "../Entity/BaseGameEntity";
import { MsgInfo } from "../Message/MsgInfo";

/// 当使用单列状态时, 状态中不允许存在自身局部的，智能体专用的数据;
/// 如果一个状态需要频繁的访问局部数据，应该避免使用单列状态机。

////////// 状态基类 /////////////////
export interface IState {    
    
    // 状态自身对应的行为
    Execute(tRole: BaseGameEntity): void;

    // 退出状态
    onExit(tRole: BaseGameEntity): void;

    // 进入状态
    onEnter(tRole: BaseGameEntity): void;

    // 接受到消息
    onMessage(tRole: BaseGameEntity, msgInfo: MsgInfo): boolean;
}
