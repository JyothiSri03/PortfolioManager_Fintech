const express = require('express');
const router = express.Router();
const db = require('../db');

// Add Property Investment
router.post('/property', (req, res) => {
  const { quantity, purchase_price, current_price } = req.body;
  const sql = `INSERT INTO property_investments (quantity, purchase_price, current_price) VALUES (?, ?, ?)`;

  db.query(sql, [quantity, purchase_price, current_price], (err, result) => {
    if (err) {
      console.error('Error inserting property data:', err);
      return res.status(500).json({ message: 'Server error' });
    }
    res.status(201).json({ message: 'Property investment added successfully' });
  });
});

module.exports = router;
