import { IGameWorld } from "./IGameWorld";
import { ISteeringBehaviors } from "./ISteeringBehaviors";

export abstract class Vehicle {
    
    abstract Update(time_elapsed): void;

    abstract Render(): void;

    GameWorld: IGameWorld;

    SteeringBehaviors: ISteeringBehaviors;
}