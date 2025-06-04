const express = require('express');
const router = express.Router();
const db = require('../db');

db.query(`
  CREATE TABLE IF NOT EXISTS turnos (
    id SERIAL PRIMARY KEY,
    cliente TEXT,
    fecha DATE,
    hora TEXT,
    tratamiento TEXT,
    realizado BOOLEAN DEFAULT false
  )
`);

router.post('/', async (req, res) => {
  const { cliente, fecha, hora, tratamiento } = req.body;
  try {
    const result = await db.query(
      'INSERT INTO turnos (cliente, fecha, hora, tratamiento) VALUES ($1, $2, $3, $4) RETURNING *',
      [cliente, fecha, hora, tratamiento]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/', async (req, res) => {
  const result = await db.query('SELECT * FROM turnos ORDER BY fecha, hora');
  res.json(result.rows);
});

router.get('/:fecha', async (req, res) => {
  const { fecha } = req.params;
  const result = await db.query('SELECT * FROM turnos WHERE fecha = $1 ORDER BY hora', [fecha]);
  res.json(result.rows);
});

router.get('/cliente/:nombre', async (req, res) => {
  const { nombre } = req.params;
  const result = await db.query('SELECT * FROM turnos WHERE cliente ILIKE $1 ORDER BY fecha DESC', [`%${nombre}%`]);
  res.json(result.rows);
});

module.exports = router;
