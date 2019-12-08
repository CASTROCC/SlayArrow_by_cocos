import { Maze, MapType } from "./Maze";
import Astar_s from "./Astar/A_star_2.0";
import { BinaryHeap } from "./Astar/BinaryHeap";
import RoleMgr, { RoleState } from "./GameObj/RoleMgr";
import G from "./Core/Manager/G";
import GameUtils from "./Core/Utils/GameUtils";

const {ccclass, property} = cc._decorator;

@ccclass
export default class GameMap extends cc.Component {

    @property(cc.Node)
    cross: cc.Node = null;

    @property(RoleMgr)
    roleMgr: RoleMgr = null;

    @property(cc.Node)
    notCross: cc.Node = null;

    private _maze: Maze;
    private _aStar: Astar_s;

    start () {
        // 构建迷宫
        let viewRect: cc.Size = cc.winSize;
        let widthNum: number = Math.round(viewRect.width / this.cross.width);
        let heightNum: number = Math.round(viewRect.height / this.cross.height);

        if (widthNum % 2 == 0) {
            widthNum--;
        } 
        if (heightNum % 2 == 0) {
            heightNum--;
        }
        this._maze = new Maze( widthNum, heightNum );
        let data = this._maze.maze;

        let node: cc.Node ;
        for (let i = 0; i < data.length; i++) {
            for (let j = 0; j < data[i].length; j++) {
                let val:MapType = data[i][j];    
                if(val === MapType.Cross || val === MapType.Start || val === MapType.End ) {
                    node = cc.instantiate(this.cross);
                    if(MapType.Start === val)
                        this.roleMgr.nowPos = cc.v2(j , i );
                }else if(val === MapType.NotCorss ) 
                    node = cc.instantiate(this.notCross);

                if(node) {
                    node.parent = this.node ;
                    node.active = true ;
                    node.position = GameUtils.TransGirdPosition(j, i, node.width, node.height);
                }
            }
        }
        this._aStar = Astar_s.ins();
        this._aStar.MapVo = data;
    }

    onEnable() {
        this.node.on(cc.Node.EventType.TOUCH_END , this.onTouching , this );
    }

    onDisable() {
        this.node.off(cc.Node.EventType.TOUCH_END , this.onTouching , this );
    }

    private onTouching(e: cc.Event.EventTouch): void {
        let x: number = Math.floor((e.getLocationX()  / this.cross.width) );
        let y: number = Math.floor(( (this.node.height - e.getLocationY() ) / this.cross.height) ) ;
        if(this._maze.maze[y][x] === MapType.NotCorss ) {
            cc.error("can't find road.");
            return ;
        }
        console.log("finish =>", cc.v2(x,y));
        let path:cc.Vec2[] = this._aStar.moveToward( this.roleMgr.nowPos , cc.v2(x,y));
        if(path.length === 0) {
            cc.error("can't find road.");
            return ;
        }
        this.roleMgr.EnterState(RoleState.Move, path);
    }

    // private async moveRes(path: cc.Vec2[]) {
    //     let pos: cc.Vec2 = path.shift();
    //     if (!pos) return;

    //     this.isMoving = true ;
    //     await this.movePosimes(pos);

    //     this.nowPos = pos;
    //     this.isMoving = false;
    //     this.moveRes(path);
    // }

    // private movePosimes(pos: cc.Vec2): Promise<Function> {
    //     return new Promise((reslove) => {
    //         let position = cc.v2( this.cross.width * pos.x + this.cross.width / 2, - (this.cross.height * pos.y + this.cross.height / 2) );
    //         let roleAction = cc.moveTo(this.moveDuration, position)
    //         let callAction = cc.callFunc(()=>{
    //                 reslove();
    //         } , this );
    //         this.role.runAction(cc.sequence([roleAction, callAction]));
    //         reslove();
    //     });
    // }

}
