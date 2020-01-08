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

    public static Ins: DungeonFactory = new DungeonFactory();

    public genertor(w: number, h: number): TileType[][] {
        // create a dungeon
        let dungeon: Dungeon = new Dungeon(w, h);
        dungeon.generate();

        // // the current collision map for the dungeon
        // this.collisionMap = this.dungeon.getCollisionMap();

        // the tiles in the map
        return dungeon.getFlattenedTiles();
    }


}
