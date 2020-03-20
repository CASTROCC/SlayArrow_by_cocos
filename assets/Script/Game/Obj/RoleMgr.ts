import GameUtils from "../../Core/Utils/GameUtils";
import ResourceManager, { loadingType } from "../../Core/Manager/ResourceManager";
import { BaseObj } from "./BaseObj";
import MapConfig from "../Map/MapConfig";
import SceneManager from "../../Core/Manager/SceneManager";
import EffectUtils from "../../Core/Utils/EffectUtils";
import FollowCamera from "../../Core/Utils/FollowCamera";

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
export default class RoleMgr {

    private _role: BaseObj;
    private _roleState: RoleState;
    private _roleContainer: BaseObj;

    private _nowPos: cc.Vec2 = cc.v2(0,1);
    private _roleSpeed: number = 0.1;

    public static Ins: RoleMgr = new RoleMgr();

    public get roleContainer() {
        return this._roleContainer;
    }

    constructor () {
        this._roleContainer = new BaseObj();
        this._roleContainer.anchorX = 0;
        this._roleContainer.anchorY = 1;
        this._roleContainer.name = "RoleContainer";
        this._role = new BaseObj();
       
    }

    public get nowPos(): cc.Vec2 {
        return this._nowPos;
    }

    public set nowPos(v: cc.Vec2) {
        this._nowPos = v;
        this._role.position = GameUtils.TransGirdPosition(this._nowPos.x, this._nowPos.y, MapConfig.GirdWidth, MapConfig.GirdHeight);
    }

    public Init(): void {
        this.loadRoleAssets();
        (<SceneManager>SceneManager.ins()).BattleLayer.addChild(this._roleContainer);
    }

    public set RoleState(v: RoleState) {
        if (this._roleState === v) return;
        this._roleState = v;
        this._ToggleState();
    }

    public loadRoleAssets() {
        ResourceManager.ins().loadResByDir("Animation/Role/", loadingType.None, (res: any) => {
            for (let i = 0; i < res.length; i++) {
                const item = res[i];
                if (item instanceof cc.Prefab) {
                    let node: cc.Node = cc.instantiate(item);
                    node.parent = this._role;
                }
            }

            this.RoleState = RoleState.Idle;
            this.nowPos = this._nowPos;
            this._roleContainer.addChild(this._role);
            (<SceneManager>SceneManager.ins()).MapCamera.addComponent(FollowCamera).target = this._role;
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
                let position = GameUtils.TransGirdPosition(p.x, p.y, MapConfig.GirdWidth, MapConfig.GirdHeight);
                EffectUtils.moveNodeToPos(this._role, position, ()=>{
                    this._nowPos = p;
                    roleMove();
                }, this, this._roleSpeed);
            };
            this._role.stopAllActions();
            roleMove();
        } else if (this._roleState === RoleState.Idle) {
            ///
        }

    }

    private _UpdateRoleDir(targetPos: cc.Vec2, finish?: cc.Vec2) {
        if (!targetPos)
            return;
            
        let _dir: Dir;
        // let dis: cc.Vec2 = finish.subSelf(this._nowPos);
        // if (dis.x < 0) 
        //     _dir = Dir.Left;
        // else if (dis.x > 0) 
        //     _dir = Dir.Right;
        
        if (targetPos.x - this._nowPos.x > 0)
            _dir = Dir.Left;
        if (targetPos.x - this._nowPos.x < 0)
            _dir = Dir.Right;
        if (targetPos.y - this._nowPos.y < 0)
            _dir = Dir.Up;
        if (targetPos.y - this._nowPos.y > 0)
            _dir = Dir.Up; /// 111

        // this._role.scale = 1;
        if (_dir == Dir.Left || _dir == Dir.Right) {
            _dir == Dir.Left ? this._role.scaleX = 1 : this._role.scaleX = -1;
        } else if (_dir == Dir.Up || _dir == Dir.Down) {
            _dir == Dir.Up ? this._role.scaleY = 1 : this._role.scaleY = -1;
        }
    }


    private _ToggleState() {
        let children: cc.Node[] = this._role.children;
        for (const item of children) {
            item.active = false;
        }
        let Anim: cc.Node = GameUtils.GetNodeByPath(`${this._roleState}`, this._role);
        GameUtils.Active(Anim, true);
        Anim.getComponent(cc.Animation).play();
    }

}
