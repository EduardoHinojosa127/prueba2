// models/serie.js

const mongoose = require('mongoose');

const serieSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  descripcion: { type: String, required: true },
  genero: { type: String, required: true },
  director: { type: String },
  elenco: [{ type: String }],
  temporadas: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Temporada' }],
});

const Serie = mongoose.model('Serie', serieSchema);

module.exports = Serie;
