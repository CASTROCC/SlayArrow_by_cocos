/*
 * @Author: chao.sheng 
 * @Date: 2020-03-28 12:08:26 
 * @Last Modified by: chao.sheng
 * @Last Modified time: 2020-03-28 12:09:28
 */
import { Gird } from "./A_star_2.0";
export class BinaryHeap<T>{

    private _heap: T[];
    private _getCompareFunc: (v: T) => any;
    
    constructor (compareFunc: (v: T) => any) {
        this._heap = [];
        this._getCompareFunc = compareFunc;
    }

    /** 冒泡 */
    public Bubble(val: T) {
        let i = this._heap.indexOf(val);
        if (-1 !== i) 
            this._bubble(i);
    }

    /** 下沉 */
    public Down(val: T) {
        let i = this._heap.indexOf(val);
        if (-1 !== i) 
            this._down(i);
    }

    /**
     * 小顶堆的向上插入, 从index位置向上遍历
     * @param idx 
     */
    private _bubble(idx: number): void {
        // 从底部向上冒泡
        let childIndex: number = idx;
        let parentIndex: number = (childIndex - 1) >> 1;
        while (parentIndex >= 0 ) { 
            if (this._getCompareFunc(this._heap[parentIndex]) < this._getCompareFunc(this._heap[childIndex])) 
                break;
            else {
                // 交换位置
                let t: T = this._heap[childIndex];
                this._heap[childIndex] = this._heap[parentIndex];
                this._heap[parentIndex] = t;

                // 两游标上移
                childIndex = parentIndex;
                parentIndex = (childIndex - 1) >> 1;
            }
        }
        
    }

    /**
     * 小顶堆的向下下沉
     * @param start 
     * @param end 
     */
    private _down(start: number, end: number = this.Size - 1): void {
        let parent: number = start;
        let lChild: number = (parent << 1) + 1;
        while ( lChild < end ) {
            if (lChild < end && this._getCompareFunc(this._heap[lChild]) < this._getCompareFunc(this._heap[lChild + 1])) 
                lChild++; // 取子节点中最大的一位

            if (this._getCompareFunc(this._heap[parent]) < this._getCompareFunc(this._heap[lChild])) {
                break;
            } else {
                // 交换位置
                let t: T = this._heap[lChild];
                this._heap[lChild] = this._heap[parent];
                this._heap[parent] = t;

                // 两游标下沉
                parent = lChild;
                lChild = (parent << 1) + 1;
            }
        }

    }

    /**获取二叉堆长度 */
    public get Size() {
        return this._heap.length;
    }
    
    /**是否包含某一元素 */
    public Contains(v: T): boolean {
        return this._heap.indexOf(v) !== -1;
    }

    /**获取某一元素, 通过索引 */
    public Get(index: number): T {
        return this._heap[index];
    }

    /**
     * 插入一个元素
     * @param v 
     */
    public Insert(v: T): void {     
        this._heap.push(v);
        this._bubble(this.Size - 1); // 从二叉堆的尾部向上插入
    }


    /** 从头部取出一个元素 */
    public Pop(): T {
        let result: T =  this._heap[0];
        let end: T = this._heap.pop();

        if(this.Size <= 0) return result;

        this._heap[0] = end;
        this._down(0, this.Size - 1);
        return result;
    }

    /** 获取一个头部元素的值 */
    public Peek(): T {
        if (this.Size) 
            return this._heap[0];
    }

    /**
     * 删除一个元素
     * @param value 
     * @returns
     */
    public Remove(value: T): boolean {
        let i: number = this._heap.indexOf(value);
        if (-1 === i) {
            return false;
        }

        this._heap[i] = this._heap.pop(); 

        if (this._heap.length > 0) this._down(i, this.Size - 1);
        return true;
    }

    /** 清除所有元素 */
    public Clear(onRelease?: (val: T) => void): void {        
        while(this.Size > 0) {
            let t = this._heap.shift();
            onRelease && onRelease(t);
        }
    }

    /** 查找元素 */
    public Find(val: T): number {
        return this._heap.indexOf(val);
    }


}
