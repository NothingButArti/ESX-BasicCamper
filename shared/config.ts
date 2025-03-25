interface ProcessableItem {
    output: string;
    duration: number;
}

interface ProcessableItems {
    [key: string]: ProcessableItem;
}

var Config = {
    CamperModels: ['journey', 'camper', 'surfer'] as string[],
    ProcessableItems: {
        weed: { output: 'weed_bag', duration: 300 },
        coke_leaf: { output: 'cocaine', duration: 600 },
        meth_raw: { output: 'meth', duration: 450 },
    } as ProcessableItems,
    AttackCooldown: 1800,
};

(globalThis as any).Config = Config; 