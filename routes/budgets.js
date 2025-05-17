const express = require('express');
const router = express.Router();
const db = require('../config/db');

// GET all budgets for the current user
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query(
      'SELECT * FROM budgets WHERE user_id = ? ORDER BY id DESC',
      [1]
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST a new budget
router.post('/', async (req, res) => {
  const { name, monthly_recurring, notes } = req.body;

  if (!name) {
    return res.status(400).json({ error: 'Budget name is required' });
  }

  try {
    const [result] = await db.query(
      `INSERT INTO budgets (user_id, name, monthly_recurring, notes)
       VALUES (?, ?, ?, ?)`,
      [1, name, monthly_recurring || false, notes || null]
    );
    res.status(201).json({ id: result.insertId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT to update budget metadata
router.put('/:id', async (req, res) => {
  const { name, monthly_recurring, notes } = req.body;

  try {
    const [result] = await db.query(
      `UPDATE budgets
       SET name = ?, monthly_recurring = ?, notes = ?
       WHERE id = ? AND user_id = ?`,
      [name, monthly_recurring || false, notes || null, req.params.id, 1]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Budget not found or not yours' });
    }

    res.json({ message: 'Budget updated successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
