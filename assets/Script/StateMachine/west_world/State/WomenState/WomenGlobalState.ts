import { IState } from "../IState";
import { Women } from "../../Entity/Women";
import { MsgInfo } from "../../Message/MsgInfo";
import { MessageType } from "../../Message/MessageType";
import { MakeDinnerState } from "./MakeDinnerState";

export class WomenGlobalState implements IState {

    public static Instance: WomenGlobalState = new WomenGlobalState();

    onEnter(Entity: Women) {

    }

    onExit(Entity: Women) {
        
    }

    Execute(Entity: Women) {
        
    }

    /** 全局状态下接受到消息 */
    onMessage(Entity: Women, msgInfo: MsgInfo): boolean {
        if (msgInfo) {
            if (msgInfo.MsgType === MessageType.Hi_Baby_IamGohome) {
                console.log("老公回家了, 该去做饭啦~");
                Entity.StateMachine.ChangeState(MakeDinnerState.Instance); // 女人开始去做晚饭
                return true;
            }
        }

        return void 0;
    }
}