export abstract class BaseLivingEntity {


    abstract Update(time_elapsed: number): void;

    abstract Render(): void;
    
    abstract ID(): number;

    abstract Pos(): cc.Vec2;

    abstract Scale(): number;

    abstract Bradius(): number; /// 半径

}