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


router.put('/property/sell/:id', (req, res) => {
  const id = req.params.id;

  const sql = `UPDATE property_investments SET sold = TRUE WHERE id = ?`;

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

router.delete('/property/withdraw/:id', (req, res) => {
  const { id } = req.params;

  const sql = `DELETE FROM property_investments WHERE id = ?`;

  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error('Error deleting investment:', err);
      return res.status(500).json({ message: 'Server error' });
    }

    res.status(200).json({ message: 'Investment withdrawn (deleted) successfully' });
  });
});
module.exports = router;
