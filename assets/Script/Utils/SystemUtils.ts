export default class SystemUtils {

    /**
     * 是否ios系统不适用native
     */
    public static isIos(): boolean {
        var u = navigator.userAgent;
        return !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
    }

    
    public static delay(duration:number) {
        return new Promise(resolve=>{
            setTimeout(function(){
                resolve();
            }, duration)
        });
    };

    /**
     * 加载资源
     * @param url 
     */
    public static loadRes(url:string){
        return new Promise(resolve=>{
            cc.loader.load(url, (asset: cc.Asset)=>{
                resolve(asset);
            });
        });
    }

    /**
     * 复制object
     * @param _beCopy 被复制对象
     */
    public static copyJosn(_beCopy: object): object {
        let _temp: object = {};
        for (const key in _beCopy) {
            if (_beCopy.hasOwnProperty(key)) {
                _temp[key] = _beCopy[key];
            }
        }
        return _temp;
    }

    /**
     * 检查对象的值是否包含指定值
     * @param object 
     * @param beEquare 
     */    
    public static objectEquareValue(object: object, beEquare: any): boolean {

        let isCon: boolean = false;

        for (const k in object) {
            if (object.hasOwnProperty(k)) {
                const value = object[k];
                if (value instanceof Object) {
                    isCon = this.eqalusObject(value, beEquare);
                } else if (value instanceof Array) {
                    isCon = this.eqalusArray(value, beEquare);
                } else {
                    isCon = value === beEquare;
                }
                if (isCon) {
                    return isCon;
                }
            }
        }

        return isCon;
    }

    /**
     * 复制Array-Object类型
     * @param _beCopy 
     */
    public static copyArrayJosn(_beCopy: Array<object>): Array<object> {
        let temp: object[] = [];
        for (let i = 0; i < _beCopy.length; i++) {
            const objec: object = _beCopy[i];
            let _temp: object = {};
            for (const key in objec) {
                if (objec.hasOwnProperty(key)) {
                    _temp[key] = objec[key];
                }
            }
            temp.push(_temp);
        }
        return temp;
    }

    /**
     * 复制array
     * @param _beCopy 被复制对象
     */
    public static copyArray(_beCopy: number[][]): number[][] {
        let _temp: any = [];
        for (let i = 0; i < _beCopy.length; i++) {
            let ele: number[] = _beCopy[i];
            let arr: number[] = [];
            for (let j = 0; j < ele.length; j++) {
                const val = ele[j];
                arr[j] = val;
            }
            _temp[i] = arr;
        }
        return _temp;
    }

    /**
     * 比较两数字数组、字符串数组或字符串是否包含完全一样的元素
     * @param array 
     * @param array1 
     */
    public static eqalusArray(array: (number | string)[], array1: (number | string)[]): boolean {
        if (array.length != array1.length) return false;
        let isRight: boolean = true;
        for (let i = 0; i < array.length; i++) {
            let ele: number | string = array[i];
            if (array1.indexOf(ele) == -1) {
                isRight = false;
            }
        }
        return isRight;
    }

    /**
     * 获取俩key一致，值却不同的对象
     * @param obj1 
     * @param obj2 
     */
    public static getNoteqalusByObjects(obj1: any, obj2: any): string[] {
        let temp: string[] = [];
        for (const k in obj1) {
            if (obj1[k] !== obj2[k]) {
                temp.push(k);
            }
        }
        return temp;
    }

    /**
     * 比较俩对象是否包含完全相同元素，key一致，value一致
     * @param obj1 
     * @param obj2 
     */
    public static eqalusObject(obj1: any, obj2: any): boolean {
        let keys1: string[] = Object.keys(obj1);
        let keys2: string[] = Object.keys(obj2);
        let keysRight = this.eqalusArray(keys1, keys2);
        if (keysRight) {
            for (let i = 0; i < keys1.length; i++) {
                let commonKey: string = keys1[i];
                if (obj1[commonKey] !== obj2[commonKey]) {
                    keysRight = false;
                }
            }
        }
        return keysRight;
    }

    /**
     * 对象转字符串
     * @param beObj 
     */
    public static JSONStringly(beObj: any[] | any): string {

        if ((typeof beObj) !== "object" ||!beObj ) {
            return "";
        }
        let str: string;
        try {
            str = JSON.stringify(beObj);
        } catch (error) {
            str = "";
        }
        return str;
    }

    /**
     * 字符串转对象
     * @param beStr 
     */
    public static JSONParse(beStr: string): any {
        if (!beStr) {
            return null;
        }
        let robj: any;
        try {
            robj = JSON.parse(beStr);
        } catch (error) {
            robj = null;
        }
        return robj;
    }

}