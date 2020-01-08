import { IState } from "../State/IState";
import { EntityNames, EntityConfig } from "../Config/EntityConfig";
import { MsgInfo } from "../Message/MsgInfo";

//////////////// 游戏实体基类 //////////////////////
export abstract class BaseGameEntity {
    
    private m_EntityId: number;   

    /** 当实体被实例化后的下一个有效ID. 每实例一个实体 该值就更新一次 */
    private static m_iNextValidId: number = 0;

    constructor(EnityId: EntityConfig) {
        this.setEntityId(<number>EnityId);
    }

    // 游戏实体的更新操作
    abstract update(): void;
    abstract HandleMessage(msgInfo: MsgInfo): boolean;

    private setEntityId(EntityId: number) {
        if (isNaN(EntityId))
            return;

        if (this.m_EntityId === EntityId)
            return;
        
        if (EntityId > BaseGameEntity.m_iNextValidId) 
            return;

        this.m_EntityId = EntityId;
        BaseGameEntity.m_iNextValidId = this.m_EntityId + 1;
    }

    /** 实体ID */
    public get EntityId(): number {
        return this.m_EntityId;
    }  

    /** 实体名称 */
    public get EntityName(): string {
        let name: string = EntityNames[this.m_EntityId];
        return name;
    }

}