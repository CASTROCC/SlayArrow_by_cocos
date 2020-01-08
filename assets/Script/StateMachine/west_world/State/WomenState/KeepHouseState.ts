import { IState } from "../IState";
import { Women } from "../../Entity/Women";
import { GotoToiletState } from "./GotoToiletState";
import { MsgInfo } from "../../Message/MsgInfo";

/// 做家务状态
export class KeepHouseState implements IState {

    public static Instance: KeepHouseState = new KeepHouseState();

    onExit(Entity: Women) {
        console.log(`${Entity.EntityName}准备离开家务，当前状态：`, 
            `\n 当前想上厕所程度: ${Entity.GotoToiletDeg}`
        );
    }

    onEnter(Entity: Women) {
        console.log(`${Entity.EntityName}准备开始做家务，当前状态：`, 
            `\n 当前想上厕所程度: ${Entity.GotoToiletDeg}`
        );
    }

    Execute(Entity: Women) {       
        // 想上厕所
        if (Entity.isWannaToilet) 
            Entity.StateMachine.ChangeState(GotoToiletState.Instance);

        console.log(`${Entity.EntityName}正在做家务，当前状态：`, 
            `\n 当前想上厕所程度: ${Entity.GotoToiletDeg}`
        );
    }

    /** 在做家务状态下接受到消息 */
    onMessage(Entity: Women, msgInfo: MsgInfo): boolean {
        return void 0;
    }   
}