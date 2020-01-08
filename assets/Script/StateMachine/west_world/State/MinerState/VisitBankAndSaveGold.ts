import { IState } from "../IState";
import { Miner } from "../../Entity/Miner";
import { LoncationType } from "../../Config/LoncationType";
import { GoHomeAndSleepReset } from "./GoHomeAndSleepReset";
import { EnterMineAndDigForNugget } from "./EnterMineAndDigForNugget";
import { MsgInfo } from "../../Message/MsgInfo";

export class VisitBankAndSaveGold implements IState{

    public static Instance: VisitBankAndSaveGold = new VisitBankAndSaveGold();

    onEnter(Entity: Miner): void {
        // 确保矿工处于银行中
        if (!Entity.isInBank) {
            // 如果人物(进入此状态前)不在银行，则人物移动至银行
            console.log(`${Entity.EntityName}不在银行里， 正在移动至银行. 处于: OnEnter`);
            Entity.Location = LoncationType.Bank;
        }
    }

    onExit(Entity: Miner): void {
        console.log(`${Entity.EntityName}准备离开银行，当前状态：`, 
            `\n 手上现金数: ${Entity.GoldGarried}`,
            `\n 银行存款数: ${Entity.MoneyInBank}`,
            `\n 饥渴程度: ${Entity.Thirst}`,
            `\n 疲劳程度: ${Entity.Fatigue}`
        );
    }

    Execute(Entity: Miner): void {
         // 确保矿工处于银行中
         if (!Entity.isInBank) {
            // 如果人物(进入此状态前)不在银行，则人物移动至银行
            console.log(`${Entity.EntityName}不在银行里， 正在移动至银行. 处于: Excute`);
            Entity.Location = LoncationType.Bank;
            return;
        }
        // 将现金存入银行
        Entity.updateMinerMoneyBank();

        // 如果矿工已时间财富自由
        if (Entity.mineralMoneyIsFree) {
            // 则矿工进入回家混吃等死状态
            Entity.StateMachine.ChangeState(GoHomeAndSleepReset.Instance);
        } else {
            // 否则继续搬砖
            Entity.StateMachine.ChangeState(EnterMineAndDigForNugget.Instance);
        }

        console.log(`${Entity.EntityName}正在银行存钱，当前状态：`, 
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