import Gustures from "../Gusturelib/gusture";

var g = require("../Gusturelib/gusture.js");

export type gPoint = {
    x: number,
    y: number
}

export default class GustureUtil {

    public static Instance: GustureUtil = new GustureUtil();

    private _testPoints: Gustures.Point[] = [];   

    /**
     * 检查手势是否匹配
     * @param useProtractor 是否使用圆角
     */
    public checkGusture(useProtractor: boolean): Gustures.Result {
        return g.Gus.Recognize(this._testPoints, useProtractor);
    }

    /**
     * 添加手势
     * @param name 手势名称
     * @param points 手势检查点
     */
    public AddGesture(name: string, points: gPoint[]): boolean {
        if (!name || !points.length) {
            return false;
        }
        return g.Gus.AddGesture(name, points);
    }

    /**
     * 删除所有添加的手势，只保留库中自定义的手势
     */
    public DeleteUserGestures(): void {
        g.Gus.DeleteUserGestures();
    }

    /**
     * 添加被检测点
     * @param x 
     * @param y 
     */
    public addPoint(x: number = 0 , y: number = 0): void {
        let p: Gustures.Point = new g.Point(x, y);
        this._testPoints.push(p);
    }

    /**
     * 清空所有被检测坐标
     */
    public removeAllPoints(): void {
        for (let i = this._testPoints.length - 1; i >= 0; --i) {
            let p: Gustures.Point = this._testPoints[i];
            this._testPoints.splice(p, 1);
        }
    }

    /**
     * 根据坐标删除某个检测点
     * @param x 
     * @param y 
     */
    public removePoint(x: number, y: number): boolean {
        if (isNaN(x) || isNaN(y)) {
            return false;
        }

        for (let i = this._testPoints.length - 1; i >= 0; --i) {
            const p: Gustures.Point = this._testPoints[i];
            if (p.X === x && p.Y === y) {
                this._testPoints.splice(i, 1);
                return true;
            }
        }
        return false;
    }

    /**
     * 获取检测点长度
     */
    public getPointsLength(): number {
        return this._testPoints.length;
    }
}
