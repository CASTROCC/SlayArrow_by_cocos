import { MsgInfo } from "./MsgInfo";
import { BaseGameEntity } from "../Entity/BaseGameEntity";
import { EntityManager } from "./EntityManager";
import TimerManager from "../../../Core/Manager/TimerManager";

//// 管理消息发送类
export class MessageDispatcher {

    public static Instance: MessageDispatcher = new MessageDispatcher();

    private m_Dispatcher(Entity: BaseGameEntity, msgInfo: MsgInfo): void {
        if (Entity) 
            Entity.HandleMessage(msgInfo);
    }   

    public DispatchMessage(senderID: number, recevierID: number, msgType: number, extralInfo: any, delay: number = -1): void {
        let m_MsgInfo: MsgInfo = new MsgInfo(senderID, recevierID, msgType, Date.now(), extralInfo);
        let entity = EntityManager.Instance.GetEntityById(recevierID);
        if (delay === -1) {
            this.m_Dispatcher(entity, m_MsgInfo);
        } else if (delay === 0) {
            (<TimerManager>TimerManager.ins()).doNext(this.m_Dispatcher, this, [entity, m_MsgInfo]);
        } else {
            // TimerManager.ins().doTimerDelay 
            (<TimerManager>TimerManager.ins()).doTimerDelay(Date.now(), delay * 1000, 1, this.m_Dispatcher, this, [entity, m_MsgInfo]);
        }
    }
    
}