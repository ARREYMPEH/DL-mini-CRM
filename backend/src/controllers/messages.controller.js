const pool = require('../db/pool');
const { validateMessage } = require('../validators/messages.validator');

const getMessagesByProspectId = async (req, res) => {
    try {
        const [rows] = await pool.query(
            'SELECT * FROM messages WHERE prospect_id = ? ORDER BY created_at DESC',
            [req.params.id]
        );
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createMessage = async (req, res) => {
    const error = validateMessage(req.body);
    if (error) return res.status(400).json({ error });

    try {
        const { id: prospectId } = req.params;
        const { channel, direction, content } = req.body;

        // Check if prospect exists
        const [prospects] = await pool.query('SELECT id FROM prospects WHERE id = ?', [prospectId]);
        if (prospects.length === 0) return res.status(404).json({ error: 'Prospect not found' });

        const [result] = await pool.query(
            'INSERT INTO messages (prospect_id, channel, direction, content) VALUES (?, ?, ?, ?)',
            [prospectId, channel, direction, content]
        );
        res.status(201).json({ id: result.insertId, prospect_id: parseInt(prospectId), ...req.body });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteMessage = async (req, res) => {
    try {
        const [result] = await pool.query('DELETE FROM messages WHERE id = ?', [req.params.id]);
        if (result.affectedRows === 0) return res.status(404).json({ error: 'Message not found' });
        res.json({ message: 'Message deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getMessagesByProspectId,
    createMessage,
    deleteMessage
};
