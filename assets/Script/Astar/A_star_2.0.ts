import { BinaryHeap } from "./BinaryHeap";
import { Tile, TileType } from "../Core/Dungeon/DungeonFactory";
/**
 * A* 进阶
 * 1. 使用二叉堆作为开放列表
 * 2. 初始化格子周围节点作为地图数据储存
 * //// TODO
 * 3. 使用双向
 * 4. 检查当前两点之间是否有需要使用A*的必要
 * 4. 折线优化
 */

export enum SeachType {
    Four = 0,
    Eight
}

export class Neighbour {
    Gird: Gird;
    Const: number;
    constructor (gird: Gird, cons: number) {
        this.Gird = gird;
        this.Const = cons;
    }
}

export class Gird {
    private _g: number = 0;
    private _h: number = 0;
    private _moveConst: number;
    private _position: cc.Vec2;
    private _last: Gird;
    private _GirdType: Tile;

    public neighbours: Neighbour[]; // 相邻节点

    public get GirdType() {
        return this._GirdType;
    }

    public get g(): number {
        return this._g ; 
    }

    public get h(): number {
        return this._h ;
    }

    public get position(): cc.Vec2 {
        return this._position;
    }

    public get parent(): Gird {
        return this._last ;
    }

    public get moveConst() {
        return this._moveConst;
    }

    public set moveConst(v: number) {
        this._moveConst = v;
    }

    public set g(v: number) {
        this._g = v ;
    }

    public set h(v: number) {
        this._h = v ;
    }

    public set parent(v: Gird) {
        this._last = v ;
    }

    public get f(): number {
        return this._g + this._h ;
    }

    constructor(postion: cc.Vec2, girdType?: Tile) {
        if(postion instanceof cc.Vec2) {
            this._position = postion;
            this._GirdType = girdType;
            return ;
        }
        console.error("postion must be cc.vec2");
    }
    

    /**
     * 比对两格子坐标是否相等
     * @param other 
     */
    public equalTo(other: Gird) {
        if (other instanceof Gird) {
            return this._position.equals(other.position);
        }
        return false;
    }

    /**
     * 坐标是否映射到格子本身
     * @param i 
     * @param j 
     */
    public isMapingSelf(i: number, j: number): boolean {
        return this.position.x === j && this.position.y === i;
    }

    /**
     * 当前格子是否可以通行
     */
    public isGirdNotCross(): boolean {
        return this._GirdType === Tile.blank 
            || this._GirdType === Tile.wall 
            // || this._GirdType === Tile.door;
    }

    /**
     * 坐标是否与格子垂直（即在同一垂直线上）
     * @param i 
     * @param j 
     */
    public isSameLineWithGird(i: number, j: number): boolean {
        return this.position.x === j || this.position.y === i;
    }

    public reset() {
        this._g = this._h = 0;
        this._last = null;
    }
}

export default class Astar_s {

    private moveType = SeachType.Eight ;

    private _close: Gird[];
    private _open: BinaryHeap<Gird>;
    private _mapVo: Gird[][];
    private _col: number; // 多少行 对应y值
    private _row: number; // 多少列 对应x值
    
    private static _instance: Astar_s;
    public static ins() {
        if(!this._instance) this._instance = new Astar_s();
        return this._instance ;
    }

    constructor() {
        this._open = new BinaryHeap(v => v.f);
        this._close = [];
    }

    public set MapVo(v: TileType[][]) {
        if(!v) return;
        this._mapVo = [];
        this._col = v.length;
        this._row = v[0].length;

        for (let i = 0; i < v.length; i++) {
            this._mapVo[i] = [];
            const map: TileType[] = v[i];
            for (let j = 0; j < map.length; j++) {
                let step: Gird = new Gird(cc.v2(j, i), v[i][j].type);
                this._mapVo[i].push(step);
            }
        }
        this._initNeighbours();
    }

    private _initNeighbours(): void {
        for (let i = 0; i < this._mapVo.length; i++) {
            const map: Gird[] = this._mapVo[i];
            for (let j = 0; j < map.length; j++) {
                const g: Gird = map[j];
                this._initNeighbour(g);
            }
        }
    }

    private _initNeighbour(g: Gird): void {
        let left: number = Math.max(0, g.position.x - 1);
        let bottom: number = Math.max(0, g.position.y - 1);
        let right: number = Math.min(g.position.x + 1, this._row - 1);
        let top: number = Math.min(g.position.y + 1, this._col - 1);

        g.neighbours = [];
        if (this.moveType === SeachType.Eight) {
            for (let i = bottom; i <= top; i++) {
                for (let j = left; j <= right; j++) {
                    // 跳过自身
                    if (g.isMapingSelf(i, j)) 
                        continue;
                    let neighbour: Gird = this._mapVo[i][j];
                    // 跳过不可通行点
                    if (neighbour.isGirdNotCross()) 
                        continue;
                    let moveConst: number = this._constMove(g, neighbour);
                    g.neighbours.push(new Neighbour(neighbour, moveConst));
                }
            }
        } else if (this.moveType === SeachType.Four) {
            for (let i = bottom; i <= top; i++) {
                for (let j = left; j <= right; j++) {
                    // 跳过自身
                    if (g.isMapingSelf(i, j)) 
                        continue;
                    if (!g.isSameLineWithGird(i, j))
                        continue;
                    let neighbour: Gird = this._mapVo[i][j];
                    // 跳过不可通行点
                    if (neighbour.isGirdNotCross()) 
                        continue;
                    let moveConst: number = this._constMove(g, neighbour);
                    g.neighbours.push(new Neighbour(neighbour, moveConst));
                }
            }

        }
    }

    private _constMove(current: Gird, neighbour: Gird): number {
        if (this.moveType == SeachType.Eight)
            return (current.position.x !== neighbour.position.x) && (current.position.y !== current.position.y) ? Math.SQRT1_2 : 1.0;
        else 
            return 1.0;
    }

    public Search(start: cc.Vec2, finish: cc.Vec2): cc.Vec2[] {
        let s: number = Date.now();
        this.clear();
        let paths = []; 
        let currentStep: Gird = this._GetInitizalGird(start.x, start.y);
        // console.log("start step: ", currentStep);
        // console.log("end step: ", this._mapVo[finish.y][finish.x]);
        while (currentStep) {
            this._close.push(currentStep);
            // 找到终点
            if (currentStep.position.equals(finish)) {
                let tmpStep = currentStep; 
                do {
                    paths.unshift(tmpStep.position);
                    tmpStep = tmpStep.parent;
                } while (tmpStep);
                this.clear();
                break;
            }
            let neighbours: Neighbour[] = currentStep.neighbours;
            for (let i = neighbours.length - 1; i >= 0; --i) {
                let neighbours_Gird = neighbours[i].Gird;
                if (this._close.indexOf(neighbours_Gird) === -1) {
                    let moveConst: number = neighbours[i].Const;
                    if (!this._open.Contains(neighbours_Gird)) {
                        neighbours_Gird.parent = currentStep;
                        neighbours_Gird.g = currentStep.g + moveConst;
                        let distancePoint = neighbours_Gird.position.sub(finish);
                        neighbours_Gird.h = Math.abs(distancePoint.x) + Math.abs(distancePoint.y); 
                        this._open.Insert(neighbours_Gird);
                    } else {
                        if (neighbours_Gird.g > currentStep.g + moveConst) {
                            neighbours_Gird.g = currentStep.g + moveConst; 
                            neighbours_Gird.parent = currentStep;
                            this._open.Remove(neighbours_Gird);
                            this._open.Insert(neighbours_Gird);
                        }
                    }
                    
                }
            }
            currentStep = this._open.Pop();
        }
        console.log(Date.now() - s);
        return paths;
    }

    private _GetInitizalGird(x: number, y: number) {
        let Gird = this._mapVo[y][x];
        return Gird;
    }

    private clear() {
        this._open.Clear((g: Gird) => g.reset());
        this._clearClose();
    }

    private _clearClose(): void {
        let g: Gird;
        while (this._close.length) {
            g = this._close.shift();
            g && g.reset();
        }
    }

}

