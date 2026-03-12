-- Table: prospects
CREATE TABLE IF NOT EXISTS prospects (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    company TEXT NULL,
    phone TEXT NULL,
    email TEXT NULL,
    source TEXT CHECK(source IN ('WhatsApp','Facebook','Instagram','Website')) NOT NULL,
    status TEXT CHECK(status IN ('New','Contacted','In discussion','Converted','Lost')) NOT NULL DEFAULT 'New',
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    notes TEXT NULL
);

-- Table: messages
CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    prospect_id INTEGER NOT NULL,
    channel TEXT CHECK(channel IN ('WhatsApp','Facebook','Instagram','Website','Phone','Email','Other')) NOT NULL DEFAULT 'Other',
    direction TEXT CHECK(direction IN ('Inbound','Outbound')) NOT NULL DEFAULT 'Inbound',
    content TEXT NOT NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (prospect_id) REFERENCES prospects(id) ON DELETE CASCADE
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_prospects_created_at ON prospects (created_at);
CREATE INDEX IF NOT EXISTS idx_messages_prospect_created ON messages (prospect_id, created_at);
