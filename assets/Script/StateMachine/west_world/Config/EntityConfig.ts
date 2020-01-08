export class EntityConfig {
    public static Miner: number = 0;
    public static Women: number = 1;
};

export var EntityNames = [
    "小王同学",
    "小明同学"
];

export class MinerConfig {
    public static MaxGoldGarried: number = 5; // 最大现金数
    public static MaxMoneyBank: number = 200; // 最大银行存款数
    public static MaxThirst: number = 8; // 最大能忍受的饥渴程度
    public static MaxFatigue: number = 8; // 最大能忍受的疲劳程度

    public static MinThirst: number = 0; // 完全解渴程度
    public static MinFatigue: number = 0; // 完全恢复状态程度
}