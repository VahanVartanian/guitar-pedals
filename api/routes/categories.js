// routes/categories.js
const express = require('express');
const router = express.Router();
const db = require('../db'); // This imports your MySQL connection module

// GET /api/categories
// This endpoint returns all categories from the pedal_categories table
router.get('/', (req, res) => {
  const sql = 'SELECT * FROM pedal_categories';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching categories:', err);
      return res.status(500).json({ error: err });
    }
    res.json(results);
  });
});

// (Optional) POST /api/categories
// This endpoint can be used to add a new category if needed
router.post('/', (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ error: 'Category name is required' });
  }
  const sql = 'INSERT INTO pedal_categories (name) VALUES (?)';
  db.query(sql, [name], (err, result) => {
    if (err) {
      console.error('Error adding category:', err);
      return res.status(500).json({ error: err });
    }
    res.status(201).json({ id: result.insertId, name });
  });
});

module.exports = router;
