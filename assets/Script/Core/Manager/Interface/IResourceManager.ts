import { loadingType } from "../ResourceManager";

export interface IResourceManager {
    loadResByUrl(url: string, loadType: loadingType, complete?: (asset: cc.Asset) => void,progress?: (num: number, total: number, item: any) => void): void;
    destoryRes(asset: cc.Asset | cc.RawAsset | string): void;
}