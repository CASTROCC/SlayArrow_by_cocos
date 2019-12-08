export default class DragBoneUtils {

    /**
     * 播放动画
     * @param db 
     * @param name 
     */
    public static playAnimateByName(db: dragonBones.ArmatureDisplay, name: string, times: number = 1) {
        if (db && name) {
            db.playAnimation(name,times)
        }
    }

    /**
     * 播放隐藏特效
     * @param db 
     * @param name 
     * @param call 
     * @param target 
     */
    public static playHideEffect(db: dragonBones.ArmatureDisplay, name: string ,call?: () => any, target?: any): void {
        db.node.active = true;
        db.removeEventListener(dragonBones.EventObject.COMPLETE);
        db.addEventListener(dragonBones.EventObject.COMPLETE, ()=>{
            db.removeEventListener(dragonBones.EventObject.COMPLETE);
            db.node.active = false;
            if( call && target) {
                console.log("fn is Used!");
                call.call(target);
            }
        }, this);
        db.playAnimation(name,1);
    }

    /**
     * 播放显示特效
     * @param db 
     * @param name 
     * @param call 
     * @param target 
     */
    public static palyArmatureByName(db: dragonBones.ArmatureDisplay, name: string ,call?: () => any, target?: any, times: number = 1): void {
        db.node.active = true
        db.removeEventListener(dragonBones.EventObject.COMPLETE);
        db.addEventListener(dragonBones.EventObject.COMPLETE, ()=>{
            db.removeEventListener(dragonBones.EventObject.COMPLETE);
            if( call && target) {
                call.call(target);
            }
        }, this);
        db.playAnimation(name,times);
    }

    /**
     * 将动画定格至某一动画状态末尾
     * @param bone 
     * @param name 
     */
    public static makeArmmatureGotoProcess(bone: dragonBones.ArmatureDisplay, name: string, process: number): void {
        if (!bone.node.active) {
            bone.node.active = true
        }
        if (!bone.armature()) {
            bone.armatureName = bone.armatureName;
        }
        bone.armature().animation.gotoAndStopByProgress(name, process)
    }
}
