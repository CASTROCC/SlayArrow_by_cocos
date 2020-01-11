import { BaseGameEntity } from "./BaseGameEntity";
import { LoncationType } from "../Config/LoncationType";
import { EntityConfig, MinerConfig } from "../Config/EntityConfig";
import { StateMachine } from "../State/StateMachine";
import { EnterMineAndDigForNugget } from "../State/MinerState/EnterMineAndDigForNugget";
import { MinerGlobalState } from "../State/MinerState/MinerGlobalState";
import { MsgInfo } from "../Message/MsgInfo";

///////////// Miner //////////////////////
export class Miner extends BaseGameEntity {

    /** 矿工当前所处的位置 */
    private m_Location: LoncationType;

    /** 矿工当前挖得的金矿数 */
    private m_GoldGarried: number;

    /** 矿工当前在银行存了多少钱 */
    private m_MoneyInBank: number;

    /** 矿工当前饥渴程度(值越高表示越饥渴) */
    private m_Thirst: number;

    /** 矿工当前疲劳程度(值越高表示越劳累) */
    private m_Fatigue: number;

    /** 矿工自身状态机 */
    private m_StateMachine: StateMachine;

    constructor(enumID: EntityConfig) {
        super(enumID);

        this.m_StateMachine = new StateMachine(this);
        this.m_StateMachine.CurrState = EnterMineAndDigForNugget.Instance;
        this.m_StateMachine.GlobalState = MinerGlobalState.Instance;
        
        this.m_GoldGarried = 0;
        this.m_MoneyInBank = 0;
        this.m_Thirst      = 0;
        this.m_Fatigue     = 0;

        setInterval(() => this.update(), 1000);
    }

    /** 当前所处的位置 */
    public get Location(): LoncationType {
        return this.m_Location;
    }

    /** 当前手中的金矿数 */
    public get GoldGarried(): number {
        return this.m_GoldGarried;
    }

    /** 银行中的存款 */
    public get MoneyInBank(): number {
        return this.m_MoneyInBank;
    }

    /** 饥渴程度 */
    public get Thirst(): number {
        return this.m_Thirst;
    }

    /** 疲劳程度 */
    public get Fatigue(): number {
        return this.m_Fatigue;
    }

    /** 获取人物当前状态机 */
    public get StateMachine(): StateMachine {
        return this.m_StateMachine;
    }

    /** 是否位于矿洞 */
    public get isInMineral(): boolean {
        return this.m_Location === LoncationType.Mineral_Estate;
    }

    /** 是否位于银行 */
    public get isInBank(): boolean {
        return this.m_Location === LoncationType.Bank;
    }

    /** 是否位于家中 */
    public get isInHome(): boolean {
        return this.m_Location === LoncationType.Home;
    }

    /** 是否位于酒吧 */
    public get isInBar(): boolean {
        return this.m_Location === LoncationType.Bar;
    }

    /** 更改矿工所处位置 */
    public set Location(location: LoncationType) {
        if (location == this.m_Location)
            return;
        
        this.m_Location = location;
    }

    /** 添加矿工拥有的金子数量 */
    public addMinerGoldNum(goldNum: number): void {
        if (isNaN(goldNum) || goldNum <= 0)
            return;  
        this.m_GoldGarried += goldNum;
    }

     /** 更新矿工银行存款数量 */
     public updateMinerMoneyBank(): void {
        this.m_MoneyInBank += this.m_GoldGarried;
        this.m_GoldGarried = 0;
    }

    /** 矿工处于挖矿状态下，更新矿工的体力值与疲劳值 */
    public updateWrokingHealthy(): void {
        this.m_Thirst += .2; 
        this.m_Fatigue += .2;
    }

    /** 矿工的现金数是否达到所能携带的最大值 */
    public get mineralGoldisFull(): boolean {
        return this.m_GoldGarried >= MinerConfig.MaxGoldGarried; 
    }

    /** 矿工是否已经实现财富自由 */
    public get mineralMoneyIsFree(): boolean {
        return this.m_MoneyInBank >= MinerConfig.MaxMoneyBank;
    }

    /** 矿工是否已经渴的不行了 */
    public get mineralIsThirst(): boolean {
        return this.m_Thirst >= MinerConfig.MaxThirst;
    }

    /** 更新矿工当前饥渴值 */
    public updateMineralThirst(): void {
        this.m_Thirst -= 4;
        // this.m_GoldGarried -= 1;
    }

    /** 矿工是否已经吃饱喝足 */
    public get isMineralFullThirst(): boolean {
        return this.m_Thirst <= MinerConfig.MinThirst;
    }

    /** 矿工是否已经累趴下了 */
    public get mineralIsFatigue(): boolean {
        return this.m_Fatigue >= MinerConfig.MaxFatigue;
    }

    /** 矿工处于休息状态下，更新矿工的体力值 */
    public updateMineralFatigue(): void {
        this.m_Fatigue -= 1;
    }

    /** 矿工当前是否休息满 */
    public get isMineralFullRelax(): boolean {
        return this.m_Fatigue <= MinerConfig.MinFatigue;
    }

    /** 矿工状态更新 */
    public update(): void {
        /** 更新矿工的饥渴值 */
        this.m_Thirst += 1;
        /** 更新人物当前状态机 */
        this.m_StateMachine.Update();
    }

    HandleMessage(msgInfo: MsgInfo): boolean {
        return this.StateMachine.HandleMessage(msgInfo);
    }

}