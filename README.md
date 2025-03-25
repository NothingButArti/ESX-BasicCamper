
## Aktuelle Implementierung

### Camper-System
- Erkennung von Camper-Fahrzeugen journey, camper, surfer
- Interaktives Menü für Verarbeitung von Items
- Server-seitige Verarbeitungslogik
- Datenbank-Integration mit oxmysql

### Verarbeitbare Items
```typescript
{
    weed: { output: 'weed_bag', duration: 300 },
    coke_leaf: { output: 'cocaine', duration: 600 },
    meth_raw: { output: 'meth', duration: 450 }
}
```

### Datenbank-Struktur
```sql
CREATE TABLE IF NOT EXISTS `campers` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `owner` varchar(60) NOT NULL,
    `isFactionOwned` tinyint(1) NOT NULL DEFAULT 0,
    `items` longtext NOT NULL DEFAULT '{}',
    `processing_data` longtext NOT NULL DEFAULT '{}',
    `under_attack` boolean NOT NULL DEFAULT 0,
    `attack_started_at` datetime DEFAULT NULL,
    `locked_until` datetime DEFAULT NULL,
    PRIMARY KEY (`id`)
)
```

## Ausstehende Aufgaben

### Camper-System Erweiterungen
- [ ] Implementierung des Verarbeitungs-Timers
  - [ ] Timer-Anzeige im UI
  - [ ] Möglichkeit zum Abbrechen der Verarbeitung
  - [ ] Automatische Fertigstellung nach Timer-Ablauf
- [ ] Implementierung des Aufbruch-Systems
  - [ ] Mechanik zum Aufbrechen von außen
  - [ ] Item-Diebstahl nach erfolgreichem Aufbruch
  - [ ] Benachrichtigungssystem für Besitzer

### Fraktions-System
- [ ] Implementierung der Fraktions-Logik
  - [ ] Fraktions-spezifische Berechtigungen
  - [ ] Fraktions-Inventar
  - [ ] Fraktions-Management
- [ ] Passiver Betrieb für Fraktions-Camper
  - [ ] Mehrere gleichzeitige Verarbeitungsprozesse
  - [ ] Individuelle Timer pro Fraktionsmitglied
  - [ ] Zugriffsrechte für Fraktionsmitglieder
- [ ] Fraktions-Kampfsystem
  - [ ] 30-Minuten-Angriffsphase
  - [ ] Sperrzeit nach Angriff
  - [ ] Gewinner-Bestimmung
  - [ ] Item-Transfer an Gewinner
  - [ ] Entsperrung nach erfolgreicher Verteidigung

### Charakter-System
- [ ] Camper-Besitzsystem
  - [ ] Registrierung von Campern


### Item-System
- [ ] Integration mit dem Item-System
  - [ ] Item-Verarbeitung
  - [ ] Item-Lagerung
  - [ ] Item-Transfer
- [ ] Config-basiertes Item-System
  - [ ] Konfigurierbare Verarbeitungszeiten
  - [ ] Konfigurierbare Input/Output Items
  - [ ] Konfigurierbare Erfolgsraten

### Datenbank & Persistenz
- [ ] Erweiterung der Datenbank-Struktur
  - [ ] Speicherung von Verarbeitungsprozessen
  - [ ] Speicherung von Kampf-Status
  - [ ] Speicherung von Sperrzeiten
- [ ] Backup & Recovery System
  - [ ] Automatische Datensicherung
  - [ ] Crash-Recovery
  - [ ] Daten-Integritätsprüfung

### UI/UX
- [ ] Verbesserung der Benutzeroberfläche
  - [ ] Timer-Anzeige
  - [ ] Status-Anzeige
  - [ ] Fortschrittsbalken
  - [ ] Benachrichtigungssystem
- [ ] Interaktionssystem
  - [ ] Verbesserte Menü-Navigation
  - [ ] Kontextabhängige Aktionen
  - [ ] Feedback-System

