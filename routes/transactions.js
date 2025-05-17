const express = require('express');
const router = express.Router();
const db = require('../config/db');

// GET all transactions for the current user (user_id = 1)
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query(
      'SELECT * FROM transactions WHERE user_id = ? ORDER BY datetime DESC',
      [1]
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET one transaction by ID
router.get('/:id', async (req, res) => {
  try {
    const [rows] = await db.query(
      'SELECT * FROM transactions WHERE id = ? AND user_id = ?',
      [req.params.id, 1]
    );
    if (rows.length === 0) return res.status(404).json({ error: 'Transaction not found' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST a new transaction
router.post('/', async (req, res) => {
  const {
    travel_id,
    budget_id,
    name,
    currency,
    price,
    personal_amount,
    category,
    subcategory,
    notes,
    datetime,
    payment,
    credit_card_id
  } = req.body;

  try {
    const [result] = await db.query(
      `INSERT INTO transactions (
        user_id, travel_id, budget_id, name, currency, price, personal_amount,
        category, subcategory, notes, datetime, payment, credit_card_id
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        1, // user_id (default to you)
        travel_id || null,
        budget_id || null,
        name,
        currency,
        price,
        personal_amount || null,
        category,
        subcategory || null,
        notes || null,
        datetime || new Date(),
        payment,
        credit_card_id || null
      ]
    );
    res.status(201).json({ id: result.insertId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT (update) a transaction
router.put('/:id', async (req, res) => {
  const {
    travel_id,
    budget_id,
    name,
    currency,
    price,
    personal_amount,
    category,
    subcategory,
    notes,
    datetime,
    payment,
    credit_card_id
  } = req.body;

  try {
    const [result] = await db.query(
      `UPDATE transactions SET
        travel_id = ?, budget_id = ?, name = ?, currency = ?, price = ?, personal_amount = ?,
        category = ?, subcategory = ?, notes = ?, datetime = ?, payment = ?, credit_card_id = ?
      WHERE id = ? AND user_id = ?`,
      [
        travel_id || null,
        budget_id || null,
        name,
        currency,
        price,
        personal_amount || null,
        category,
        subcategory || null,
        notes || null,
        datetime || new Date(),
        payment,
        credit_card_id || null,
        req.params.id,
        1
      ]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Transaction not found or not yours' });
    }

    res.json({ message: 'Transaction updated successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE a transaction
router.delete('/:id', async (req, res) => {
  try {
    const [result] = await db.query(
      'DELETE FROM transactions WHERE id = ? AND user_id = ?',
      [req.params.id, 1]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Transaction not found or not yours' });
    }

    res.json({ message: 'Transaction deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
