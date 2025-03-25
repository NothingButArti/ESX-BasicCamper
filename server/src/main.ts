/// <reference types="@citizenfx/server" />

declare const ESX: any;

type ProcessableItemKey = keyof typeof Config.ProcessableItems;

let campers: Camper[] = [];

on('onServerResourceStart', async (resourceName: string) => {
    if (GetCurrentResourceName() !== resourceName) return;
    
    await new Promise<void>((resolve) => {
        on('esx:sharedObject', (obj: any) => {
            (globalThis as any).ESX = obj;
            resolve();
        });
    });
    
    campers = await loadCampers();
    console.log(`[esx_camper] ${campers.length} Camper geladen.`);
    
    ESX.RegisterServerCallback('esx_camper:startProcessing', (source: number, cb: (success: boolean) => void, camperId: number, item: ProcessableItemKey) => {
        const camper = campers.find((c) => c.id === camperId);
        if (!camper || !Config.ProcessableItems[item]) return cb(false);

        camper.processing_data[source] = {
            item,
            startTime: Date.now(),
            duration: Config.ProcessableItems[item].duration * 1000,
        };
        cb(true);
    });
});

on('onResourceStop', async (resourceName: string) => {
    if (GetCurrentResourceName() !== resourceName) return;
    for (const camper of campers) await saveCamper(camper);
    console.log('[esx_camper] Camper gespeichert.');
});