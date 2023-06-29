// models/episodio.js

const mongoose = require('mongoose');

const episodioSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  descripcion: { type: String, required: true },
  duracion: { type: String },
  fechaLanzamiento: { type: Date },
});

const Episodio = mongoose.model('Episodio', episodioSchema);

module.exports = Episodio;
