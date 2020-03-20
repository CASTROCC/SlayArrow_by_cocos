import { Vehicle } from "./Vehicle";

export interface ISteeringBehaviors {
    
    Seek(Heading: cc.Vec2): cc.Vec2;
    Flee(Heading: cc.Vec2): cc.Vec2;
    Arrive(Heading: cc.Vec2): cc.Vec2;

    Calculate(): cc.Vec2;
    ForwardComponent(): cc.Vec2;
    SideComponent(): cc.Vec2;

    SetPath(): void;
    SetTarget(Target_Pos: cc.Vec2): void;
    SetTargetAgent1(veh: Vehicle): void;
    SetTargetAgent2(veh: Vehicle): void;

    SeekOn(): void;
    FleeOn(): void;
    ArriveOn(): void;

    SeekOff(): void;
    FleeOff(): void;
    ArriveOff(): void;
}