const pool = require('../db/pool');
const { validateProspect } = require('../validators/prospects.validator');

const getAllProspects = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM prospects ORDER BY created_at DESC');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getProspectById = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM prospects WHERE id = ?', [req.params.id]);
        if (rows.length === 0) return res.status(404).json({ error: 'Prospect not found' });
        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createProspect = async (req, res) => {
    const error = validateProspect(req.body);
    if (error) return res.status(400).json({ error });

    try {
        const { name, company, phone, email, source, status, notes } = req.body;
        const [result] = await pool.query(
            'INSERT INTO prospects (name, company, phone, email, source, status, notes) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [name, company, phone, email, source, status || 'New', notes]
        );
        res.status(201).json({ id: result.insertId, ...req.body });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateProspect = async (req, res) => {
    const error = validateProspect(req.body);
    if (error) return res.status(400).json({ error });

    try {
        const { name, company, phone, email, source, status, notes } = req.body;
        const [result] = await pool.query(
            'UPDATE prospects SET name = ?, company = ?, phone = ?, email = ?, source = ?, status = ?, notes = ? WHERE id = ?',
            [name, company, phone, email, source, status, notes, req.params.id]
        );
        if (result.affectedRows === 0) return res.status(404).json({ error: 'Prospect not found' });
        res.json({ id: req.params.id, ...req.body });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteProspect = async (req, res) => {
    try {
        const [result] = await pool.query('DELETE FROM prospects WHERE id = ?', [req.params.id]);
        if (result.affectedRows === 0) return res.status(404).json({ error: 'Prospect not found' });
        res.json({ message: 'Prospect deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getAllProspects,
    getProspectById,
    createProspect,
    updateProspect,
    deleteProspect
};
