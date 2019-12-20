/*
* @Author: superman 
* @Date: 2018-03-26 15:54:19 
* @Desc: 事件管理器 
*/
import G from "./G";
import { IResourceManager } from "./Interface/IResourceManager";
import { SingleBase } from "../Utils/SingleBase";

export enum loadingType
{
    None = 0, // 无等待
    Circle = 1 << 1, // 圈圈的等待
    Panel = 1 << 2, // 面板等待
}

export default class ResourceManager extends SingleBase implements IResourceManager{

    private static DealInterval: number = 30000;
    
    private _progressHandler: (num: number, total: number, item: any) => void;
    private _completeHandler: (asset: cc.Asset | cc.Asset[]) => void;

    private _loadUrl: string;
    private _loadGroup: string[];

    private _loadingType: loadingType;
    private _AssetsRef: {[name: string]: number};
    // private _Assets: 

    constructor() {
        super();
        this._AssetsRef = {};
    }
    
    /**
     * 按url加载资源
     * @param url 
     * @param loadType 
     * @param progress 
     * @param complete 
     */
    public loadResByUrl(url: string, loadType: loadingType = loadingType.None, complete?: (asset: cc.Asset) => void,
                        progress?: (num: number, total: number, item: any) => void): void {
        if (!url)
            return;
        if (progress)
            this._progressHandler = progress;
        if (complete)
            this._completeHandler = complete;

        this._loadUrl = url;
        this._loadingType = loadType;
        this._loadRes();
    }

    /**
     * 按文件夹加载资源
     * @param url 
     * @param loadType 
     * @param complete 
     * @param progress 
     */
    public loadResByDir(url: string, loadType: loadingType = loadingType.None, complete?: (asset: cc.Asset) => void,
            progress?: (num: number, total: number, item: any) => void): void {
        if (!url)
            return;
        if (progress)
            this._progressHandler = progress;
        if (complete)
            this._completeHandler = complete;

        this._loadUrl = url;
        this._loadingType = loadType;
        this._loadDir();
    }
    
    /**
     * 加载资源组
     * @param Group 
     * @param loadType 
     * @param complete 
     * @param progress 
     */
    public loadGroupRes(Group: string[], loadType: loadingType = loadingType.None, complete?: (asset: cc.Asset) => void,
            progress?: (num: number, total: number, item: any) => void): void {
            if (!Group.length)
                return;
            if (progress)
                this._progressHandler = progress;
            if (complete)
                this._completeHandler = complete;
            
            this._loadingType = loadType;
            this._loadGroup = this._loadGroup;
            this._loadingGroup();
    }

    /**
     * 销毁资源
     * @param asset 
     */
    public destoryRes(asset: cc.Asset | cc.RawAsset | string): void {
        this._updateAssetRef(asset, (item: string) => {
            --this._AssetsRef[item];
        });
    }

    private _loadRes(): void {
        // if (this._loadingType === loadingType.Panel) 
        //     // TODO
        // if (this._loadingType === loadingType.Circle)
        //     // TODO
        cc.loader.loadRes(this._loadUrl, this._progressFunc.bind(this), this._completeFunc.bind(this));
    }

    private _loadDir(): void {
        cc.loader.loadResDir(this._loadUrl, this._progressFunc.bind(this), this._completeFunc.bind(this));
    }

    private _loadingGroup(): void {
        cc.loader.loadResArray(this._loadGroup, this._progressFunc.bind(this), this._completeFunc.bind(this));
    }

    /**资源加载进度 */
    private _progressFunc(num: number, total: number, item: any): void {
        if (this._progressHandler) 
            this._progressHandler(num, total, item);
    }

    /**成功回调 */
    private _completeFunc(error: Error, asset: cc.Asset): void {
        if (error) {
            console.error(error);
            return;
        }    
        
        this._updateAssetRef(asset, (item: string) => {
            this._AssetsRef[item] ? ++this._AssetsRef[item] : this._AssetsRef[item] = 1;    
        });
        if (Object.keys(this._AssetsRef).length != 0)
            G.TimerMgr.doTimer(ResourceManager.DealInterval, 0, this._dealAssets, this);
        // if (this._loadingType === loadingType.Panel || this._loadingType === loadingType.Circle)
            // TODO
        if (this._completeHandler) 
            this._completeHandler(asset);

        this._progressHandler = this._completeHandler = null;
    }


    /**更新资源依赖的引用数 */
    private _updateAssetRef(asset: cc.Asset|cc.RawAsset|string, opeator: (item: string) => void): void {
        let _Depends: string[] = cc.loader.getDependsRecursively(asset);
        for (const item of _Depends) {
            opeator(item);
        }
    }

    /**回收资源 */
    private _dealAssets(): void {
        let keys: string[] = Object.keys(this._AssetsRef);
        for (const item of keys) {
            if (this._AssetsRef[item] <= 0) {
                cc.loader.release(item);
                
                this._AssetsRef[item] = null;
                delete this._AssetsRef[item];
            }
        }
    }

}