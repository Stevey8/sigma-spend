const express = require('express');
const router = express.Router();
const db = require('../config/db');

// GET all budget periods for a specific budget
// Example: GET /api/budget-periods?budget_id=2
router.get('/', async (req, res) => {
  const { budget_id } = req.query;

  if (!budget_id) {
    return res.status(400).json({ error: 'Missing required budget_id in query' });
  }

  try {
    const [rows] = await db.query(
      `SELECT * FROM budget_periods
       WHERE budget_id = ?
       ORDER BY period_start DESC`,
      [budget_id]
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST a new budget period
router.post('/', async (req, res) => {
  const { budget_id, period_start, period_end, amount } = req.body;

  if (!budget_id || !period_start || !period_end || !amount) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const [result] = await db.query(
      `INSERT INTO budget_periods (budget_id, period_start, period_end, amount)
       VALUES (?, ?, ?, ?)`,
      [budget_id, period_start, period_end, amount]
    );
    res.status(201).json({ id: result.insertId });
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ error: 'A period already exists for this start date' });
    }
    res.status(500).json({ error: err.message });
  }
});

// PUT to update a budget period
router.put('/:id', async (req, res) => {
  const { period_start, period_end, amount } = req.body;

  try {
    const [result] = await db.query(
      `UPDATE budget_periods
       SET period_start = ?, period_end = ?, amount = ?
       WHERE id = ?`,
      [period_start, period_end, amount, req.params.id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Budget period not found' });
    }

    res.json({ message: 'Budget period updated successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
