import { IState } from "../IState";
import { Miner } from "../../Entity/Miner";
import { LoncationType } from "../../Config/LoncationType";
import { VisitBankAndSaveGold } from "./VisitBankAndSaveGold";
import { QuenchTirst } from "./QuenchTirst";
import { MsgInfo } from "../../Message/MsgInfo";

export class EnterMineAndDigForNugget implements IState{

    public static Instance: EnterMineAndDigForNugget = new EnterMineAndDigForNugget();

    onEnter(Entity: Miner): void {
        // 确保矿工处于金矿中
        if (!Entity.isInMineral) {
            // 如果人物(进入此状态前)不在矿洞，则人物进入矿洞
            console.log(`${Entity.EntityName}不在矿洞中， 正在移动至矿洞. 处于: OnEnter`);
            Entity.Location = LoncationType.Mineral_Estate;
        }
    }

    onExit(Entity: Miner): void {
        console.log(`${Entity.EntityName}准备离开矿洞，当前状态：`, 
            `\n 手上现金数: ${Entity.GoldGarried}`,
            `\n 银行存款数: ${Entity.MoneyInBank}`,
            `\n 饥渴程度: ${Entity.Thirst}`,
            `\n 疲劳程度: ${Entity.Fatigue}`
        );
    }

    Execute(Entity: Miner): void {
        if (!Entity.isInMineral) {
            // 当挖矿动作执行时， 如果矿工还不在矿洞内
            console.log(`${Entity.EntityName}不在矿洞中， 正在移动至矿洞. 处于: Execute`);
            Entity.Location = LoncationType.Mineral_Estate;
            return;
        }

        // 添加矿工拥有的金子数量
        Entity.addMinerGoldNum(1);
        // 增加矿工当前的体力值与口渴值
        Entity.updateWrokingHealthy();
        // 如果矿工当前有足够多的现金
        if (Entity.mineralGoldisFull) {
            // 去银行存钱
            Entity.StateMachine.ChangeState(VisitBankAndSaveGold.Instance);
        }

        // 如果矿工感觉口渴
        if (Entity.mineralIsThirst) {
            // 去酒吧饮酒
            Entity.StateMachine.ChangeState(QuenchTirst.Instance);
        }   

        // // 如果矿工已经累趴下了
        // if (Entity.mineralIsFatigue) {
        //     // 回家休息
        //     Entity.ChangeState(GoHomeAndSleepReset.Instance);
        // }

        console.log(`${Entity.EntityName}正在矿洞挖矿，当前状态：`, 
            `\n 手上现金数: ${Entity.GoldGarried}`,
            `\n 银行存款数: ${Entity.MoneyInBank}`,
            `\n 饥渴程度: ${Entity.Thirst}`,
            `\n 疲劳程度: ${Entity.Fatigue}`
        )
    }

    /** 在家中接受到消息 */
    onMessage(Entity: Miner, msgInfo: MsgInfo): boolean {

        return void 0;
    }
}