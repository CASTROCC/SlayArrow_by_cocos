import { MapType } from "../Maze";
import { BinaryHeap } from "./BinaryHeap";
/**
 * A* 进阶
 * 1. 使用二叉堆作为开放列表
 * 2. 初始化格子周围节点作为地图数据储存
 * //// TODO
 * 3. 使用双向
 * 4. 检查当前亮点之间是否有需要使用A*的必要
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
    private _GirdType: MapType;

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

    constructor(postion: cc.Vec2, girdType?: MapType) {
        if(postion instanceof cc.Vec2) {
            this._position = postion;
            this._GirdType = girdType;
            return ;
        }
        console.error("postion must be cc.vec2");
    }
    
    public equalTo(other: Gird) {
        if (other instanceof Gird) {
            return this._position.equals(other.position);
        }
        return false;
    }
}

export default class Astar_s {

    private moveType = SeachType.Four ;

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
    }

    public set MapVo(v: number[][]) {
        if(!v) return;

        this._mapVo = [];
        this._col = v.length;
        this._row = v[0].length;

        for (let i = 0; i < v.length; i++) {
            this._mapVo[i] = [];
            const map: number[] = v[i];
            for (let j = 0; j < map.length; j++) {
                let step: Gird = new Gird(cc.v2(j, i), v[i][j]);
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
        let startX: number = Math.max(0, g.position.x - 1);
        let startY: number = Math.max(0, g.position.y - 1);
        let endX: number = Math.min(g.position.x + 1, this._row - 1);
        let endY: number = Math.min(g.position.y + 1, this._col - 1);

        g.neighbours = [];
        if (this.moveType === SeachType.Eight) {
            for (let i = startY; i <= endY; i++) {
                for (let j = startX; j <= endX; j++) {
                    // 跳过自身
                    if (g.position.x === j && g.position.y === i) 
                        continue;
                    let gird: Gird = this._mapVo[i][j];
                    // 跳过不可通行点
                    if (gird.GirdType === MapType.NotCorss) 
                        continue;
                    let moveConst: number = this._constMove(g, gird);
                    g.neighbours.push(new Neighbour(gird, moveConst));
                }
            }
        } else if (this.moveType === SeachType.Four) {
            for (let i = startY; i <= endY; i++) {
                for (let j = startX; j <= endX; j++) {
                    // 跳过自身
                    if (g.position.x === j && g.position.y === i) 
                        continue;
                    if (!(g.position.x == j || g.position.y == i))
                        continue;
                    let gird: Gird = this._mapVo[i][j];
                    // 跳过不可通行点
                    if (gird.GirdType === MapType.NotCorss) 
                        continue;
                    let moveConst: number = this._constMove(g, gird);
                    g.neighbours.push(new Neighbour(gird, moveConst));
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

    public moveToward(start: cc.Vec2, finish: cc.Vec2): cc.Vec2[] {
        let s: number = Date.now();
        this._open.Clear();
        this._close = [];
        let paths = []; 
        let currentStep: Gird = this._GetInitizalGird(start.x, start.y);
        while (currentStep) {
            this._close.push(currentStep);
            // 找到终点
            if (currentStep.position.equals(finish)) {
                let tmpStep = currentStep; 
                do {
                    paths.unshift(tmpStep.position);
                    tmpStep = tmpStep.parent;
                } while (tmpStep);
                this._close = [];
                this._open.Clear();
                break;
            }
            let neighbours: Neighbour[] = currentStep.neighbours;
            for (let i = neighbours.length - 1; i >= 0; --i) {
                let gird = neighbours[i].Gird;
                if (this._close.indexOf(gird) === -1) {
                    let moveConst: number = neighbours[i].Const;
                    if (!this._open.Contains(gird)) {
                        gird.parent = currentStep;
                        gird.g = currentStep.g + moveConst;
                        let distancePoint = gird.position.sub(finish);
                        gird.h = Math.abs(distancePoint.x) + Math.abs(distancePoint.y); 
                        this._open.Insert(gird);
                    } else {
                        if (currentStep.g + moveConst < gird.g) {  // 折返, 避免全局暴力搜索
                            gird.g = currentStep.g + moveConst; 
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
        Gird.g = Gird.h = 0;
        Gird.parent = null;
        return Gird;
    }

}

