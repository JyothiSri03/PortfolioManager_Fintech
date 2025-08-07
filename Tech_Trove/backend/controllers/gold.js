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
router.get('/get-gold', (req, res) => {
  const sql = `SELECT * FROM gold_investments ORDER BY id DESC`;
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching data:', err);
      return res.status(500).json({ message: 'Server error' });
    }
    res.status(200).json(results);
  });
});

// ✅ Mark Gold Investment as Sold
router.put('/gold/sell/:id', (req, res) => {
  const investmentId = req.params.id;

  const sql = `UPDATE gold_investments SET sold = 1 WHERE id = ?`;

  db.query(sql, [investmentId], (err, result) => {
    if (err) {
      console.error('Error marking investment as sold:', err);
      return res.status(500).json({ message: 'Server error' });
    }

    res.status(200).json({ message: 'Investment marked as sold successfully' });
  });
});

// ✅ Withdraw/Delete Gold Investment
router.delete('/gold/withdraw/:id', (req, res) => {
  const investmentId = req.params.id;

  const sql = `DELETE FROM gold_investments WHERE id = ?`;

  db.query(sql, [investmentId], (err, result) => {
    if (err) {
      console.error('Error deleting investment:', err);
      return res.status(500).json({ message: 'Server error' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Investment not found' });
    }

    res.status(200).json({ message: 'Investment withdrawn (deleted) successfully' });
  });
});


module.exports = router;
