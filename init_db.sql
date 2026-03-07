CREATE DATABASE IF NOT EXISTS mini_crm;
USE mini_crm;

-- Table: prospects
CREATE TABLE IF NOT EXISTS prospects (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    company VARCHAR(150) NULL,
    phone VARCHAR(50) NULL,
    email VARCHAR(150) NULL,
    source ENUM('WhatsApp','Facebook','Instagram','Website') NOT NULL,
    status ENUM('New','Contacted','In discussion','Converted','Lost') NOT NULL DEFAULT 'New',
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    notes TEXT NULL,
    INDEX idx_prospects_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Table: messages
CREATE TABLE IF NOT EXISTS messages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    prospect_id INT NOT NULL,
    channel ENUM('WhatsApp','Facebook','Instagram','Website','Phone','Email','Other') NOT NULL DEFAULT 'Other',
    direction ENUM('Inbound','Outbound') NOT NULL DEFAULT 'Inbound',
    content TEXT NOT NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (prospect_id) REFERENCES prospects(id) ON DELETE CASCADE,
    INDEX idx_messages_prospect_created (prospect_id, created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
