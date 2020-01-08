import { IState } from "../IState";
import { Miner } from "../../Entity/Miner";
import { LoncationType } from "../../Config/LoncationType";
import { EnterMineAndDigForNugget } from "./EnterMineAndDigForNugget";
import { MsgInfo } from "../../Message/MsgInfo";

export class GoHomeAndSleepReset implements IState{

    public static Instance: GoHomeAndSleepReset = new GoHomeAndSleepReset();

    onEnter(Entity: Miner): void {
        // 确保矿工处于家中
        if (!Entity.isInHome) {
            // 如果人物(进入此状态前)不在家中，则人物移动至家里
            console.log(`${Entity.EntityName}不在家中， 正在移动至家里. 处于: OnEnter`);
            Entity.Location = LoncationType.Home;
        }
    }

    onExit(Entity: Miner): void {
        console.log(`${Entity.EntityName}准备离开家中，当前状态：`, 
        `\n 手上现金数: ${Entity.GoldGarried}`,
        `\n 银行存款数: ${Entity.MoneyInBank}`,
        `\n 饥渴程度: ${Entity.Thirst}`,
        `\n 疲劳程度: ${Entity.Fatigue}`
    );
    }

    Execute(Entity: Miner): void {
        // 确保矿工处于家中
        if (!Entity.isInHome) {
            // 如果人物(进入此状态前)不在家中，则人物移动至家里
            console.log(`${Entity.EntityName}不在家中， 正在移动至家里. 处于: Excute`);
            Entity.Location = LoncationType.Home;
        }
        
        // 休息够了就继续工作
        if (Entity.isMineralFullRelax) {
            Entity.StateMachine.ChangeState(EnterMineAndDigForNugget.Instance);
        } else {
            // 更新实例当前疲劳值
            Entity.updateMineralFatigue();
        }

        console.log(`${Entity.EntityName}正在家里休息，当前状态：`, 
            `\n 手上现金数: ${Entity.GoldGarried}`,
            `\n 银行存款数: ${Entity.MoneyInBank}`,
            `\n 饥渴程度: ${Entity.Thirst}`,
            `\n 疲劳程度: ${Entity.Fatigue}`
        );
    }

    /** 在家中接受到消息 */
    onMessage(Entity: Miner, msgInfo: MsgInfo): boolean {
        return void 0;
    }
}