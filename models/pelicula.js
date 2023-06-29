// models/peliculas.js

const mongoose = require('mongoose');

const peliculaSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  descripcion: { type: String, required: true },
  urlpelicula: { type: String, required: true },
  urlimagen: { type: String, required: true },
  categoria: { type: mongoose.Schema.Types.ObjectId, ref: 'Categoria', required: true },
  duracion: { type: String, required: true },
  director: { type: String },
  elenco: [{ type: String }],
  añopublic: { type: Number, required: true },
});

const Pelicula = mongoose.model('Pelicula', peliculaSchema);

module.exports = Pelicula;
