/**
 * @anthor Superman
 * @time 2020-01-03 18:03:03
 * @desc 状态机设计模式
 */

////////// 状态基类 /////////////////
abstract class IState {

    constructor() {
    }
    
    // 状态自身对应的行为
    abstract Execute(tRole: IRole): void;

    // 退出状态
    abstract onExit(tRole: IRole): void;

    // 进入状态
    abstract onEnter(tRole: IRole): void;
}


////////// 人物行为类 /////////////////
abstract class IRole {

    // 上一状态
    m_preState: IState;

    // 当前状态
    m_currState: IState;

    // 当前人物是否安全
    abstract isSafe(): boolean; 

    // 当前人物是否受到威胁
    abstract isThreatened(): boolean;

    // 逃离敌人
    abstract MoveAwayFromEnemy(): void;
    
    // 打鼾
    abstract Snore(): void;
    
    /** 执行当前状态对应的行为 */
    protected update(): void {
        this.m_currState.Execute(this);
    }

    /** 改变状态, 在改变状态这一次更新中，只执行状态的进入及状态的退出，不执行状态自身对应的执行 */
    public setCurrState(state: IState) {

        if (this.m_currState) {
            this.m_currState.onExit(this);
        }

        if (state) {
            // 如果没有上一状态，则将其定义为当前状态
            this.m_preState = this.m_currState || state;

            this.m_currState = state;
            this.m_currState.onEnter(this);
        }
    }
}

/**************************************** 子状态(开始) *********************************************************/
/** 奔跑状态 */
class State_Run extends IState {
    
    constructor () {
        super();
    }

    /** 执行Run状态对应的行为 */
    public Execute(tRole: IRole): void {
        if (tRole.isSafe()) {
            // 如果目标觉得安全(在奔跑状态下)，则进入睡觉状态
            tRole.setCurrState(new State_Sleep());
        } else {
            // 否则目标逃离威胁
            tRole.MoveAwayFromEnemy();
        }
    }

    /** 执行进入Run状态时的行为 */
    public onEnter(tRole: IRole): void {
        
    }

    /** 执行退出Run状态时的行为 */
    public onExit(tRole: IRole): void {

    }

}

/** 睡觉状态 */
class State_Sleep extends IState {

    constructor () {
        super();
    }

    /** 执行Sleep状态对应的行为 */
    public Execute(tRole: IRole): void {
        if (tRole.isThreatened()) {
            // 如果目标受到威胁(在睡觉状态下), 则进入奔跑状态
            tRole.setCurrState(new State_Run());
        } else {
            // 否则继续睡觉(打鼾)
            tRole.Snore();
        }
    }

    /** 执行进入Run状态时的行为 */
    public onEnter(tRole: IRole): void {
        
    }

    /** 执行退出Run状态时的行为 */
    public onExit(tRole: IRole): void {
        
    }
}
/**************************************** 子状态(结束) *********************************************************/

// test
export class Role extends IRole {

    private _threatenedCount: number = 0;

    constructor() {
        super();
        this.m_currState = new State_Sleep();

        setInterval(() => this.update(), 1000);
    }

    public update() {
        super.update();
        ++this._threatenedCount;
    }

    public isSafe(): boolean {
        return this._threatenedCount < 5 && this._threatenedCount >= 0;
    }

    public isThreatened(): boolean {
        return this._threatenedCount >= 5;
    }

    // 逃离敌人
    public MoveAwayFromEnemy(): void {
        this._threatenedCount = 0;
        console.log("逃离敌人啦~");
    }
    
    // 打鼾
    public Snore(): void {
        console.log("zzzzzzz~");
    }
}

// new Role();
