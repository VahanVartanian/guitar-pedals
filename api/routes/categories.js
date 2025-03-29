const express = require('express');
const router = express.Router();
const db = require('../db');

// get all pedal categories
router.get('/', (req, res) => {
  // sql query to select all rows from the pedal_categories table
  const sql = 'SELECT * FROM pedal_categories';
  // execute the query
  db.query(sql, (err, results) => {
    if (err) {
      // log the error if something goes wrong
      console.error('error fetching categories:', err);
      // send a 500 status code if there is a server error
      return res.status(500).json({ error: err });
    }
    // send the results as json
    res.json(results);
  });
});

// add a new pedal category
router.post('/', (req, res) => {
  // get the name from the request body
  const { name } = req.body;
  // if no name is provided, send a 400 status code
  if (!name) {
    return res.status(400).json({ error: 'category name is required' });
  }
  // sql query to insert a new row into the pedal_categories table
  const sql = 'INSERT INTO pedal_categories (name) VALUES (?)';
  // execute the query with the provided name
  db.query(sql, [name], (err, result) => {
    if (err) {
      // log the error if something goes wrong
      console.error('error adding category:', err);
      // send a 500 status code if there is a server error
      return res.status(500).json({ error: err });
    }
    // send a 201 status code with the new category id and name
    res.status(201).json({ id: result.insertId, name });
  });
});

module.exports = router;
