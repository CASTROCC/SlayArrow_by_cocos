// export default class Astar {

//     private moveType = AStarMoveType.EIGHT_DIRECTION ;

//     private _open = [];
//     private _closed = [];
//     private _mapVo:number[][] ;
    
//     private static _instance:Astar ;
//     public static getInstance()
//     {
//         if(!this._instance) this._instance = new Astar();
//         return this._instance ;
//     }

//     public setMapVo(v:number[][])
//     {
//         this._mapVo = v; 
//     }
    
//     private indexOfStepArray(value, stepArray)
//     {
//         for (let i = 0; i < stepArray.length; ++i) {
//             if (value.equals(stepArray[i].position)) {
//                 return i;
//             }
//         }
//         return -1;
//     }

//     private insertToOpen(step: Gird)
//     {
//         let stepF = step.f;
//         let length = this._open.length;
//         let i = 0;
//         for (; i < length; ++i) {
//             if (stepF <= this._open[i].f) {
//                 break;
//             }
//         }
//         this._open.splice(i, 0, step);
//     }

//     public moveToward(start: cc.Vec2, finish: cc.Vec2): cc.Vec2[]
//     {
//         this._closed = []; // 闭合列表
//         this._open = []; // 开放列表
//         let paths = []; // 路径点集合
        
//         // cc.log('find start: ' + start + ' to: ' + finish);
//         this._open.push(new Gird(start));
//         let pathFound = false;
//         do {
//             // cc.log('==============================================================');
//             let currentStep = this._open.shift();  // 获取当前备选点中的最优点
//             // cc.log('currentStep: ' + currentStep);
            
//             this._closed.push(currentStep);  // 放入闭合列表，剔除已经走过的节点
            
//             // 找到终点
//             if (currentStep.position.equals(finish)) {
//                 // cc.log('finish :P');
//                 pathFound = true;
//                 let tmpStep = currentStep; 
//                 do { // 将当前路径链表转换为数组
//                     paths.unshift(tmpStep.position);
//                     tmpStep = tmpStep.last;
//                 } while (typeof tmpStep !== "undefined");
                
//                 this._open = [];
//                 this._closed = [];
//                 break;
//             }
//             // 获取当前节点的周边节点
//             let borderPositions = this.borderMovablePoints(currentStep.position);
//             // 遍历周围节点，依照代价值进行排序
//             for (let i = 0; i < borderPositions.length; ++i) {
//                 let borderPosition = borderPositions[i];
//                 // cc.log('check: ' + borderPosition);   
//                 // 检查当前节点的周围节点是否存在关闭列表里，如果存在的话就剔除该节点
//                 if (this.indexOfStepArray(borderPosition, this._closed) != -1) {
//                     // cc.log('had in closed: ' + borderPosition);
//                     // cc.log('remove check position: ' + borderPosition);
//                     borderPositions.splice(i, 1);
//                     i--;
//                     continue;
//                 }
//                 // 生成可能路径之一
//                 let step = new Gird(borderPosition);
//                 // 计算该点的代价值，同轴代价为10，斜轴代价为14
//                 let moveCost = this.costToMove(borderPosition, finish);
//                 // 检查开放列表中是否存在该节点
//                 let index = this.indexOfStepArray(borderPosition, this._open);

//                 // 如果不存在于开放列表中，说明该节点是个新的节点，则初始化该节点 ，并将其插入开放节点中，按f值的大小进行重新排序
//                 if (index == -1) {
//                     // 将当前节点的父节点指向parent(因为该节点属于一个备选节点， 可能会是路径点之一)
//                     step.parent = currentStep;
//                     // 这里的g值其实已经加上了权重值(已走过的格子数);
//                     step.g = currentStep.g + moveCost;
//                     // h = 当前点抵达终点的移动估算量(曼哈顿距离)
//                     let distancePoint = borderPosition.sub(finish);
//                     step.h = Math.abs(distancePoint.x) + Math.abs(distancePoint.y);
//                     // 按代价值的大小在当前开放列表中插入step
//                     this.insertToOpen(step);
//                 } else {
//                     // 如果当前节点已经存在于开放列表中，取出该节点并与其父节点的g值（当前两个点到终点的曼哈顿距离）做比较，
//                     // 因为父节点比当前节点少了一次迭代，所以父节点应该加上一个权重值才能到达本次迭代的比较节点，为了确保结果的正确，对于父节点需要加上一个权重值
//                     // 如果该节点的g值比当前父节点的g值要大的话（说明该节点的代价值为第一次迭代时的代价值），更新权重值后重新设置该节点在开放节点中的位置
//                     // ⚠️ 当当前的路径节点与终点一致时说明找到终点了，这时便可通过当前节点生成了一条指向起始点的路径链
//                     // 所以整个迭代应该算是一个暴力查找的过程，还有许多可以优化的地方
//                     step = this._open[index];
//                     if (currentStep.g + moveCost < step.g) {  // 斜方格子优化
//                         // 更新节点的g值
//                         step.g = currentStep.g + moveCost;
                        
//                         // 重置该节点的位置
//                         this._open.splice(index, 1);
//                         this.insertToOpen(step);
//                     }
//                 }
//             }
//         } while (this._open.length > 0);
        
//         return paths;

//     }

//     // 计算直线是否是直线，直线代价为10，斜线代价为14
//     private costToMove(positionLeft, positionRight)
//     {
//         if (this.moveType == AStarMoveType.EIGHT_DIRECTION) {
//             /**
//              * diagonal length: 1.41 ≈ Math.sqrt(x * x + y * y)
//              * line length: 1
//              * 
//              * cost = length * 10
//              * diagonal cost = 14 ≈ 14.1
//              * cost line = 10 = 1 * 10
//              */
//             return (positionLeft.x != positionRight.x) && (positionLeft.y != positionRight.y) ? 14 : 10;
//         } else {
//             return 1;
//         }

//     }

//     private borderMovablePoints(position)
//     {
//         var results = [];
//         let hasTop = false;
//         let hasBottom = false;
//         let hasLeft = false;
//         let hasRight = false;

//         // top
//         let top = cc.v2(position.x, position.y - 1);
//         if (this.isArea(top) && this._mapVo[top.y][top.x] === MapType.Cross) { // 0代表可通行
//             // cc.log('top: ' + top);
//             results.push(top);
//             hasTop = true;
//         }
//         // bottom
//         let bottom = cc.v2(position.x, position.y + 1);
//         if (this.isArea(bottom) && this._mapVo[bottom.y][bottom.x] === MapType.Cross) {
//             // cc.log('bottom: ' + bottom);
//             results.push(bottom);
//             hasBottom = true;
//         }
//         // left
//         let left = cc.v2(position.x - 1, position.y);
//         if (this.isArea(left) && this._mapVo[left.y][left.x] === MapType.Cross) {
//             // cc.log('left: ' + left);
//             results.push(left);
//             hasLeft = true;
//         }
//         // right
//         let right = cc.v2(position.x + 1, position.y);
//         if (this.isArea(right) && this._mapVo[right.y][right.x] === MapType.Cross) {
//             // cc.log('right: ' + right);
//             results.push(right);
//             hasRight = true;
//         }
        
//         if (this.moveType == AStarMoveType.EIGHT_DIRECTION) {
//             // Top Left
//             let topLeft = cc.v2(position.x - 1, position.y - 1);
//             if (this.isArea(topLeft) && hasTop && hasLeft) {
//                 if (this._mapVo[topLeft.y][topLeft.x] === MapType.Cross) {
//                     // cc.log('top left: ' + topLeft);
//                     results.push(topLeft);
//                 }
//             }
//             // Top Right
//             let topRight = cc.v2(position.x + 1, position.y - 1);
//             if (this.isArea(topRight) && hasTop && hasRight) {
//                 if (this._mapVo[topRight.y][topRight.x] === MapType.Cross) {
//                     // cc.log('top right: ' + topRight);
//                     results.push(topRight);
//                 }
//             }
//             // Bottom Left
//             let bottomLeft = cc.v2(position.x - 1, position.y + 1);
//             if (this.isArea(bottomLeft) && hasBottom && hasLeft) {
//                 if (this._mapVo[bottomLeft.y][bottomLeft.x] === MapType.Cross) {
//                     // cc.log('bttom left: ' + bottomLeft);
//                     results.push(bottomLeft);
//                 }
//             }
//             // Bottom Right
//             let bottomRight = cc.v2(position.x + 1, position.y + 1);
//             if (this.isArea(bottomRight) && hasBottom && hasRight) {
//                 if (this._mapVo[bottomRight.y][bottomRight.x] === MapType.Cross) {
//                     // cc.log('top right: ' + bottomRight);
//                     results.push(bottomRight);
//                 }
//             }
//         }
//         return results;

//     }

//     private find<T>(items: T[], callback: (ele: T, index: number) => boolean): T | undefined {
//         for (let i = 0; i < items.length; i++) {
//             const element = items[i];
//             if (callback(element, i)) {
//                 return element;
//             }
//         }
//         return ;
//     }

//     private isArea(p:cc.Vec2):boolean
//     {
//         return (p.x>=0 && p.x < this._mapVo[0].length ) && (p.x >= 0 && p.y < this._mapVo.length);
//     }

// }

