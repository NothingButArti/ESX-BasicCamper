/// <reference types="@citizenfx/client" />

declare const ESX: any;

interface MenuData {
    current: {
        value: string;
    };
}

interface FiveMExports {
    isInCamper: () => [boolean, number];
}

console.log('[NBA_Camper] Main script started');

let ESXLoaded = false;


const initESX = async () => {
    try {
        
        await new Promise<void>((resolve) => {
            TriggerEvent('esx:getSharedObject', (obj: any) => {
                (globalThis as any).ESX = obj;
                resolve();
            });
        });

        ESXLoaded = true;
        console.log('[NBA_Camper] ESX successfully loaded');
    } catch (error) {
        console.error('[NBA_Camper] Error initializing ESX:', error);
    }
};


initESX();

setInterval(() => {
    if (typeof ESX === 'undefined') {
        console.log('[NBA_Camper] ESX not yet available');
        return;
    }
    
    console.log('[NBA_Camper] ESX Status:', {
        ESXLoaded,
        ESXAvailable: typeof ESX !== 'undefined',
        ConfigAvailable: typeof Config !== 'undefined',
        ESXObject: Object.keys(ESX)
    });
}, 5000);

setTick(async () => {
    if (!ESXLoaded || typeof ESX === 'undefined') {
        await new Promise((r) => setTimeout(r, 100));
        return;
    }

    const isInCamperFn = exports['NBA_Camper'].isInCamper;
    if (typeof isInCamperFn === 'function') {
        const [inCamper, vehicle] = isInCamperFn();
        console.log('[NBA_Camper] Function result:', { inCamper, vehicle });

        if (inCamper) {
            console.log('[NBA_Camper] Player is in camper:', { vehicle });
            try {
                ESX.ShowHelpNotification('Drücke ~INPUT_CONTEXT~ um den Camper zu nutzen.');
                const eKeyPressed = IsControlJustReleased(0, 38);
                console.log('[NBA_Camper] E key status:', { eKeyPressed });
                
                if (eKeyPressed) {
                    console.log('[NBA_Camper] E key pressed, opening menu');
                    const items = Object.keys(Config.ProcessableItems).map((item) => ({
                        label: `${item} → ${Config.ProcessableItems[item].output}`,
                        value: item,
                    }));

                    console.log('[NBA_Camper] Menu items:', items);

                    ESX.UI.Menu.Open('default', 'camper_menu', 'process', {
                        title: 'Camper Verarbeitung',
                        align: 'top-left',
                        elements: items,
                    }, (data: MenuData) => {
                        console.log('[NBA_Camper] Menu callback:', data);
                        TriggerServerEvent('esx_camper:startProcessing', vehicle, data.current.value);
                        ESX.ShowNotification(`Verarbeitung von ${data.current.value} gestartet.`);
                        ESX.UI.Menu.CloseAll();
                    }, () => {
                        console.log('[NBA_Camper] Menu closed');
                        ESX.UI.Menu.CloseAll();
                    });
                }
            } catch (error) {
                console.error('[NBA_Camper] Error in menu handling:', error);
            }
        } else {
            await new Promise((r) => setTimeout(r, 500));
        }
    }
});