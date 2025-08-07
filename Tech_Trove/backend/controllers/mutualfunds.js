const express = require('express');
const router = express.Router();
const db = require('../db');

router.post('/mutualfunds', (req, res) => {
    const {type, quantity, purchase_price, current_price } = req.body;
    console.log("Received data:", req.body);
    const sql = `INSERT INTO mutual_funds (type,quantity, purchase_price, current_price) VALUES (?, ?, ?, ?)`;
  
    db.query(sql, [type,quantity, purchase_price, current_price], (err, result) => {
      if (err) {
        console.error('Error inserting data:', err);
        return res.status(500).json({ message: 'Server error' });
      }
      res.status(201).json({ message: 'Mutual fund investment added successfully' });
    });
  });
  

// // Get all Mutual Fund Investments
// router.get('/get-mutualfunds', (req, res) => {
//   const sql = `SELECT * FROM mutual_funds`;

//   db.query(sql, (err, results) => {
//     if (err) {
//       console.error('Error retrieving data:', err);
//       return res.status(500).json({ message: 'Server error' });
//     }
//     res.status(200).json(results);
//   });
// });

module.exports = router;
