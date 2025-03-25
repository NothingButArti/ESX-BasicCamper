/// <reference types="@citizenfx/server" />

interface Camper {
    id: number;
    owner: string;
    isFactionOwned: boolean;
    items: any;
    processing_data: any;
    under_attack: boolean;
    attack_started_at: Date | null;
    locked_until: Date | null;
}

async function loadCampers(): Promise<Camper[]> {
    const campers = await global.exports.oxmysql.query_async('SELECT * FROM campers') as Camper[];
    campers.forEach((c: Camper) => {
        c.items = JSON.parse(c.items);
        c.processing_data = JSON.parse(c.processing_data);
    });
    return campers;
}

async function saveCamper(camper: Camper): Promise<void> {
    await global.exports.oxmysql.execute_async(
        `UPDATE campers SET items = ?, processing_data = ?, under_attack = ?, attack_started_at = ?, locked_until = ? WHERE id = ?`,
        [
            JSON.stringify(camper.items),
            JSON.stringify(camper.processing_data),
            camper.under_attack,
            camper.attack_started_at,
            camper.locked_until,
            camper.id,
        ]
    );
}

// FiveM-spezifischer Export
exports('loadCampers', loadCampers);
exports('saveCamper', saveCamper);