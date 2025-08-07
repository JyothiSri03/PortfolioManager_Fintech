const express = require('express');
const router = express.Router();
const db = require('../db');

// Add Mutual Fund Investment
router.post('/gold', (req, res) => {
  const { quantity, purchase_price, current_price } = req.body;
  const sql = `INSERT INTO gold_investments (quantity, purchase_price, current_price) VALUES (?, ?, ?)`;

  db.query(sql, [quantity, purchase_price, current_price], (err, result) => {
    if (err) {
      console.error('Error inserting data:', err);
      return res.status(500).json({ message: 'Server error' });
    }
    res.status(201).json({ message: 'Gold  investment added successfully' });
  });
});


// Get All Gold Investments
router.get('/gold', (req, res) => {
  const sql = `SELECT * FROM gold_investments ORDER BY id DESC`;
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching data:', err);
      return res.status(500).json({ message: 'Server error' });
    }
    res.status(200).json(results);
  });
});



module.exports = router;
