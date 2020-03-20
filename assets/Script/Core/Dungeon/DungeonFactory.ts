import Dungeon from "./dungeon";

export enum Tile {
    blank       = 0, // 空白区域 不可通行
    wall        = 1, // 墙壁 不可通行
    floor       = 2, // 地板 # 可通行
    door        = 3, // 门 不可通行(暂定)
    stairsUp    = 4, // 向上楼梯 # 可通行
    stairsDown  = 5  // 向下楼梯 # 可通行
}

export type TileType = {
    type: number;
    hasBennSeen: boolean;
}

export class DungeonFactory {

    constructor() {}

    private _dungeon: Dungeon;
    public static Ins: DungeonFactory = new DungeonFactory();

    public genertor(w: number, h: number): TileType[][] {
        // create a dungeon
        this._dungeon = new Dungeon(w, h);
        this._dungeon.generate();

        // // the current collision map for the dungeon
        // this.collisionMap = this.dungeon.getCollisionMap();

        // the tiles in the map
        return this._dungeon.getFlattenedTiles();
    }

    public getStair(): cc.Vec2 {
        let stairs = this._dungeon.getStairs();
        return cc.v2(stairs.up.x, stairs.up.y);
    }


}
