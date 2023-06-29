// models/temporada.js

const mongoose = require('mongoose');

const temporadaSchema = new mongoose.Schema({
  numero: { type: Number, required: true },
  episodios: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Episodio' }],
});

const Temporada = mongoose.model('Temporada', temporadaSchema);

module.exports = Temporada;
