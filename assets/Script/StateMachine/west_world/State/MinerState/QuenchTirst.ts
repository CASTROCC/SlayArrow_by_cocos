import { IState } from "../IState";
import { Miner } from "../../Entity/Miner";
import { LoncationType } from "../../Config/LoncationType";
import { EnterMineAndDigForNugget } from "./EnterMineAndDigForNugget";
import { MsgInfo } from "../../Message/MsgInfo";

export class QuenchTirst implements IState{

    public static Instance: QuenchTirst = new QuenchTirst();

    onEnter(Entity: Miner): void {
        // 确保矿工处于酒吧
        if (!Entity.isInHome) {
            // 如果人物(进入此状态前)不在酒吧，则人物移动至酒吧
            console.log(`${Entity.EntityName}不在酒吧， 正在移动至酒吧. 处于: OnEnter`);
            Entity.Location = LoncationType.Home;
        }
    }

    onExit(Entity: Miner): void {
        console.log(`${Entity.EntityName}准备离开酒吧，当前状态：`, 
        `\n 手上现金数: ${Entity.GoldGarried}`,
        `\n 银行存款数: ${Entity.MoneyInBank}`,
        `\n 饥渴程度: ${Entity.Thirst}`,
        `\n 疲劳程度: ${Entity.Fatigue}`
        );
    }

    Execute(Entity: Miner): void {
        // 确保矿工处于酒吧
        if (!Entity.isInHome) {
            // 如果人物(进入此状态前)不在酒吧，则人物移动至酒吧
            console.log(`${Entity.EntityName}不在酒吧， 正在移动至酒吧. 处于: OnEnter`);
            Entity.Location = LoncationType.Home;
        }

        // 如果吃饱喝足了， 就继续工作
        if (Entity.isMineralFullThirst) {
            Entity.StateMachine.ChangeState(EnterMineAndDigForNugget.Instance);
        } else {
            // 否则继续休息
            Entity.updateMineralThirst();
        }

        console.log(`${Entity.EntityName}正在酒吧喝酒，当前状态：`, 
            `\n 手上现金数: ${Entity.GoldGarried}`,
            `\n 银行存款数: ${Entity.MoneyInBank}`,
            `\n 饥渴程度: ${Entity.Thirst}`,
            `\n 疲劳程度: ${Entity.Fatigue}`
        )
    }

    onMessage(Entity: Miner, msgInfo: MsgInfo): boolean {
        return void 0;
    }
}