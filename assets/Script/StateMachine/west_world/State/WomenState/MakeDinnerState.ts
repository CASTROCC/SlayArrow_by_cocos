import { IState } from "../IState";
import { Women } from "../../Entity/Women";
import { GotoToiletState } from "./GotoToiletState";
import { MsgInfo } from "../../Message/MsgInfo";
import { MessageDispatcher } from "../../Message/MessageDispatcher";
import { EntityConfig } from "../../Config/EntityConfig";
import { MessageType } from "../../Message/MessageType";
import { DinnerState } from "../CommonState/DinnerState";

/// 做家务状态
export class MakeDinnerState implements IState {

    public static Instance: MakeDinnerState = new MakeDinnerState();

    onExit(Entity: Women) {
        console.log(`${Entity.EntityName}做好了晚饭~`);
    }

    onEnter(Entity: Women) {
        console.log(`${Entity.EntityName}准备做晚饭了~`);
        // 设置一个延迟消息(2s后)告诉女人晚饭做好了
        MessageDispatcher.Instance.DispatchMessage(Entity.EntityId, Entity.EntityId, MessageType.Eat_Dinner, null, 2);
    }

    Execute(Entity: Women) {       
        console.log(`${Entity.EntityName}正在做晚饭~`);
    }

    /** 在做家务状态下接受到消息 */
    onMessage(Entity: Women, msgInfo: MsgInfo): boolean {
        if (msgInfo) {
            if (msgInfo.MsgType === MessageType.Eat_Dinner) {
                // 女人开始吃完饭
                Entity.StateMachine.ChangeState(DinnerState.Instance);
                // 同时告诉老公开始吃晚饭
                MessageDispatcher.Instance.DispatchMessage(Entity.EntityId, EntityConfig.Miner, MessageType.Eat_Dinner, null, -1);
                return true;
            }
        }

        return void 0;
    }   
}