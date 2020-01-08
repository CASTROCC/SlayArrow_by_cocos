import { BaseGameEntity } from "../Entity/BaseGameEntity";

export class EntityManager {
    
    public static Instance: EntityManager = new EntityManager();

    private m_EntityDirection: {
        [ID: number]: BaseGameEntity
    } = {};

    constructor() {}

    public RemoveEntityById(ID: number): void {
        let Entity = this.m_EntityDirection[ID];
        if (Entity) {
            Entity = null;
            delete this.m_EntityDirection[ID];
        }
    }

    public RegisterEntity(Entity: BaseGameEntity): void {
        if (!Entity) {
            console.error("no Entity.");
            return;
        }
        this.m_EntityDirection[Entity.EntityId] = Entity;
    }

    public GetEntityById(ID: number): BaseGameEntity {
        return this.m_EntityDirection[ID];
    }   
}