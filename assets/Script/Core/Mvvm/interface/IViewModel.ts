export interface IViewModel {
    onRegister(): void; // 通过controller构建UI场景
    onRemove(): void;
    getVMId(): number;
}