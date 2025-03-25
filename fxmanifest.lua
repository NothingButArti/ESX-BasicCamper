fx_version 'cerulean'
game 'gta5'

author 'NBA'
description 'GCity Camper'
version '1.0.0'

shared_scripts {
    'dist/shared/config.js',
    '@es_extended/imports.lua'
}

client_scripts {
    'dist/client/src/main.js',
    'dist/client/src/utils.js',
}

server_scripts {
    'dist/server/src/main.js',
    'dist/server/src/db.js',
    '@oxmysql/lib/MySQL.lua',
}

-- Optionale Abhängigkeiten (auskommentiert für Boilerplate)
-- dependencies {
--     'qb-core',
--     'ps-inventory',
--     'qb-menu'
-- }
