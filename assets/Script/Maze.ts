export enum MapType {
    NotCorss = 0,
    Start ,
    End ,    
    Cross
}

class Postion {
    private _x: number;
    private _y: number;

    constructor(x: number , y: number) {
        this._x = x ;
        this._y = y ;
    }

    public get x(): number {
        return this._x ;
    }

    public get y(): number {
        return this._y ;
    }
}

export class Maze {
    
    private _mazeWidth: number ;
    private _mazeHeight: number ;
    private _maze: number[][] ;
    private _startX: number;
    private _startY: number;
    private _endX: number ;
    private _endY: number ;

    private _visited: boolean[][];

    private _stack: Postion[] ;

    private _dir: any = [{x:0,y:1} , {x:0,y:-1} , {x:-1,y:0} , {x:1,y:0}] ; // 上下左右

    constructor(w: number , h: number) {
        if(w % 2 === 0 || h % 2 === 0 ) 
        {
            console.error("迷宫宽高必须为偶数."); 
            return ;
        }
        this._mazeWidth = w ;
        this._mazeHeight = h ;

        this._startX = 0 ;
        this._startY = 1 ;
        this._endX = w - 1;
        this._endY = h - 2;

        this.init();
    }


    private init() {
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
        this.createMaze(this._startX + 1, this._startY);     
    }

    public createMaze(x: number , y: number) {
        this._stack = [] ;

        let first:Postion = new Postion(x , y );
        this._stack.push(first);
        this._visited[first.y][first.x] = true ;
        while (this._stack.length) {
            let curPos:Postion = this.shiftElByRand(this._stack);  
            for (let i = 0; i < 4 ; i++) {
                let newX:number = curPos.x + this._dir[i].x * 2;
                let newY:number = curPos.y + this._dir[i].y * 2;
                if (this.isArea(newX , newY) && !this._visited[newY][newX]) {
                    this._stack.push(new Postion(newX , newY));
                    this._visited[newY][newX] = true ;
                    
                    this._maze[curPos.y + this._dir[i].y][curPos.x + this._dir[i].x] = MapType.Cross ;
                }
            }
        }
    }

    private shiftElByRand(stack:any[]): any {
        let index: number = Math.floor((stack.length-1) * Math.random()) ;
        let reElement: any = stack[index];
        stack.splice(index , 1);
        return reElement ;
    }

    public get maze() {
        return this._maze ;
    }

    private isArea(x:number , y:number): boolean {
        return (x>=0 && x < this._mazeWidth) && (y >= 0 && y < this._mazeHeight);
    }

}
