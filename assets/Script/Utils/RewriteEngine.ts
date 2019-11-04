
const {ccclass, property} = cc._decorator;
// 自定义遮罩
@ccclass
export class selfMask extends cc.Mask {

    _updateGraphics() {
        // ._updateGraphics();
        let pointCollider: cc.PolygonCollider = this.getComponent(cc.PolygonCollider);
        let graphics = this["_graphics"];

        if (pointCollider && this["_type"] == cc.Mask.Type.ELLIPSE) {
            
            let points = pointCollider.points;
            for (let i = 0; i < points.length; ++i) {
                let point = points[i];
                if (i === 0) {
                    graphics.moveTo(point.x, point.y);
                }
                else {
                    graphics.lineTo(point.x, point.y);
                }
            }
            graphics.close();
        }
        if (cc.game.renderType === cc.game.RENDER_TYPE_CANVAS) {
            graphics.stroke();
        }
        else {
            graphics.fill();
        }
    }
}
