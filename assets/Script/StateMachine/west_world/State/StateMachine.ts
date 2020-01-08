import { BaseGameEntity } from "../Entity/BaseGameEntity";
import { IState } from "./IState";
import { IStateMachine } from "./IStateMachine";
import { MsgInfo } from "../Message/MsgInfo";

export class StateMachine extends IStateMachine{
    
    private m_Entity: BaseGameEntity;

    private m_PreState: IState;
    private m_GlobalState: IState;
    private m_CurrState: IState;

    constructor (Entity: BaseGameEntity) {
        super();
        if (!Entity) {
            console.error("没有游戏实体.");
            return;
        }
        this.m_Entity = Entity;
    }

    public set PreState(preState: IState) {
        this.m_PreState = preState;
    }

    public set GlobalState(globalState: IState) {
        this.m_GlobalState = globalState;
    }

    public set CurrState(currState: IState) {
        this.m_CurrState = currState;
    }

    /// 更新状态
    public Update(): void {
        if (this.m_GlobalState)
            this.m_GlobalState.Execute(this.m_Entity);

        if (this.m_CurrState) 
            this.m_CurrState.Execute(this.m_Entity);
    }

    /// 更改状态
    public ChangeState(currState: IState): void {
        if (this.m_CurrState) {
            this.m_CurrState.onExit(this.m_Entity);
            this.m_PreState = this.m_CurrState;
        }
        this.m_CurrState = currState;
        this.m_CurrState.onEnter(this.m_Entity);
    }

    /// 返回上一状态
    public RevertoPreviousState(): void {
        this.ChangeState(this.m_PreState);
    }

    /// 接受到消息
    public HandleMessage(msgInfo: MsgInfo): boolean {
        // 如果是在当前状态逻辑下处理该消息(并成功完成消息逻辑)
        if (this.CurrState && this.CurrState.onMessage(this.m_Entity, msgInfo)) 
            return true;

        // 全局状态逻辑下完成消息处理
        if (this.GlobalState && this.GlobalState.onMessage(this.m_Entity, msgInfo))
            return true;
            
        return false;
    }

}