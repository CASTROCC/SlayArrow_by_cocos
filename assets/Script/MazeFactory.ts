import { MapType } from "./Game/Map/Map";

export class MazeFactory {

    private _mazeWidth: number ;
    private _mazeHeight: number ;
    private _maze: number[][] ;
    private _startX: number;
    private _startY: number;
    private _endX: number ;
    private _endY: number ;

    private _visited: boolean[][];

    private _stack: cc.Vec2[] ;

    private _dir: any = [{x:0,y:1} , {x:0,y:-1} , {x:-1,y:0} , {x:1,y:0}] ; // 上下左右

    constructor() {}

    public static Ins: MazeFactory = new MazeFactory();

    public CreateMaze(width: number, height: number): number[][] {
        if (width % 2 === 0 || height % 2 === 0)
            return null;

        this._mazeWidth = width ;
        this._mazeHeight = height ;

        this._startX = 0 ;
        this._startY = 1 ;
        this._endX = width - 1;
        this._endY = height - 2;

        this._maze = [] ;
        this._visited = [] ;

        for (let y = 0; y < this._mazeHeight; y++) {
            let arr = [] ;
            let vis = [] ;
            for (let x = 0; x < this._mazeWidth; x++) {   
                let val: MapType;
                // 可通行节点 => x y 必须全是奇数
                if( x % 2 !== 0 && y % 2 !== 0) val = MapType.Cross;
                else val = MapType.NotCorss
                arr[x] = val ;
                vis[x] = false ;
            }
            this._maze.push(arr);
            this._visited.push(vis);
        }

        this._maze[this._startY][this._startX] = MapType.Start ;
        this._maze[this._endY][this._endX] = MapType.End ;
        return this._InitlizeMaze(this._startX + 1, this._startY);  
    }

    private _InitlizeMaze(x: number , y: number): number[][] {
        this._stack = [] ;

        let first: cc.Vec2 = cc.v2(x , y );
        this._stack.push(first);
        this._visited[first.y][first.x] = true ;
        while (this._stack.length) {
            let curPos: cc.Vec2 = this.shiftElByRand(this._stack);  
            for (let i = 0; i < 4 ; i++) {
                let newX:number = curPos.x + this._dir[i].x * 2;
                let newY:number = curPos.y + this._dir[i].y * 2;
                if (this.isArea(newX , newY) && !this._visited[newY][newX]) {
                    this._stack.push(cc.v2(newX , newY));
                    this._visited[newY][newX] = true ;
                    
                    this._maze[curPos.y + this._dir[i].y][curPos.x + this._dir[i].x] = MapType.Cross ;
                }
            }
        }

        return this._maze;
    }

    private shiftElByRand(stack:any[]): any {
        let index: number = Math.floor((stack.length-1) * Math.random()) ;
        let reElement: any = stack[index];
        stack.splice(index , 1);
        return reElement ;
    }

    public get currMaze() {
        return this._maze ;
    }

    private isArea(x:number , y:number): boolean {
        return (x>=0 && x < this._mazeWidth) && (y >= 0 && y < this._mazeHeight);
    }

}
