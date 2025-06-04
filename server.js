const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

const turnosRouter = require('./routes/turnos');

app.use(cors());
app.use(express.json());
app.use('/turnos', turnosRouter);

app.get('/', (req, res) => {
  res.send('Gestor de turnos en funcionamiento ✅');
});

app.listen(port, () => {
  console.log(`Servidor escuchando en puerto ${port}`);
});
