import { BaseGameEntity } from "./BaseGameEntity";
import { EntityConfig } from "../Config/EntityConfig";
import { StateMachine } from "../State/StateMachine";
import { KeepHouseState } from "../State/WomenState/KeepHouseState";
import { MsgInfo } from "../Message/MsgInfo";

export class Women extends BaseGameEntity {

    /** 人物状态机 */
    private m_StateMachine: StateMachine;
    
    /** 人物想上厕所程度 */
    private m_GotoToiletDeg: number;

    /** 获取人物想上厕所程度 */
    public get GotoToiletDeg(): number {
        return this.m_GotoToiletDeg;
    }

    /** 获取人物状态机 */
    public get StateMachine(): StateMachine {
        return this.m_StateMachine;
    }

    /** 更新想上厕所值 */
    public UpdateGoToiletDet() {
        this.m_GotoToiletDeg -= 2;
    }

    /** 想上厕所了吗 */
    public get isWannaToilet(): boolean {
        return this.m_GotoToiletDeg >= 6;
    }

    /** 不想上厕所了吗 */
    public get isNotWannaToilet(): boolean {
        return this.m_GotoToiletDeg <= 0;
    }

    constructor(enumID: EntityConfig) {
        super(enumID);

        this.m_GotoToiletDeg            = 0;
        this.m_StateMachine             = new StateMachine(this);
        this.m_StateMachine.CurrState   = KeepHouseState.Instance;

        setInterval(() => this.update(), 1000);
    }

    update() {
        this.m_GotoToiletDeg += 1;
        this.m_StateMachine.Update();
    }

    HandleMessage(msgInfo: MsgInfo): boolean {
        return this.StateMachine.HandleMessage(msgInfo);
    }
}