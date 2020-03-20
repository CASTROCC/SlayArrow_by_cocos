import { BaseLivingEntity } from "./BaseLivingEntity";

export abstract class MovingEntity extends BaseLivingEntity{
    
    abstract Update(time_elapsed: number): void;

    abstract Render(): void;

    abstract Volovity(): cc.Vec2;

    abstract Mass(): number;

    abstract Heading(): cc.Vec2;

    abstract MaxSpeed(): number;

    abstract MaxForce(): number;

    abstract MaxTurnRate(): number;
    
} 