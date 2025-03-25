/// <reference types="@citizenfx/client" />

console.log('[NBA_Camper] Utils script loaded');

interface FiveMExports {
    isInCamper: () => [boolean, number];
}

function isInCamper(): [boolean, number] {
    const ped = PlayerPedId();
    const veh = GetVehiclePedIsIn(ped, false);
    const model = GetEntityModel(veh);

    console.log('[NBA_Camper] Debug:', {
        ped,
        veh,
        model,
        camperModels: Config.CamperModels,
        hashKey: GetHashKey('journey')
    });

    const inCamper = Config.CamperModels.some((m: string) => {
        const hash = GetHashKey(m);
        console.log(`[NBA_Camper] Checking model ${m}:`, { hash, matches: hash === model });
        return hash === model;
    });

    console.log('[NBA_Camper] Result:', { inCamper, veh });
    return [inCamper, veh];
}

// Korrigierte Export-Syntax für FiveM
exports('isInCamper', isInCamper);
console.log('[NBA_Camper] Function exported');