export interface IGameWorld {

    Update(time_elapsed: number): void;

    Render(): void;
}