const express = require('express');
const router = express.Router();
const db = require('../db');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // save files in the uploads folder
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    // create a unique filename with the current timestamp and original filename
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage });

// create a new pedal
router.post('/', upload.single('image'), (req, res) => {
  const { name, description, price, category_id } = req.body;
  const image = req.file ? req.file.filename : null;
  const sql = 'insert into guitar_pedals (name, description, price, image, category_id) values (?, ?, ?, ?, ?)';
  db.query(sql, [name, description, price, image, category_id], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: err });
    }
    res.status(201).json({ id: result.insertId, message: 'pedal added successfully' });
  });
});

// get all pedals, optionally filtered by category
router.get('/', (req, res) => {
  let sql = 'select * from guitar_pedals';
  const params = [];
  if (req.query.category_id) {
    sql += ' where category_id = ?';
    params.push(req.query.category_id);
  }
  db.query(sql, params, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: err });
    }
    res.json(results);
  });
});

// get a single pedal by id
router.get('/:id', (req, res) => {
  const sql = 'select * from guitar_pedals where id = ?';
  db.query(sql, [req.params.id], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: err });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: 'pedal not found' });
    }
    res.json(results[0]);
  });
});

// update a pedal by id
router.put('/:id', upload.single('image'), (req, res) => {
  const { name, description, price, category_id } = req.body;
  let sql, params;
  if (req.file) {
    // if a new image is provided, update the image field too
    sql = 'update guitar_pedals set name = ?, description = ?, price = ?, category_id = ?, image = ? where id = ?';
    params = [name, description, price, category_id, req.file.filename, req.params.id];
  } else {
    // update without changing the image
    sql = 'update guitar_pedals set name = ?, description = ?, price = ?, category_id = ? where id = ?';
    params = [name, description, price, category_id, req.params.id];
  }
  db.query(sql, params, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: err });
    }
    res.json({ message: 'pedal updated successfully' });
  });
});

// delete a pedal by id
router.delete('/:id', (req, res) => {
  const sql = 'delete from guitar_pedals where id = ?';
  db.query(sql, [req.params.id], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: err });
    }
    res.json({ message: 'pedal deleted successfully' });
  });
});

module.exports = router;
