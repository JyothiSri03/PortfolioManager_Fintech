const express = require('express');
const router = express.Router();
const db = require('../db');

// Add Property Investment
router.post('/property', (req, res) => {
  const { city,quantity, purchase_price, current_price } = req.body;
  const sql = `INSERT INTO property_investments (city,quantity, purchase_price, current_price) VALUES (?, ?, ?,?)`;

  db.query(sql, [city,quantity, purchase_price, current_price], (err, result) => {
    if (err) {
      console.error('Error inserting property data:', err);
      return res.status(500).json({ message: 'Server error' });
    }
    res.status(201).json({ message: 'Property investment added successfully' });
  });
});
router.get('/get-property', (req, res) => {
  const sql = `SELECT * FROM property_investments`;

  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching property data:', err);
      return res.status(500).json({ message: 'Server error' });
    }
    res.status(200).json(results);
  });
});

module.exports = router;
