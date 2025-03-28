const express = require('express');
const router = express.Router();
const db = require('../db'); 
const multer = require('multer');


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); 
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage });


router.post('/', upload.single('image'), (req, res) => {
  const { name, description, price, category_id } = req.body;
  const image = req.file ? req.file.filename : null;
  const sql = 'INSERT INTO guitar_pedals (name, description, price, image, category_id) VALUES (?, ?, ?, ?, ?)';
  db.query(sql, [name, description, price, image, category_id], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.status(201).json({ id: result.insertId, message: 'Pedal added' });
  });
});


router.get('/', (req, res) => {
  let sql = 'SELECT * FROM guitar_pedals';
  const params = [];
  if (req.query.category_id) {
    sql += ' WHERE category_id = ?';
    params.push(req.query.category_id);
  }
  db.query(sql, params, (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});


router.get('/:id', (req, res) => {
  const sql = 'SELECT * FROM guitar_pedals WHERE id = ?';
  db.query(sql, [req.params.id], (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results[0]);
  });
});


router.put('/:id', (req, res) => {
  const { name, description, price, category_id } = req.body;
  const sql = 'UPDATE guitar_pedals SET name = ?, description = ?, price = ?, category_id = ? WHERE id = ?';
  db.query(sql, [name, description, price, category_id, req.params.id], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: 'Pedal updated' });
  });
});


router.delete('/:id', (req, res) => {
  const sql = 'DELETE FROM guitar_pedals WHERE id = ?';
  db.query(sql, [req.params.id], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: 'Pedal deleted' });
  });
});

module.exports = router;
