const express = require('express');
const router = express.Router();
const db = require('../config/db');

// GET all credit cards for the current user
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query(
      'SELECT * FROM credit_cards WHERE user_id = ? ORDER BY id DESC',
      [1]
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST a new credit card
router.post('/', async (req, res) => {
  const { card_name, issuer, card_type, card_program, benefits, notes } = req.body;

  if (!card_name || !issuer || !card_type) {
    return res.status(400).json({ error: 'Missing required fields: card_name, issuer, card_type' });
  }

  try {
    const [result] = await db.query(
      `INSERT INTO credit_cards (
        user_id, card_name, issuer, card_type, card_program, benefits, notes
      ) VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        1, card_name, issuer, card_type,
        card_program || null,
        benefits ? JSON.stringify(benefits) : null,
        notes || null
      ]
    );
    res.status(201).json({ id: result.insertId });
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ error: 'You already have a card with this name' });
    }
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
