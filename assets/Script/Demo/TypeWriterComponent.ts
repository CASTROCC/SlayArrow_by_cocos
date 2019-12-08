
const {ccclass, property} = cc._decorator;


@ccclass
export default class GustureComponent extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;

    private _array: Array<any>;
    private _typeWrite: string = "abcdefghijklstopqrstyzw. balabala....";


    start () {
        this.label.string = "";
        this._array = this._typeWrite.split("");
    }

    lateUpdate () {
        if (this._array.length) {
            let str: string = this._array.shift();
            this.label.string += str;
        }

    }
}
