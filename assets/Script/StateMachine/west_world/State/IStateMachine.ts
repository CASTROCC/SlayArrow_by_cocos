import { IState } from "./IState";
import { MsgInfo } from "../Message/MsgInfo";

export abstract class IStateMachine {

    abstract Update(delta: number): void; // 更新函数
    abstract ChangeState(newState: IState): void; // 更改状态
    abstract RevertoPreviousState(): void; // 回到上一状态
    abstract HandleMessage(msgInfo: MsgInfo): boolean; // 处理消息
}