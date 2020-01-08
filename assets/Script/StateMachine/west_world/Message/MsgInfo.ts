import { MessageType } from "./MessageType";

export class MsgInfo {
    constructor(sender: number,
        receiver: number, 
        msgType: MessageType,
        DispatchTime: number,
        ExtralInfo?: any) {
        this.Sender = sender;
        this.Receiver = receiver;
        this.MsgType = msgType;
        this.DispatchTime = DispatchTime;
        this.ExtralInfo = ExtralInfo;
    }
    /** 发送者ID */
    Sender: number; 

    /** 接受者ID */
    Receiver: number;

    /** 信息本身 */
    MsgType: MessageType;

    /** 消息发送时间(-1: 即刻发送, 0: 延迟下一帧, n: n秒后发送) */
    DispatchTime: number;

    /** 伴随消息的额外信息 */
    ExtralInfo: any;
}