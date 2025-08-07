const express = require('express');
const router = express.Router();
const db = require('../db');

// Add Stock Investment
router.post('/stocks', (req, res) => {
  const { company,quantity, purchase_price, current_price } = req.body;
  const sql = `INSERT INTO stock_investments (company,quantity, purchase_price, current_price) VALUES (?, ?, ?,?)`;

  db.query(sql, [company,quantity, purchase_price, current_price], (err, result) => {
    if (err) {
      console.error('Error inserting stock data:', err);
      return res.status(500).json({ message: 'Server error' });
    }
    res.status(201).json({ message: 'Stock investment added successfully' });
  });
});
router.get('/get-stocks', (req, res) => {
  db.query('SELECT * FROM stock_investments', (err, results) => {
    if (err) {
      console.error('Error retrieving stock data:', err);
      return res.status(500).json({ message: 'Server error' });
    }
    res.status(200).json(results);
  });
});

module.exports = router;
