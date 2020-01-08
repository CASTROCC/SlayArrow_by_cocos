import { IState } from "../IState";
import { Women } from "../../Entity/Women";
import { KeepHouseState } from "./KeepHouseState";
import { MsgInfo } from "../../Message/MsgInfo";

export class GotoToiletState implements IState {
    
    public static Instance: GotoToiletState = new GotoToiletState();

    onExit(Entity: Women) {
        console.log(`${Entity.EntityName}准备离开厕所，当前状态：`, 
            `\n 当前想上厕所程度: ${Entity.GotoToiletDeg}`
        );
    }

    onEnter(Entity: Women) {
        console.log(`${Entity.EntityName}准备开始上厕所，当前状态：`, 
            `\n 当前想上厕所程度: ${Entity.GotoToiletDeg}`
        );
    }

    Execute(Entity: Women) {
        Entity.UpdateGoToiletDet();

        // 上完厕所 回到上一状态
        if (Entity.isNotWannaToilet) 
            Entity.StateMachine.RevertoPreviousState();
            
        console.log(`${Entity.EntityName}正在上厕所，当前状态：`, 
            `\n 当前想上厕所程度: ${Entity.GotoToiletDeg}`
        );
    }

    /** 在上厕所状态下接受到消息 */
    onMessage(tRole: Women, msgInfo: MsgInfo): boolean {

        return void 0;
    }

}