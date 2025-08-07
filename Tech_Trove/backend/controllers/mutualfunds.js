const express = require('express');
const router = express.Router();
const db = require('../db');

// ➕ Add Mutual Fund Investment
router.post('/mutualfunds', (req, res) => {
  const { type, fund_name, quantity, purchase_price, current_price } = req.body;
  console.log("Received data:", req.body);
  const sql = `
    INSERT INTO mutual_funds (type, fund_name, quantity, purchase_price, current_price)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(sql, [type, fund_name, quantity, purchase_price, current_price], (err, result) => {
    if (err) {
      console.error('Error inserting data:', err);
      return res.status(500).json({ message: 'Server error' });
    }
    res.status(201).json({ message: 'Mutual fund investment added successfully' });
  });
});

// 📥 Get All Mutual Fund Investments
router.get('/get-mutualfunds', (req, res) => {
  const sql = `SELECT * FROM mutual_funds`;

  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error retrieving data:', err);
      return res.status(500).json({ message: 'Server error' });
    }
    res.status(200).json(results);
  });
});

// 🟢 Mark Mutual Fund as Sold
router.put('/mutualfunds/sell/:id', (req, res) => {
  const id = req.params.id;

  const sql = `UPDATE mutual_funds SET sold = TRUE WHERE id = ?`;

  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error('Error updating investment:', err);
      return res.status(500).json({ message: 'Failed to mark as sold' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Investment not found' });
    }

    res.status(200).json({ message: 'Mutual fund marked as sold' });
  });
});

// ✅ Delete (Withdraw) a mutual fund investment
router.delete('/mutualfunds/withdraw/:id', (req, res) => {
  const { id } = req.params;

  const sql = `DELETE FROM mutual_funds WHERE id = ?`;

  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error('Error deleting investment:', err);
      return res.status(500).json({ message: 'Server error' });
    }

    res.status(200).json({ message: 'Investment withdrawn (deleted) successfully' });
  });
});

module.exports = router;
