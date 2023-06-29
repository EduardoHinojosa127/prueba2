// app.js (o index.js)

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// Conectarse a la base de datos de MongoDB
mongoose.connect('mongodb://localhost:27017/nombre_de_tu_base_de_datos', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const app = express();

app.use(bodyParser.json());

// Rutas
const categoriasRoutes = require('./routes/categorias.routes');
const peliculasRoutes = require('./routes/peliculas.routes');
const seriesRoutes = require('./routes/series.routes');
app.use('/categorias', categoriasRoutes);
app.use('/peliculas', peliculasRoutes);
app.use('/series', seriesRoutes);

// Puerto de escucha
app.listen(3000, () => {
  console.log('Servidor escuchando en el puerto 3000');
});
