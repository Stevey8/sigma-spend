const express = require('express');
const router = express.Router();
const db = require('../config/db');

// GET all active recurring templates
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query(
      'SELECT * FROM recurring_templates WHERE user_id = ? AND active = TRUE ORDER BY next_scheduled_date ASC',
      [1]
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST a new recurring template
router.post('/', async (req, res) => {
  const {
    name, amount, category, subcategory, payment, credit_card_id,
    start_date, frequency_type, custom_interval_days, next_scheduled_date, notes
  } = req.body;

  if (!name || !amount || !category || !payment || !start_date || !frequency_type) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const [result] = await db.query(
      `INSERT INTO recurring_templates (
        user_id, name, amount, category, subcategory, payment, credit_card_id,
        start_date, frequency_type, custom_interval_days, next_scheduled_date, notes
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        1, name, amount, category, subcategory || null, payment, credit_card_id || null,
        start_date, frequency_type, custom_interval_days || null, next_scheduled_date || start_date, notes || null
      ]
    );
    res.status(201).json({ id: result.insertId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT to update a recurring template
router.put('/:id', async (req, res) => {
  const {
    name, amount, category, subcategory, payment, credit_card_id,
    start_date, frequency_type, custom_interval_days, next_scheduled_date, notes, active
  } = req.body;

  try {
    const [result] = await db.query(
      `UPDATE recurring_templates SET
        name = ?, amount = ?, category = ?, subcategory = ?, payment = ?, credit_card_id = ?,
        start_date = ?, frequency_type = ?, custom_interval_days = ?, next_scheduled_date = ?, notes = ?, active = ?
       WHERE id = ? AND user_id = ?`,
      [
        name, amount, category, subcategory || null, payment, credit_card_id || null,
        start_date, frequency_type, custom_interval_days || null, next_scheduled_date, notes || null, active ?? true,
        req.params.id, 1
      ]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Template not found or not yours' });
    }

    res.json({ message: 'Recurring template updated' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE (soft-delete)
router.delete('/:id', async (req, res) => {
  try {
    const [result] = await db.query(
      'UPDATE recurring_templates SET active = FALSE WHERE id = ? AND user_id = ?',
      [req.params.id, 1]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Template not found or already inactive' });
    }

    res.json({ message: 'Template deactivated' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// RUN all due recurring templates
router.post('/run', async (req, res) => {
  try {
    const [templates] = await db.query(
      `SELECT * FROM recurring_templates
       WHERE user_id = ? AND active = TRUE AND next_scheduled_date <= CURRENT_DATE()`,
      [1]
    );

    for (const template of templates) {
      // Insert into transactions
      await db.query(
        `INSERT INTO transactions (
          user_id, name, price, personal_amount, category, subcategory,
          payment, credit_card_id, datetime
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          1,
          template.name,
          template.amount,
          template.amount,
          template.category,
          template.subcategory,
          template.payment,
          template.credit_card_id,
          template.next_scheduled_date
        ]
      );

      // Calculate next_scheduled_date
      let nextDate = new Date(template.next_scheduled_date);
      switch (template.frequency_type) {
        case 'daily':
          nextDate.setDate(nextDate.getDate() + 1);
          break;
        case 'weekly':
          nextDate.setDate(nextDate.getDate() + 7);
          break;
        case 'monthly':
          nextDate.setMonth(nextDate.getMonth() + 1);
          break;
        case 'yearly':
          nextDate.setFullYear(nextDate.getFullYear() + 1);
          break;
        case 'custom':
          nextDate.setDate(nextDate.getDate() + (template.custom_interval_days || 1));
          break;
      }

      // Update template
      await db.query(
        'UPDATE recurring_templates SET next_scheduled_date = ? WHERE id = ?',
        [nextDate.toISOString().split('T')[0], template.id]
      );
    }

    res.json({ message: `✅ ${templates.length} recurring transactions created` });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
