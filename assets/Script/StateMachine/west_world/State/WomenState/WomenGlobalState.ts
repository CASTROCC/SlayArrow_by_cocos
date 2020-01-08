import { IState } from "../IState";
import { Women } from "../../Entity/Women";
import { MsgInfo } from "../../Message/MsgInfo";

export class WomenGlobalState implements IState {
    
    onEnter(Entity: Women) {

    }

    onExit(Entity: Women) {
        
    }

    Execute(Entity: Women) {
        
    }

    /** 全局状态下接受到消息 */
    onMessage(Entity: Women, msgInfo: MsgInfo): boolean {
        return void 0;
    }
}