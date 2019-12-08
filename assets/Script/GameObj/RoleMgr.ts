import G from "../Core/Manager/G";
import { loadingType } from "../Core/Manager/ResourceManager";
import GameUtils from "../Core/Utils/GameUtils";

const { ccclass, property } = cc._decorator;

export enum RoleState {
    Idle = 'Idle',
    Move = 'Move',
}

export enum Dir {
    Up = 0,
    Down,
    Left,
    Right
}


@ccclass
export default class RoleMgr extends cc.Component {

    private _role: cc.Node;

    private _roleState: RoleState;

    private _nowPos: cc.Vec2 = cc.v2(0,1);
    private _roleMoveAssets: {
        [name: string]: cc.Node
    } = {};
    private _roleSpeed: number = 0.3;

    public get nowPos(): cc.Vec2 {
        return this._nowPos;
    }

    public set nowPos(v: cc.Vec2) {
        this._nowPos = v;
        this.node.position = GameUtils.TransGirdPosition(this._nowPos.x, this._nowPos.y, this.node.width, this.node.height);
    }

    public set RoleState(v: RoleState) {
        if (this._roleState === v) return;
        this._roleState = v;
        this._ToggleState();
    }

    onLoad() {
        G.ResMgr.loadResByDir("Animation/Role/", loadingType.None, (res: any) => {
            for (let i = 0; i < res.length; i++) {
                const item = res[i];
                if (item instanceof cc.Prefab) {
                    let node: cc.Node = cc.instantiate(item);
                    this._roleMoveAssets[item.name] = node;
                    node.parent = this.node;
                    node.active = false;
                }
            }
            this.node.zIndex = 999;
            this.RoleState = RoleState.Idle;
        });
    }

    EnterState(s: RoleState, path: cc.Vec2[]): void {
        this.RoleState = s;
        if (this._roleState === RoleState.Move) {
            this._nowPos = path.shift();
            let roleMove = () => {
                let p: cc.Vec2 = path.shift();
                if (!p) {
                    this.RoleState = RoleState.Idle;
                    return;
                }
                this._UpdateRoleDir(path[0]);
                /// TODO 改成线性插值进行移动
                let position = GameUtils.TransGirdPosition(p.x, p.y, this.node.width, this.node.height);
                let roleAction = cc.moveTo(this._roleSpeed, position)
                let callAction = cc.callFunc(() => {
                    this.nowPos = p;
                    roleMove();
                }, this);
                this.node.runAction(cc.sequence([roleAction, callAction]));
            };
            this.node.stopAllActions();
            this.nowPos = this.nowPos;
            roleMove();
        }

    }

    private _UpdateRoleDir(targetPos: cc.Vec2) {
        if (!targetPos)
            return;
        let _dir: Dir;
        if (targetPos.x - this._nowPos.x > 0)
            _dir = Dir.Left;
        if (targetPos.x - this._nowPos.x < 0)
            _dir = Dir.Right;
        if (targetPos.y - this._nowPos.y < 0)
            _dir = Dir.Up;
        if (targetPos.y - this._nowPos.y > 0)
            _dir = Dir.Down;

        this.node.scale = 1;
        if (_dir == Dir.Left || _dir == Dir.Right) {
            _dir == Dir.Left ? this.node.scaleX = 1 : this.node.scaleX = -1;
        } else if (_dir == Dir.Up || _dir == Dir.Down) {
            _dir == Dir.Up ? this.node.scaleY = 1 : this.node.scaleY = -1;
        }
    }


    private _ToggleState() {
        for (const k in this._roleMoveAssets) {
            if (this._roleMoveAssets.hasOwnProperty(k)) {
                const res = this._roleMoveAssets[k];
                res.active = false;
            }
        }
        this._role = this._roleMoveAssets[this._roleState];
        this._role.active = true;
        this._role.getComponent(cc.Animation).play();
    }

}
