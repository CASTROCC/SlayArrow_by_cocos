
export default class MathUtils {
    /**
     * 随机出队
     * @param array 
     */
    public static seed: number = 0;
    public static randomQueue(array: any[]): any {
        let index: number = Math.round((this.getSameRandom(this.seed, array.length - 1, 0)));
        let val = array.splice(index, 1)[0];
        return val;
    }

    /**
     * 方格排列模式
     * @param heng 横排数量 
     * @param spaceCol 横间距
     * @param spaceRow 纵间距
     * @param width 节点宽度
     * @param height 节点高度
     * @param left 左边距离
     * @param top 上边距离
     * @param count 当前容器所含节点数量
     */
    public static getPosition(heng: number, spaceCol: number, spaceRow: number, width: number, height: number, left: number, top: number, count: number): cc.Vec2 {
        let x: number = left + (count % heng) * (width + spaceCol);
        let y: number = - (top + Math.floor((count / heng)) * (height + spaceRow))
        return cc.v2(x, y)
    }

    /**
     * 根据随机种子生成相同的随机数
     * @param seeds 随机种子
     * @param max rangeMax
     * @param min rangeMin
     */
    public static getSameRandom(seeds: number, max: number = 1, min: number = 0) {
        let seed = (seeds * 9301 + 49297) % 233280;
        let rnd = seed / 233280.0;
        return min + rnd * (max - min);
    }

    /**
     * 小数转为分数
     * @param decimals 
     */
    public static decimalsToFractional(decimals): string {
        const formatDecimals = decimals.toFixed(2)
        let denominator = 100 //初始化分母
        let numerator = formatDecimals * 100 //初始化分子
        let bigger = 0
        let recursion = () => {
            bigger = denominator > numerator ? denominator : numerator
            for (let i = bigger; i > 1; i--) {
                if ((Number as any).isInteger(numerator / i) && (Number as any).isInteger(denominator / i)) {
                    numerator = numerator / i
                    denominator = denominator / i
                    recursion()
                }
            }
        }
        recursion()
        return `${numerator}/${denominator}`
    }

    /**
    * 获取当前(t)位于曲线中的位置
    * @param t  deltaTime
    * @param p0 起始点
    * @param p1 控制点
    * @param p2 终止点
    * @return 逐帧Point
    */
    public static berzierRadio(t: number, p0: cc.Vec2, p1: cc.Vec2, p2: cc.Vec2): cc.Vec2 {
        var xa = 0;
        var xb = p0.x;
        var xc = p1.x;
        var xd = p2.x;

        var ya = 0;
        var yb = p0.y;
        var yc = p1.y;
        var yd = p2.y;

        var x = this.bezierAt(xa, xb, xc, xd, t);
        var y = this.bezierAt(ya, yb, yc, yd, t);

        return cc.v2(x, y)
    }

    public static bezierAt(a, b, c, d, t) {
        return (Math.pow(1 - t, 3) * a +
            3 * t * (Math.pow(1 - t, 2)) * b +
            3 * Math.pow(t, 2) * (1 - t) * c +
            Math.pow(t, 3) * d);
    }


    /**
     * 二维数组横纵消除
     * @param datas 
     * @param range 
     * @param disableType 
     */
    public static removeSameNumByRowAndCol(datas: number[][], range: number, disableType: number, 
                                        successFunc?: (datas: any[])=>void, target?: any) {
        for (let i = 0; i < datas.length; i++) {
            const data: number[] = datas[i];
            for (let j = 0; j < data.length; j++) {
                if (data[j] !== disableType) {
                    let tempCol: any[] = []; // 横排消除
                    let tempRow: any[] = []; // 纵排消除
                    for (let z = 0; z < range; z++) {
                        const zR = z + j;
                        const zW = i + z;
                        
                        // TODO
                        if (zR < data.length) {
                            tempCol.push({
                                "val": data[zR],
                                "pos": cc.v2(zR, i),
                            });
                        }

                        if (zW < datas.length) {
                            tempRow.push({
                                "val": datas[zW][j],
                                "pos": cc.v2(j, zW)
                            });
                        }
                    }
                    let isSameCol: boolean = !tempCol.some((ele: any)=>{
                        return ele.val != tempCol[0].val;
                    }) && tempCol.length >= range;

                    let isSameRow: boolean = !tempRow.some((ele: any)=>{
                        return ele.val != tempRow[0].val;
                    }) && tempRow.length >= range;
                    
                    // 消除
                    if (isSameCol) {      
                        if (successFunc && target)
                            successFunc.call(target, tempCol);
                        return;
                    }   

                    if(isSameRow) {
                        if (successFunc && target) 
                            successFunc.call(target, tempRow);
                        return;
                    }
                }
                
            }
        }

        successFunc && target && successFunc.call(target, null);
    }
    
    /**
     * sort
     * @param b1 
     * @param b2 
     */
    public static sortAsc(b1, b2): number {
		if (b1 < b2) return -1;
		else if (b1 > b2) return 1;
		else return 0;
	}

    /**
     * 二分查找
     * @param tab 
     * @param item 
     * @param binFunc 
     */
    public static binSearch(tab: any[], item: any, binFunc: Function = null): number {
		if (!tab || tab.length == 0) return 0;

		if (!binFunc)
			binFunc = MathUtils.sortAsc;
		let low = 0;
		let high = tab.length - 1;

		while (low <= high) {
			let mid = (high + low) >> 1;
			let val: any = tab[mid];
			if (binFunc(val, item) <= 0) {
				low = mid + 1;
			}
			else {
				high = mid - 1;
			}
		}
		return low;
	}

    /**
     * 取反
     * @param val 
     */
    public static resertNumberPosiv(val: number): number {
        return ~val + 1;
    }
    
    /**
     * 一维长度转二维坐标
     * @param d 
     * @param col 
     */
    public static getDouble(d: number, col: number): cc.Vec2 {
        return  cc.v2(d % col, Math.floor(d / col)) 
    }

    /**
     * 弧度转角度
     * @param radius 
     */
    public static getAngleByRadius(radius: number): number {
        return  radius * 180 / Math.PI;
    }

    /**
     * 角度转弧度
     * @param angle 
     */
    public static getRadiusByAngle(angle: number): number {
        return   angle * Math.PI / 180;
    }

    /**
     * 线性
     * @param src 
     * @param des 
     * @param t 
     */
    public static lerp(src: number, des: number, t: number): number {
        return des * t + src * (1.0 - t);
    }

    /**
     * 两向量间夹角
     * @param vec 
     * @param vec1 
     */
    public static getAngleByDot(vec: cc.Vec2, vec1: cc.Vec2): number {
        vec = vec.normalizeSelf();
        vec1 = vec1.normalizeSelf();
        return this.getAngleByRadius(Math.acos(vec1.dot(vec)));
    }

    /**
     * 获取数组总和
     * @param array 
     */
    public static getTotalNum(array: number[]): number {
        if (!array.length) {
            return 0;
        }
        return array.reduce(function (prev, cur, index, array) {
            return prev + cur;
        })
    }

    /**
     * 判断线段是否与矩形相交
     * @param lineStart 
     * @param lineEnd 
     * @param rect 
     */
    public static LineIntersectRect(lineStart: cc.Vec2, lineEnd: cc.Vec2, rect: cc.Rect) {
        let Getlines = (rect: cc.Rect)=>{
            let lines: any = {
                "leftDown": cc.v2(rect.xMin, rect.yMin),
                "leftUp": cc.v2(rect.xMin, rect.yMax),
                "RightUp": cc.v2(rect.xMax, rect.yMax),
                "RigtDown": cc.v2(rect.xMax, rect.yMin)
            }
            return lines;
        }
        let lines: any = Getlines(rect);
        if (this.LineIntersectLine(lineStart, lineEnd, lines.leftDown, lines.leftUp))
            return true;
        if (this.LineIntersectLine(lineStart, lineEnd, lines.leftUp, lines.RightUp))
            return true;
        if (this.LineIntersectLine(lineStart, lineEnd, lines.RightUp, lines.RigtDown))
            return true;
        if (this.LineIntersectLine(lineStart, lineEnd, lines.RigtDown, lines.leftDown))
            return true;

        return false;
    }

    /**
     * 判断两线段是否相交
     * @param l1Start 
     * @param l1End 
     * @param l2Start 
     * @param l2End 
     */
    public static LineIntersectLine(l1Start: cc.Vec2, l1End: cc.Vec2, l2Start: cc.Vec2, l2End: cc.Vec2): boolean {
        return this.QuickReject(l1Start, l1End, l2Start, l2End) && this.Straddle(l1Start, l1End, l2Start, l2End);
    }

    public static QuickReject(l1Start: cc.Vec2, l1End: cc.Vec2, l2Start: cc.Vec2, l2End: cc.Vec2): boolean {
        let l1xMax = Math.max(l1Start.x, l1End.x);
        let l1yMax = Math.max(l1Start.y, l1End.y);
        let l1xMin = Math.min(l1Start.x, l1End.x);
        let l1yMin = Math.min(l1Start.y, l1End.y);

        let l2xMax = Math.max(l2Start.x, l2End.x);
        let l2yMax = Math.max(l2Start.y, l2End.y);
        let l2xMin = Math.min(l2Start.x, l2End.x);
        let l2yMin = Math.min(l2Start.y, l2End.y);

        if (l1xMax < l2xMin || l1yMax < l2yMin || l2xMax < l1xMin || l2yMax < l1yMin) return false;

        return true;
    }

    public static Straddle(l1Start: cc.Vec2, l1End: cc.Vec2, l2Start: cc.Vec2, l2End: cc.Vec2): boolean {
        let l1x1 = l1Start.x;
        let l1x2 = l1End.x;
        let l1y1 = l1Start.y;
        let l1y2 = l1End.y;
        let l2x1 = l2Start.x;
        let l2x2 = l2End.x;
        let l2y1 = l2Start.y;
        let l2y2 = l2End.y;

        if ((((l1x1 - l2x1) * (l2y2 - l2y1) - (l1y1 - l2y1) * (l2x2 - l2x1)) *
            ((l1x2 - l2x1) * (l2y2 - l2y1) - (l1y2 - l2y1) * (l2x2 - l2x1))) > 0 ||
            (((l2x1 - l1x1) * (l1y2 - l1y1) - (l2y1 - l1y1) * (l1x2 - l1x1)) *
                ((l2x2 - l1x1) * (l1y2 - l1y1) - (l2y2 - l1y1) * (l1x2 - l1x1))) > 0) {
            return false;
        }
        return true;
    }

}
