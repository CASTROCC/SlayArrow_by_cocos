import MathUtils from "./MathUtils";

export default class GameUtils {
    /**
     * 获取当前节点转换到某节点下的坐标
     * @param currNode 待转换目标节点
     * @param targetNode 目标节点
     */
    public static getNodePos(currNode: cc.Node, targetNode: cc.Node): cc.Vec2 {
        if (!currNode || !targetNode) {
            console.error("no args node.");
            return;
        }
        let worldPos = currNode.getParent().convertToWorldSpaceAR(currNode.position);
        let pos = targetNode.convertToNodeSpaceAR(worldPos);

        return pos;
    }

    /**
     * 获取当前节点下的所有子节点
     * @param node 
     */
    public static GetAllChildNode(node: cc.Node): cc.Node[] {
        let temp: cc.Node[] = [];
        let getNodesByReverse = (node: cc.Node) => {
            temp.push(node);
            if (node.childrenCount) {
                for (let i = 0; i < node.children.length; i++) {
                    const child: cc.Node = node.children[i];
                    temp.push(child);
                    if (child.childrenCount) {
                        getNodesByReverse(child);
                    } else {
                        return;
                    }
                }
            }
        };
        getNodesByReverse(node);
        return temp;
    }

    /**
     * 获取节点下(children)的指定Components 
     * @param node 
     * @param type 
     */
    public static GetSubstringComponent(node: cc.Node, type: any): any[] {
        let parentNode: cc.Node = node.getParent();
        if (!parentNode) {
            console.error("not ParentNode.")
            return;
        }
        return parentNode.getComponentsInChildren(type);
    }

    /**
     * 获取当前时间
     */
    public static GetTime(): number {
        return Date.now();
    }

    /**
     * 根据相对节点及路径获取子节点
     * @param Path 
     * @param Refence 
     */
    public static GetNodeByPath(Path: string, Refence: cc.Node): cc.Node {
        let paths: string[] = Path.split("/");
        while (paths.length) 
            Refence = Refence.getChildByName(paths.shift());
        
        return Refence;
    }

    /**
     * 设置状态
     * @param n 
     * @param state 
     */
    public static Active(n: cc.Node, state: boolean) {
        if (!n) {
            console.error("not node.");
            return;
        }
        n.active = state;
    }

    /**
     * 将Map在的数据坐标转换为节点坐标
     * @param x 
     * @param y 
     * @param designWidth 
     * @param designHeight 
     */
    public static TransGirdPosition(x: number, y: number, designWidth: number, designHeight: number): cc.Vec2 {

        let xx: number;
        let yy: number;

        // if (x === 0)
        //     xx = 0;
        // else if (x > 0)
        //     xx = x * designWidth - designWidth / 2;
        // else if (x < 0)
        //     xx = x * designWidth + designWidth / 2;

        // if (y === 0)
        //     yy = 0;
        // else if (y > 0)
        //     yy = y * designHeight - designHeight / 2;
        // else if (y < 0)
        //     yy = y * designHeight + designHeight / 2;

        // xx = designWidth * x + designWidth / 2;
        // yy = designHeight * y + designHeight / 2;
        
        
        // return cc.v2(xx, yy);
        
        return cc.v2(x * designWidth + designWidth / 2, MathUtils.resertNumberPosiv(y * designHeight + designHeight / 2));
    }
}
