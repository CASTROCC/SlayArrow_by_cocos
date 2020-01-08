import { IState } from "../IState";
import { Miner } from "../../Entity/Miner";
import { MsgInfo } from "../../Message/MsgInfo";

export class MinerGlobalState implements IState {

    public static Instance: MinerGlobalState = new MinerGlobalState();


    onEnter(Entity: Miner) {
        
    }

    onExit(Entity: Miner) {

    }

    Execute(Entity: Miner) {

    }

    onMessage(Entity: Miner, msgInfo: MsgInfo): boolean {
        return void 0;
    }
}