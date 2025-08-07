const express = require('express');
const router = express.Router();
const db = require('../db');

// Add Mutual Fund Investment
router.post('/mutualfunds', (req, res) => {
  const { quantity, purchase_price, current_price } = req.body;
  const sql = `INSERT INTO mutual_funds (quantity, purchase_price, current_price) VALUES (?, ?, ?)`;

  db.query(sql, [quantity, purchase_price, current_price], (err, result) => {
    if (err) {
      console.error('Error inserting data:', err);
      return res.status(500).json({ message: 'Server error' });
    }
    res.status(201).json({ message: 'Mutual fund investment added successfully' });
  });
});

// Get all Mutual Fund Investments
router.get('/mutualfunds', (req, res) => {
  const sql = `SELECT * FROM mutual_funds`;

  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error retrieving data:', err);
      return res.status(500).json({ message: 'Server error' });
    }
    res.status(200).json(results);
  });
});

module.exports = router;
