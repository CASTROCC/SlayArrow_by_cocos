import { IViewModel } from "./interface/IViewModel";
import { GotoToiletState } from "../../StateMachine/west_world/State/WomenState/GotoToiletState";
import { IView } from "./interface/IView";

export class ViewModelBase implements IViewModel {

    public static VMId: number = 0; 
    
    private _vmId: number;
    private _DataStorage: any; /// VM数据容器
    private _view: IView;

    constructor() {
        this._vmId = ViewModelBase.VMId++;
        this._DataStorage = {};
    }


    public CreateView(Path: string, ): void {
        
    }

    public RegisterProperty(properties: string[], force: boolean = false): void {
        for (let i = 0; i < properties.length; i++) {
            const element = properties[i];
            this.GeneratorProperty(element, force);
        }
    }

    private GeneratorProperty(property: string, force: boolean = false): void {
        let self = this;
        Object.defineProperty(self, property, {
            get: function (): any {
                return self._DataStorage[property];
            },
            set: function (value: any): void {
                let _value: any = self._DataStorage[property];
                if (force || value !== _value ) {
                    self._DataStorage[property] = value;
                    
                    let object: any = {};
                    object[property] = value;
                    if (self._view) 
                        self._view.onDataChanged(object);
                }
            }
        })
    }


    onRegister(): void {
        
    }

    onRemove(): void {

    }

    getVMId(): number {
        return this._vmId;
    }
}