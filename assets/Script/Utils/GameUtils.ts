
export default class GameUtils {
    /**
     * 获取当前节点转换到某节点下的坐标
     * @param currNode 待转换目标节点
     * @param targetNode 目标节点
     */
    public static getNodePos(currNode: cc.Node, targetNode: cc.Node): cc.Vec2 {
        let worldPos = currNode.getParent().convertToWorldSpaceAR(currNode.position);
        let pos = targetNode.convertToNodeSpaceAR(worldPos);

        return pos;
    }

    /**
     * 获取当前节点下的所有子节点
     * @param node 
     */
    public static getAllChildNode(node: cc.Node): cc.Node[] {
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
    public static getSubstringComponent(node: cc.Node, type: any): any[] {
        let parentNode: cc.Node = node.getParent();
        return parentNode.getComponentsInChildren(type);
    }
}
