import { IState } from "../IState";
import { Miner } from "../../Entity/Miner";
import { MsgInfo } from "../../Message/MsgInfo";
import { MessageDispatcher } from "../../Message/MessageDispatcher";
import { MessageType } from "../../Message/MessageType";
import { EntityConfig } from "../../Config/EntityConfig";
import { Women } from "../../Entity/Women";
import { KeepHouseState } from "../WomenState/KeepHouseState";
import { BaseGameEntity } from "../../Entity/BaseGameEntity";
import { EnterMineAndDigForNugget } from "../MinerState/EnterMineAndDigForNugget";

export class DinnerState implements IState{

    public static Instance: DinnerState = new DinnerState();

    onEnter(Entity: BaseGameEntity): void {
        // 确保矿工处于家中
        console.log(`${Entity.EntityName}正在吃晚饭~`);
        // 3s后告诉自己(这是一个公共状态, 所以此时应该告诉实体本身)晚饭吃完了, Bob开始继续去金矿上班， 然后妻子开始收拾
        MessageDispatcher.Instance.DispatchMessage(Entity.EntityId, Entity.EntityId, MessageType.Eat_Complete, null, 3);
    }

    onExit(Entity: BaseGameEntity): void {
        
    }

    Execute(Entity: BaseGameEntity): void {
        console.log(`${Entity.EntityName}正在吃晚饭~`);
    }

    /** 在家中接受到消息 */
    onMessage(Entity: BaseGameEntity, msgInfo: MsgInfo): boolean {
        if (msgInfo) {
            console.log(`${Entity.EntityName}吃完晚饭了~`);
            if (msgInfo.MsgType === MessageType.Eat_Complete) {
                if (Entity.EntityId === EntityConfig.Miner)  // 男人去上班
                    (<Miner>Entity).StateMachine.ChangeState(EnterMineAndDigForNugget.Instance); 
                else if(Entity.EntityId === EntityConfig.Women)  // 女人开始收拾家务
                    (<Women>Entity).StateMachine.ChangeState(KeepHouseState.Instance);
                return true;
            }
        }
        return void 0;
    }
}